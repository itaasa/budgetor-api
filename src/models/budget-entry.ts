import { ObjectId } from 'mongodb';
import { DbConnection } from '../db';
import { BudgetType } from './budget-type';
import { getEndDate, getStartDate, Interval } from './interval';

export interface BudgetEntry {
  id?: string;
  itemName: string;
  price: number;
  dateBought: string;
  type: BudgetType;
}

const budgetEntryCollectionName = 'entry';

export async function getBudgetEntries(date: Date, interval: Interval): Promise<BudgetEntry[]> {
  let startDate = getStartDate(date, interval);
  let endDate = getEndDate(date, interval);
  return await getBudgetEntriesByDate(startDate, endDate);
}

async function getBudgetEntriesByDate(startDate: Date, endDate: Date): Promise<BudgetEntry[]> {
  try {
    let db = await new DbConnection().get();
    let results = await db
      .collection(budgetEntryCollectionName)
      .find({
        dateBought: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      })
      .sort({ dateBought: -1 });
    return await results.toArray();
  } catch (e) {
    throw e;
  }
}

export async function createBudgetEntry(budgetEntry: BudgetEntry): Promise<string> {
  try {
    let db = await new DbConnection().get();
    return await db.collection(budgetEntryCollectionName).insertOne(budgetEntry);
  } catch (e) {
    throw e;
  }
}

export async function createBudgetEntries(budgetEntries: BudgetEntry[]): Promise<void> {
  try {
    let db = await new DbConnection().get();
    return await db.collection(budgetEntryCollectionName).insertMany(budgetEntries);
  } catch (e) {
    throw e;
  }
}

export async function updateBudgetEntry(budgetEntry: BudgetEntry): Promise<string> {
  const editQuery = { _id: new ObjectId(budgetEntry.id) };
  const updateBudgetEntryQuery = { $set: budgetEntry };

  try {
    let db = await new DbConnection().get();
    return await db.collection(budgetEntryCollectionName).updateOne(editQuery, updateBudgetEntryQuery);
  } catch (e) {
    throw e;
  }
}

export async function deleteBudgetEntry(deleteId: string): Promise<string> {
  const deleteQuery = { _id: new ObjectId(deleteId) };

  try {
    let db = await new DbConnection().get();
    return await db.collection(budgetEntryCollectionName).deleteOne(deleteQuery);
  } catch (e) {
    throw e;
  }
}
