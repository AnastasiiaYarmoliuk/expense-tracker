import { describe, it, expect } from "vitest";
import { calculateIncome, calculateExpense, calculateSavings, calculateBalance } from "./finance";

const mockTransactions = [
  { amount: 1000, type: "income" },
  { amount: 200, type: "expense" },
  { amount: 300, type: "expense" },
  { amount: 100, type: "savings" },
];

describe("Finance Logic", () => {
  it("Правильно рахує загальний дохід", () => {
    expect(calculateIncome(mockTransactions)).toBe(1000);
  });

  it("Правильно рахує загальні витрати", () => {
    expect(calculateExpense(mockTransactions)).toBe(500);
  });

  it("Правильно рахує баланс", () => {
    const inc = 1000,
      exp = 500,
      sav = 100;
    expect(calculateBalance(inc, exp, sav)).toBe(400);
  });

  it("Правильно рахує збереження", () => {
    expect(calculateSavings(mockTransactions)).toBe(100);
  });

  it("Повертає 0, якщо масив порожній", () => {
    expect(calculateIncome([])).toBe(0);
  });

  it("Коректно обробляє від’ємні числа (якщо вони є)", () => {
    const mixed = [{ amount: -100, type: "income" }];
    expect(calculateIncome(mixed)).toBe(-100);
  });
});
