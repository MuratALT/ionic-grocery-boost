import { Component, OnInit } from '@angular/core';
import { Meal } from '../model/meal';
import { MealService } from '../service/meal.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  meals!: Array<Meal>;

  constructor(
    private mealService: MealService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.mealService.getAll().subscribe((data: any) => {
      this.meals = data;
    });
  }

  getReformattedSrc(src: string) {
    let url = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
    if (src !== '' && src !== undefined && src !== null) {
      url = src;
    }
    return url;
  }

  async setDelete(id: string | undefined) {
    if (id !== undefined) {
      const alert = await this.alertCtrl.create({
        header: 'Etes vous sur de vouloir supprimer le repas ?',
        subHeader: 'Cette action est irréversible.',
        buttons: [
          {
            text: 'Annuler',
            role: 'Cancel',
          },
          {
            text: 'Supprimer',
            handler: () => {
              this.deleteMeal(id);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  deleteMeal(id: string) {
    console.log('deleteMeal', id);
    this.mealService.delete(id);
  }
}
