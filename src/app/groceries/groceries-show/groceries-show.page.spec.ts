import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceriesShowPage } from './groceries-show.page';

describe('GroceriesShowPage', () => {
  let component: GroceriesShowPage;
  let fixture: ComponentFixture<GroceriesShowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroceriesShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
