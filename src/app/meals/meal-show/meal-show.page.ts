import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-show',
  templateUrl: './meal-show.page.html',
  styleUrls: ['./meal-show.page.scss'],
})
export class MealShowPage implements OnInit {
  public mealId: string = '';
  public meal!: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) {}

  ngOnInit() {
    this.meal = new Meal();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.mealId = id;
    }
    this.mealService.get(this.mealId).subscribe((data: any) => {
      this.meal = data;
    });
  }
}
