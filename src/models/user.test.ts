import { BudgetType } from "./budget-type";
import { User } from "./user";

const mockUser: User = {
    name: "arvin",
    typeMaxes: [
        {
            type: BudgetType.Gas,
            weeklyMax: 100.00,
        },
        {
            type: BudgetType.Need,
            weeklyMax: 100.00,
        },
        {
            type: BudgetType.Want,
            weeklyMax: 100.00,
        },
        {
            type: BudgetType.Groceries,
            weeklyMax: 100.00,
        },
    ],
    email: "",
    hash: "",
    salt: "",
    id: "",
};
