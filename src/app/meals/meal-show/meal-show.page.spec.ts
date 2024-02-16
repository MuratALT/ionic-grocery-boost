import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealShowPage } from './meal-show.page';

describe('MealShowPage', () => {
  let component: MealShowPage;
  let fixture: ComponentFixture<MealShowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
