import express from 'express';
import bodyParser from 'body-parser';
import { BudgetEntry, createBudgetEntry, getBudgetEntries } from './models/budget-entry';
import { getTypeTotalsFromBudgetEntries } from './models/type-totals';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    let newBudgetEntry: BudgetEntry = {
        itemName: req.body.itemName,
        price: req.body.price,
        type: req.body.type,
        dateBought: new Date().toISOString(),
    }

    let newBudgetEntryId = await createBudgetEntry(newBudgetEntry);
    
    console.log(`Created new budget entry with id: ${newBudgetEntryId}`);

    res.send(newBudgetEntryId);
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
