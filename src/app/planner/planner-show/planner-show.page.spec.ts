import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerShowPage } from './planner-show.page';

describe('PlannerShowPage', () => {
  let component: PlannerShowPage;
  let fixture: ComponentFixture<PlannerShowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlannerShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
