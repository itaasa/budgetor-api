import { ObjectId } from "mongodb";
import { DbConnection } from "../db";
import { TypeMax } from "./type-max";
import config from 'config';
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

export interface User {
    id: string,
    name: string,
    typeMaxes: TypeMax[],
    email: string,
    hash: string,
    salt: string,
};

const userCollectionName = 'users';
const CRYPTO_ITERATIONS = 1000;
const CRYPTO_KEYLEN = 64;
const CRYPTO_DIGEST = 'sha512';
const CRYPTO_RANDOM_BYTES = 16;

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
    const hash = crypto.pbkdf2Sync(password, user.salt, CRYPTO_ITERATIONS, CRYPTO_KEYLEN, CRYPTO_DIGEST).toString('hex');
    return user.hash === hash;
}

export async function setPassword(user: User, password: string) : Promise<void> {
    user.salt = crypto.randomBytes(CRYPTO_RANDOM_BYTES).toString('hex');
    user.hash = crypto.pbkdf2Sync(password, user.salt, CRYPTO_ITERATIONS, CRYPTO_KEYLEN, CRYPTO_DIGEST).toString('hex');
}

export async function generateJwt(user: User): Promise<string> {
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    return jwt.sign({
        _id: user.id,
        email: user.email,
        name: user.name,
        exp: expiryDate.getTime() / 1000,
    }, config.get('jwtSecret'));
}

//TODO: Remove this test function
async function main() {
    const user = await getUser();
    console.log(await generateJwt(user));
}

main();
