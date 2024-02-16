import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealEditPage } from './meal-edit.page';

describe('MealEditPage', () => {
  let component: MealEditPage;
  let fixture: ComponentFixture<MealEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
