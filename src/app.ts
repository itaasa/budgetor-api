import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { BudgetEntry, createBudgetEntry, deleteBudgetEntry, getBudgetEntries, updateBudgetEntry } from './models/budget-entry';
import { getTypeTotalsFromBudgetEntries } from './models/type-totals';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let router = express.Router();

// Budget Entry Controller
router.get('/budget-entry', async (req: any, res) => {
    let date = new Date(req.query.date);
    let interval = req.query.interval;

    let budgetEntries = await getBudgetEntries(date, interval);

    console.log(`Getting budget entries ${interval} for date ${date}`);

    res.send(budgetEntries);
});

router.post('/budget-entry', async (req: any, res) => {
    let budgetEntry: BudgetEntry = req.body;

    let insertedId = await createBudgetEntry(budgetEntry);
    
    console.log(`Created new budget entry with id: ${insertedId}`);

    res.send(insertedId);
});

router.put('/budget-entry', async (req: any, res) => {
    let budgetEntry: BudgetEntry = req.body;
    
    let updatedId = await updateBudgetEntry(budgetEntry);
    console.log(`Update budget entry with id: ${budgetEntry.id}`);

    res.send(updatedId);
});

router.delete('/budget-entry/:id', async (req: any, res) => {
    let deleteId: string = req.params.id;

    let result = await deleteBudgetEntry(deleteId);
    console.log(`Deleted budget entry with id: ${deleteId}`);

    res.send(result);
});

// Type Totals Controller
router.get('/type-totals', async (req: any, res) => {
    let date = new Date(req.query.date);
    let interval = req.query.interval;

    let budgetEntries = await getBudgetEntries(date, interval);
    let typeTotals = await getTypeTotalsFromBudgetEntries(budgetEntries);
 
    return res.send(typeTotals);
});

app.use(router);
app.listen(5001);
