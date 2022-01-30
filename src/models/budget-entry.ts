import { DbConnection } from "../db";
import { BudgetType } from "./budget-type";
import { getEndDate, getStartDate, Interval } from "./interval";

export interface BudgetEntry {
    itemName: string,
    price: number,
    dateBought: string,
    type: BudgetType;
}

const budgetEntryCollectionName = 'budgetEntries';

export async function getBudgetEntries(date: Date, interval: Interval) : Promise<BudgetEntry[]> {

    let startDate = getStartDate(date, interval);
    let endDate = getEndDate(date, interval);
    return await getBudgetEntriesByDate(startDate, endDate);
}

async function getBudgetEntriesByDate(startDate: Date, endDate: Date) : Promise<BudgetEntry[]> {
    try {
        let db = await new DbConnection().get();
        let results = await db.collection(budgetEntryCollectionName).find(
            {
                dateBought: {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString(),
                }
            }
        ).sort( { dateBought: -1 });
        return await results.toArray();
    } catch (e) {
        throw(e);
    }
};

export async function createBudgetEntry(budgetEntry: BudgetEntry) : Promise<string>{
    try {
        let db = await new DbConnection().get();
        return await db.collection(budgetEntryCollectionName).insertOne(budgetEntry);
    } catch (e) {
        throw(e);
    }
};
