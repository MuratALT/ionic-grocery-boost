import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceriesNewPage } from './groceries-new.page';

describe('GroceriesNewPage', () => {
  let component: GroceriesNewPage;
  let fixture: ComponentFixture<GroceriesNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroceriesNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
