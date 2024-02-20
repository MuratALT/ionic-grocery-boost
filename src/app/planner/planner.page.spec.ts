import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerPage } from './planner.page';

describe('PlannerPage', () => {
  let component: PlannerPage;
  let fixture: ComponentFixture<PlannerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
