import { Ingredient } from './ingredient';

export class Grocery {
  ingredient: Ingredient;
  checked: boolean;

  constructor() {
    this.ingredient = new Ingredient();
    this.checked = false;
  }
}
