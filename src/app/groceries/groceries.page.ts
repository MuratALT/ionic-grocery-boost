import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../service/grocery.service';
import { GroceryList } from '../model/grocery-list';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.page.html',
  styleUrls: ['./groceries.page.scss'],
})
export class GroceriesPage implements OnInit {
  groceries: Array<GroceryList> = [];
  constructor(
    private groceryService: GroceryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.groceryService.getAll().subscribe((data: any) => {
      this.groceries = data;
    });
  }

  getReformattedSrc() {
    return 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-shopping-list-png-image_12161947.png';
  }

  getReformattedDate(date: string | null) {
    if (date !== null && date !== undefined && date !== '')
      return new Date(date).toLocaleDateString();
    else return '';
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
    this.groceryService.delete(id);
  }
}
