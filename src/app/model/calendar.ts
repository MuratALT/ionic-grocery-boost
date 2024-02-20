import { Meal } from './meal';
import { Planner } from './planner';

export class Calendar {
  id?: string;
  startDate: string | null;
  endDate: string | null;
  planners: Planner[];

  constructor() {
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.planners = [];
  }
}
