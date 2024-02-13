export class Ingredient {
  id?: string;
  name: string;
  quantity: number;
  unit: string;

  constructor() {
    this.name = '';
    this.quantity = 0;
    this.unit = '';
  }
}
