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
    let firstIngredient = new Ingredient();
    firstIngredient.name = 'Steak';
    firstIngredient.quantity = 1;
    firstIngredient.unit = 'kg';

    let secondIngredient = new Ingredient();
    secondIngredient.name = 'Frites';
    secondIngredient.quantity = 500;
    secondIngredient.unit = 'g';

    this.meal.ingredients = [firstIngredient, secondIngredient];

    this.ingredient = new Ingredient();
    this.showAddIngredientForm = false;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractères restants`;
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Meal saved successfully',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/meals']);
      }, 2000);
    });
  }

  add() {
    this.MealService.save(this.meal).subscribe(() => {
      this.meal = new Meal();
      this.presentToast();
      console.log('Meal saved successfully');
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
}
