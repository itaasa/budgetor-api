import express from 'express';
import bodyParser from 'body-parser';
import { getBudgetEntries } from './models/budget-entry';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let router = express.Router();

router.get('/budget-entry', async (req: any, res) => {

    let date = new Date(req.query.date);
    let interval = req.query.interval;

    let budgetEntries = await getBudgetEntries(date, interval);

    res.send(budgetEntries);
});

router.post('')

app.use(router);
app.listen(5001);
