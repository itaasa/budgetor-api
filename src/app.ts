/*
    3. Implement options for weekly, monthly, yearly, all time
        > isBetweenMonth, isBetweenWeek, isBetweenYear etc.
    4. Create front end in Angular, incorporate store
        >Create a node server that sends over view models to front end
        >TotalsViewModel
*/

import { BudgetEntry } from './models/budget-entry';
import { BudgetType } from './models/budget-type';
import { DbConnection } from './db';
import { TypeTotals } from './models/type-totals';

const budgetEntryCollectionName = 'budgetEntries';

async function insertBudgetEntry(budgetEntry: BudgetEntry) : Promise<void>{
    try {
        let db = await new DbConnection().get();
        let result = await db.collection(budgetEntryCollectionName).insertOne(budgetEntry);
    } catch (e) {
        console.log(e);
    }
}

async function deleteAllBudgetEntries(): Promise<void> {
    try {
        let db = await new DbConnection().get();
        await db.collection(budgetEntryCollectionName).deleteMany();
    } catch (e) {
        throw(e);
    }
}

async function getAllBudgetEntries(startDate: Date, endDate: Date) : Promise<BudgetEntry[]> {
    try {
        let db = await new DbConnection().get();
        let results = await db.collection(budgetEntryCollectionName).find(
            {
                dateBought: {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString(),
                }
            }
        );
        return await results.toArray();
    } catch (e) {
        throw(e);
    }
}
    
function isBetweenMonth(entryDate: Date): boolean {
    let entryDateTime = new Date(entryDate).getTime();
    
    return entryDateTime >= new Date('01/01/2022').getTime()
    && entryDateTime <= new Date('01/31/2022').getTime();
}

function displayBudgetEntryTotals(budgetEntries: BudgetEntry[]): void {
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
    
async function main(): Promise<void> {
    let budgetEntries = await getAllBudgetEntries(new Date('10/01/2021'), 
                    new Date('12/31/2022'));

    await displayBudgetEntryTotals(budgetEntries);
}

main();