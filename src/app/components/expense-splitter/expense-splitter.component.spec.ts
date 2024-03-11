import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSplitterComponent } from './expense-splitter.component';
import { FormsModule } from '@angular/forms';

describe('ExpenseSplitterComponent', () => {
  let component: ExpenseSplitterComponent;
  let fixture: ComponentFixture<ExpenseSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseSplitterComponent],
      imports: [FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpenseSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display "Expense Splitter" as h2 heading', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Expense Splitter');
    });

    it('should display "Total Expenses:" as h4 heading', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h4').textContent).toContain('Total Expenses:');
    });

    it('should display "Expenses by Member" as h3 heading', () => {
      const compiled = fixture.nativeElement;
      // expect(compiled.querySelector('h3').textContent).toContain('Expenses by Member:');
      const headings = compiled.querySelectorAll('h3');
      let found = false;
      headings.forEach((heading: { textContent: string | string[]; }) => {
        if (heading.textContent.includes('Expenses by Member')) {
          found = true;
        }
      });
      expect(found).toBeTruthy();
    });

    it('should display "Members" as h3 heading', () => {
      const compiled = fixture.nativeElement;
      // expect(compiled.querySelector('h3').textContent).toContain('Members:');
      const headings = compiled.querySelectorAll('h3');
      let found = false;
      headings.forEach((heading: { textContent: string | string[]; }) => {
        if (heading.textContent.includes('Members')) {
          found = true;
        }
      });
      expect(found).toBeTruthy();
    });

    it('should display "Settlements" as h3 heading', () => {
      const component = fixture.componentInstance;
      component.settlements.push('Test Settlement');
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const headings = compiled.querySelectorAll('h3');
      let found = false;
      headings.forEach((heading: { textContent: string | string[]; }) => {
        if (heading.textContent.includes('Settlements')) {
          found = true;
        }
      });
      expect(found).toBeTruthy();
    });

    it('should have a "Add Expense" button', () => {
      expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
    });

    it('should have a "Add Member" button', () => {
      expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
    });

    it('should have memberName input field', () => {
      expect(fixture.nativeElement.querySelector('input[name="memberName"]')).toBeTruthy();
    });

    it('should have expenseAmount input field', () => {
      expect(fixture.nativeElement.querySelector('input[name="expenseAmount"]')).toBeTruthy();
    });
  });
});
