import { BudgetType } from "./budget-type";

export interface BudgetEntry {
    itemName: string,
    price: number,
    dateBought: string,
    type: BudgetType;
}
