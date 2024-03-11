import { Component } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-expense-splitter',
  templateUrl: './expense-splitter.component.html',
  styleUrls: ['./expense-splitter.component.css']
})
export class ExpenseSplitterComponent {
  members: Member[] = [];
  expenses: Expense[] = [];
  settlements: any[] = [];
  newMemberName: string = '';
  newExpenseAmount: number | null = null;
  paidBy: string = '';
  splitAmong: string[] = [];
  totalExpenses: number = 0;
  expensesByMember: { [key: string]: number } = {};

  constructor() { }

  addMember(name: string): void {
    if (!name.trim()) return;
    this.members.push(new Member(name));
    this.expensesByMember[name] = 0;
    this.newMemberName = '';
  }

  addExpense(amount: number | null, paidBy: string, splitAmong: string[]): void {
    if (amount === null || paidBy === '' || splitAmong.length === 0) return;
    this.expenses.push(new Expense(amount, paidBy, splitAmong));
    this.totalExpenses += amount;
    this.expensesByMember[paidBy] += amount;
    this.newExpenseAmount = null;
    this.paidBy = '';
    this.splitAmong = [];
    this.calculateSettlements();
  }

  onMemberSelectionChange(memberName: string, isChecked: boolean): void {
    if (isChecked) {
      this.splitAmong.push(memberName);
    } else {
      this.splitAmong = this.splitAmong.filter(m => m !== memberName);
    }
  }

  calculateSettlements(): void {
    const balances: { [key: string]: { [key: string]: number } } = {};
    this.members.forEach(member => {
      balances[member.name] = {};
      this.members.forEach(innerMember => {
        if (member.name !== innerMember.name) {
          balances[member.name][innerMember.name] = 0;
        }
      });
    });
    this.expenses.forEach(expense => {
      const amountPerPerson = expense.amount / expense.splitAmong.length;
      expense.splitAmong.forEach(person => {
        if (person !== expense.paidBy) {
          balances[person][expense.paidBy] += amountPerPerson;
        }
      });
    });
    const settlements = [];
    for (const debtor in balances) {
      for (const creditor in balances[debtor]) {
        if (balances[debtor][creditor] > 0) {
          settlements.push(`${debtor} owes ${creditor}: ${balances[debtor][creditor].toFixed(2)}`);
        }
      }
    }
    this.settlements = settlements;
  }
}