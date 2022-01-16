import { getFirstDayOfMonth, getFirstDayOfWeek, getLastDayOfMonth, getLastDayOfWeek } from "../utils/date-helper";
import { BudgetEntry, getBudgetEntries } from "./budget-entry";
import { BudgetType } from "./budget-type";
import * as _ from 'lodash';

async function main() : Promise<void> {

    let testDateString = '01/16/2022';
    let startDate = getFirstDayOfWeek(new Date(testDateString));
    let endDate = getLastDayOfWeek(new Date(testDateString));
    let budgetEntries = await getBudgetEntries(startDate, endDate);

    console.log(
        groupBudgetEntriesByTotal(budgetEntries)
    );
}

main();

export interface TypeTotals {
    type: BudgetType,
    total: number,
};

function groupBudgetEntriesByTotal(budgetEntries: BudgetEntry[]){
    return _.chain(budgetEntries)
            .groupBy((budgetEntry: BudgetEntry) => budgetEntry.type)
            .map((value, key: BudgetType) => (
                {
                    type: key,
                    total: _.sumBy(value, 'price'),
                }
            )).value();
}

function getBudgetEntryTypeTotals(budgetEntries: BudgetEntry[]): void {
    let totalsOfBudgetEntries : TypeTotals [];
    totalsOfBudgetEntries = [];
    
    let totalEmergenices: TypeTotals = {
        type: BudgetType.Emergency,
        total: 0,
    } 
    let totalGas: TypeTotals = {
        type: BudgetType.Gas,
        total: 0,
    }
    let totalGroceries: TypeTotals = {
        type: BudgetType.Groceries,
        total: 0,
    }
    let totalHoldays: TypeTotals = {
        type: BudgetType.Holiday,
        total: 0,
    }
    let totalNeeds: TypeTotals = {
        type: BudgetType.Need,
        total: 0,
    }
    let totalWants: TypeTotals = {
        type: BudgetType.Want,
        total: 0,
    }

    budgetEntries.forEach((budgetEntry) => {
        if (budgetEntry.type === BudgetType.Emergency) totalEmergenices.total += +budgetEntry.price;
        if (budgetEntry.type === BudgetType.Gas) totalGas.total += +budgetEntry.price;
        if (budgetEntry.type === BudgetType.Groceries) totalGroceries.total += budgetEntry.price;
        if (budgetEntry.type === BudgetType.Holiday) totalHoldays.total += budgetEntry.price;
        if (budgetEntry.type === BudgetType.Need) totalNeeds.total += budgetEntry.price;
        if (budgetEntry.type === BudgetType.Want) totalWants.total += budgetEntry.price;
    });

    console.log(`Emergencies: ${totalEmergenices.total} / -`);
    console.log(`Gas: ${totalGas.total} / 400`);
    console.log(`Groceries: ${totalGroceries.total}  / 120`);
    console.log(`Holidays: ${totalHoldays.total} / -`);
    console.log(`Needs: ${totalNeeds.total} / 400`);
    console.log(`Wants: ${totalWants.total} / 400`);
}