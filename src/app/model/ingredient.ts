export class Ingredient {
  id?: string;
  name: string;
  quantity: number | null;
  unit: string;

  constructor() {
    this.name = '';
    this.quantity = null;
    this.unit = '';
  }
}
