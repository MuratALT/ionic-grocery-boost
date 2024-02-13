import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Meal } from 'src/app/model/meal';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-new',
  templateUrl: './meal-new.page.html',
  styleUrls: ['./meal-new.page.scss'],
})
export class MealNewPage implements OnInit {
  public meal!: Meal;

  constructor(
    private MealService: MealService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.meal = new Meal();
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
      console.log('1');
      this.meal = new Meal();
      this.presentToast();
      console.log('Meal saved successfully');
      console.log(this.meal);
    });
  }
}
