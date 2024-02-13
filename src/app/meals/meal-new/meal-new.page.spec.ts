import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealNewPage } from './meal-new.page';

describe('MealNewPage', () => {
  let component: MealNewPage;
  let fixture: ComponentFixture<MealNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
