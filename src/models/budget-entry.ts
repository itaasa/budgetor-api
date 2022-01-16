import { DbConnection } from "../db";
import { getFirstDayOfWeek, getLastDayOfWeek } from "../utils/date-helper";
import { BudgetType } from "./budget-type";

export interface BudgetEntry {
    itemName: string,
    price: number,
    dateBought: string,
    type: BudgetType;
}

const budgetEntryCollectionName = 'budgetEntries';

export async function getWeeklyBudgetEntries(date: Date) : Promise<BudgetEntry[]> {

    let startDate = getFirstDayOfWeek(date);
    let endDate = getLastDayOfWeek(date);

    return getBudgetEntries(startDate, endDate);
}

export async function getBudgetEntries(startDate: Date, endDate: Date) : Promise<BudgetEntry[]> {
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

export async function insertBudgetEntry(budgetEntry: BudgetEntry) : Promise<void>{
    try {
        let db = await new DbConnection().get();
        let result = await db.collection(budgetEntryCollectionName).insertOne(budgetEntry);
    } catch (e) {
        throw(e);
    }
};

export async function deleteAllBudgetEntries(): Promise<void> {
    try {
        let db = await new DbConnection().get();
        await db.collection(budgetEntryCollectionName).deleteMany();
    } catch (e) {
        throw(e);
    }
};
