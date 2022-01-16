import { DbConnection } from "../db";
import { BudgetType } from "./budget-type";
import { TypeTotals } from "./type-totals";

export interface BudgetEntry {
    itemName: string,
    price: number,
    dateBought: string,
    type: BudgetType;
}

const budgetEntryCollectionName = 'budgetEntries';

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

function startOfWeek(date: Date): Date {
    date = getDateinEST(date);
    console.log(date);
    date = setTimeToZero(date);
    console.log(date);
    date = getDateinEST(date);
    console.log(date);

    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function getDateinEST(date: Date): Date {
    const estOffset = -5.0;
    return new Date(date.getTime() + (3600000 * estOffset));
}

function setTimeToZero(date: Date): Date {
    date.setHours(0,0,0,0);
    return date;
}

export async function getWeeklyBudgetEntries(date: Date): Promise<BudgetEntry[]> {
    let startDate = startOfWeek(date);
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 6);

    // console.log(startDate);
    // console.log(endDate);
    return [];
}

async function main() : Promise<void> {
    await getWeeklyBudgetEntries(new Date());
}

main();


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