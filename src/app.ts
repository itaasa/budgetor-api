import express from 'express';
import bodyParser from 'body-parser';

import { BudgetEntry, getBudgetEntries, getWeeklyBudgetEntries } from './models/budget-entry';
import { getFirstDayOfWeek, getLastDayOfWeek } from './utils/date-helper';
import { BudgetType } from './models/budget-type';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let router = express.Router();

router.get('/budget-entries', async (req: any, res) => {

    let date = new Date(req.query.date);
    let budgetEntries = await getWeeklyBudgetEntries(date);

    res.send(budgetEntries);
});

app.use(router);
app.listen(5001);
