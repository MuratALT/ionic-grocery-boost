import { Ingredient } from './ingredient';

export class Meal {
  id?: string;
  name: string;
  recipe: string;
  picture: string;
  createdAt: Date;
  ingredients: Ingredient[];

  constructor() {
    this.name = '';
    this.recipe = '';
    this.picture = '';
    this.createdAt = new Date();
    this.ingredients = [];
  }
}
