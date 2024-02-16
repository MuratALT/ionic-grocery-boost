import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ingredient } from 'src/app/model/ingredient';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-new',
  templateUrl: './meal-new.page.html',
  styleUrls: ['./meal-new.page.scss'],
})
export class MealNewPage implements OnInit {
  public meal!: Meal;
  public ingredient!: Ingredient;
  public showAddIngredientForm: boolean = false;

  constructor(
    private MealService: MealService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.meal = new Meal();
    this.ingredient = new Ingredient();
    this.showAddIngredientForm = false;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractères restants`;
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Le repas a été ajouté avec succès.',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/meals']);
      }, 2000);
    });
  }

  add() {
    const jsonifiedMeal = this.JsonifyMeal();
    this.MealService.save(jsonifiedMeal).subscribe(() => {
      this.meal = new Meal();
      this.ingredient = new Ingredient();
      this.presentToast();
      console.log(this.meal);
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
