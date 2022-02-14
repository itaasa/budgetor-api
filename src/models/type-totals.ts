import { BudgetEntry, getBudgetEntries } from "./budget-entry";
import { BudgetType } from "./budget-type";
import _ from 'lodash';
import { convertWeeklyTotalMaxToInterval, Interval } from "./interval";
import { getUser } from "./user";

export interface TypeTotal {
    type: BudgetType,
    total: number,
};

export interface TypeTotalViewModel {
    type: BudgetType,
    total: number,
    maxTotal?: number,
};

export async function getTypeTotalViewModelsFromBudgetEntries(budgetEntries: BudgetEntry[], interval: Interval) : Promise<TypeTotalViewModel[]> {
    let typeTotalsViewModels: TypeTotalViewModel[] = [];
    let user = await getUser();
    let typeTotals = getTypeTotalsFromBudgetEntries(budgetEntries);

    let merged = _.merge(_.keyBy(typeTotals, 'type'), _.keyBy(user.typeMaxes, 'type'));
    let values = _.values(merged);

    values.forEach((typeTotalsWithWeeklyMax: { type: BudgetType, weeklyMax: number, total: number }) : any => {
        let typeTotalViewModel: TypeTotalViewModel = {
            type: typeTotalsWithWeeklyMax.type,
            total: typeTotalsWithWeeklyMax.total,
            maxTotal: convertWeeklyTotalMaxToInterval(interval, typeTotalsWithWeeklyMax.weeklyMax),
        }

        typeTotalsViewModels.push(typeTotalViewModel);
    });

    return typeTotalsViewModels;
};

export function getTypeTotalsFromBudgetEntries(budgetEntries: BudgetEntry[]): TypeTotal[] {
    let groupedBudgetEntries = groupBudgetEntriesByTypeSummingByPrice(budgetEntries);

    return groupedBudgetEntries.map( value => {
        return <TypeTotal>{
            type: value.type,
            total: value.total,
        }
    });
}

function groupBudgetEntriesByTypeSummingByPrice(budgetEntries: BudgetEntry[]): any[] {
    return _.chain(budgetEntries)
            .groupBy((budgetEntry: BudgetEntry) => budgetEntry.type)
            .map((value, key: BudgetType) => (
                {
                    type: key,
                    total: _.sumBy(value, 'price'),
                }
            )).value();
}
