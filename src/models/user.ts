import { ObjectId } from 'mongodb';
import { DbConnection } from '../db';
import { BudgetType } from './budget-type';
import { TypeMax } from './type-max';

export interface User {
  name: string;
  typeMaxes: TypeMax[];
}

const userCollectionName = 'user';

export async function getUser(): Promise<User> {
  try {
    let db = await new DbConnection().get();
    let result = (await db.collection(userCollectionName).findOne()) as User;

    return result;
  } catch (e) {
    throw e;
  }
}

export async function getUserById(userId: string): Promise<User> {
  try {
    let db = await new DbConnection().get();
    let result = (await db.collection(userCollectionName).findOne({
      _id: new ObjectId(userId),
    })) as User;

    return result;
  } catch (e) {
    throw e;
  }
}

export async function createUser(user: User): Promise<string> {
  try {
    let db = await new DbConnection().get();
    return await db.collection(userCollectionName).insertOne(user);
  } catch (e) {
    throw e;
  }
}
