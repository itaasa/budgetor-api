import csv = require('csv-parser');
import * as fs from 'fs';
import * as path from 'path';
import { BudgetEntry } from '../models/budget-entry';
import { BudgetType } from '../models/budget-type';

export const getBudgetEntries = () => {
    return new Promise<BudgetEntry[]>((resolve, reject) => {
        var budgetEntries: BudgetEntry[];
        budgetEntries = [];
        let stream = fs.createReadStream(path.resolve(__dirname, 'Book1.csv')).pipe(csv());
        
        stream.on('error', (err) => reject(err));
        stream.on('data', (row) => {
            let budgetEntry: BudgetEntry = {
                itemName: row.itemName,
                price: +row.price,
                dateBought: new Date(row.dateBought).toISOString(),
                type: (row.itemName.trim() == 'Gas') ? BudgetType.Gas : row.type,
            };
            budgetEntries.push(budgetEntry);
        });
        stream.on('end', () => resolve(budgetEntries));
    });
};
