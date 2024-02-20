import { Calendar } from './calendar';
import { Grocery } from './grocery';

export class GroceryList {
  id?: string;
  groceries: Grocery[];
  startDate: string;
  endDate: string;
  calendarId: string;

  constructor() {
    this.groceries = [];
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.calendarId = '';
  }
}
