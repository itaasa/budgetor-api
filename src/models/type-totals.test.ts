import { BudgetEntry } from './budget-entry';
import { BudgetType } from './budget-type';
import { TypeTotal, getTypeTotalsFromBudgetEntries } from './type-totals';

const mockBudgetEntries: BudgetEntry[] = [
    {
        itemName: 'Groceries',
        price: 54.99,
        dateBought: new Date(2022, 5, 9).toISOString(),
        type: BudgetType.Groceries,
    },
    {
        itemName: 'Gas',
        price: 50.00,
        dateBought: new Date(2022, 5, 7).toISOString(),
        type: BudgetType.Gas,
    },
    {
        itemName: 'Gas',
        price: 50.00,
        dateBought: new Date(2022, 5, 11).toISOString(),
        type: BudgetType.Gas,
    },
    {
        itemName: 'Food',
        price: 12.00,
        dateBought: new Date(2022, 5, 11).toISOString(),
        type: BudgetType.Want, 
    },
];

const mockTypeTotals: TypeTotal[] = [
    {
        type: BudgetType.Gas,
        total: 100,
    },
    {
        type: BudgetType.Groceries,
        total: 54.99,
    },
    {
        type: BudgetType.Want,
        total: 12.00,
    },
];

describe('getTypeTotalsFromBudgetEntries', () => {
    it('should return a typeTotal[] with all types summed', () => {
        let typeTotals: TypeTotal[];
        let sortedTypeTotals: TypeTotal[];
        let sortedMockTypeTotals = mockTypeTotals.sort((a, b) => a.total - b.total);

        typeTotals = getTypeTotalsFromBudgetEntries(mockBudgetEntries);
        sortedTypeTotals = typeTotals.sort((a, b) => a.total - b.total);

        expect(sortedTypeTotals).toEqual(sortedMockTypeTotals);
    });
});
