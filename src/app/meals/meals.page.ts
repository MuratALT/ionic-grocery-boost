import { Component, OnInit } from '@angular/core';
import { Meal } from '../model/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  meals!: Array<Meal>;

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.mealService.getAll().subscribe((data: any) => {
      console.log(data);
    });
  }
}
