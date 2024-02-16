import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ingredient } from 'src/app/model/ingredient';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.page.html',
  styleUrls: ['./meal-edit.page.scss'],
})
export class MealEditPage implements OnInit {
  public meal!: Meal;
  public mealId: string = '';
  public ingredient!: Ingredient;
  public showAddIngredientForm: boolean = false;

  constructor(
    private mealService: MealService,
    private toastCtrl: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.meal = new Meal();
    this.ingredient = new Ingredient();
    this.showAddIngredientForm = false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.mealId = id;
    }
    this.mealService.get(this.mealId).subscribe((data: any) => {
      this.meal = data;
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractères restants`;
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Le repas a été modifié avec succès.',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/meals']);
      }, 500);
    });
  }

  save() {
    const jsonifiedMeal = this.JsonifyMeal();
    this.mealService.update(jsonifiedMeal).subscribe(() => {
      this.presentToast();
    });
  }

  toggleIngredientForm() {
    this.showAddIngredientForm = !this.showAddIngredientForm;
  }

  addIngredient() {
    this.meal.ingredients.push(this.ingredient);
    this.ingredient = new Ingredient();
    this.showAddIngredientForm = true;
  }

  removeIngredient(id: number) {
    this.meal.ingredients.splice(id, 1);
    console.log(this.meal);
  }

  JsonifyMeal(): any {
    const ingredientsData = this.meal.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    }));

    const mealWithIngredients = {
      ...this.meal,
      ingredients: ingredientsData,
    };

    return mealWithIngredients;
  }
}
