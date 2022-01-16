import { BudgetEntry, getBudgetEntries } from "./budget-entry";
import { BudgetType } from "./budget-type";
import _ from 'lodash';

export interface TypeTotal {
    type: BudgetType,
    total: number,
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
