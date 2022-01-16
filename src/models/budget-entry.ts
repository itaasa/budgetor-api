import { DbConnection } from "../db";
import { getFirstDayOfYear, getLastDayOfYear } from "../utils/date-helper";
import { BudgetType } from "./budget-type";
import { TypeTotals } from "./type-totals";

export interface BudgetEntry {
    itemName: string,
    price: number,
    dateBought: string,
    type: BudgetType;
}

async function main() : Promise<void> {
    console.log(getLastDayOfYear(new Date()));
}

main();

const budgetEntryCollectionName = 'budgetEntries';

async function getBudgetEntries(startDate: Date, endDate: Date) : Promise<BudgetEntry[]> {
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

export async function insertBudgetEntry(budgetEntry: BudgetEntry) : Promise<void>{
    try {
        let db = await new DbConnection().get();
        let result = await db.collection(budgetEntryCollectionName).insertOne(budgetEntry);
    } catch (e) {
        console.log(e);
    }
}

export async function deleteAllBudgetEntries(): Promise<void> {
    try {
        let db = await new DbConnection().get();
        await db.collection(budgetEntryCollectionName).deleteMany();
    } catch (e) {
        throw(e);
    }
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