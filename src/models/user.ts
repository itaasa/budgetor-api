import { ObjectId } from "mongodb";
import { DbConnection } from "../db";
import { TypeMax } from "./type-max";
import * as crypto from "crypto";

export interface User {
    name: string,
    typeMaxes: TypeMax[],
    email: string,
    hash: string,
    salt: string,
};

const userCollectionName = 'users';

export async function getUser() : Promise <User> {
    try {
        let db = await new DbConnection().get();
        let result = await db.collection(userCollectionName).findOne() as User;

        return result;
    } catch (e) {
        throw (e);
    }
}

export async function getUserById(userId: string) : Promise<User> {
    try {
        let db = await new DbConnection().get();
        let result = await db.collection(userCollectionName).findOne(
            {
                _id: new ObjectId(userId),
            },
        ) as User;

        return result;
    } catch (e) {
        throw (e);
    }
};

export async function createUser(user: User) : Promise<string> {
    try {
        let db = await new DbConnection().get();
        return await db.collection(userCollectionName).insertOne(user);
    } catch (e) {
        throw(e);
    }
}

export async function isValidPassword(user: User, password: string) : Promise<boolean> {
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
}

export async function setPassword(user: User, password: string) : Promise<void> {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
}
