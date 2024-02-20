import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerNewPage } from './planner-new.page';

describe('PlannerNewPage', () => {
  let component: PlannerNewPage;
  let fixture: ComponentFixture<PlannerNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlannerNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
