import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Calendar } from 'src/app/model/calendar';
import { Grocery } from 'src/app/model/grocery';
import { GroceryList } from 'src/app/model/grocery-list';
import { Ingredient } from 'src/app/model/ingredient';
import { CalendarService } from 'src/app/service/calendar.service';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-groceries-show',
  templateUrl: './groceries-show.page.html',
  styleUrls: ['./groceries-show.page.scss'],
})
export class GroceriesShowPage implements OnInit {
  selectedPlanningOptionId: string = '';
  calendars!: Calendar[];
  planningVisibility: boolean = false;
  groceryListCreation: boolean = false;
  groceriesIngredients!: GroceryList;
  showAddIngredientForm: boolean = false;
  newIngredient!: Ingredient;
  currentCalendar!: Calendar;
  id!: string;

  constructor(
    private calendarService: CalendarService,
    private toastCtrl: ToastController,
    private router: Router,
    private groceryService: GroceryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.calendarService.getAll().subscribe((data: any) => {
      this.calendars = data;
      this.groceryService.get(this.id).subscribe((data: any) => {
        this.groceriesIngredients = data;
        this.selectedPlanningOptionId = this.groceriesIngredients.calendarId;
        this.updateCurrentCalendar();
        this.groceryListCreation = true;
        this.planningVisibility = true;
      });
    });
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.newIngredient = new Ingredient();
  }

  updatePlanning() {
    this.planningVisibility = false;
    this.groceryListCreation = false;
  }

  confirmPlanning() {
    this.planningVisibility = true;
    this.groceryListCreation = true;

    this.updateCurrentCalendar();
    this.resetIngredients();
    this.initializeIngredients();
  }

  updateCurrentCalendar() {
    this.calendars.forEach((calendar) => {
      if (calendar.id === this.selectedPlanningOptionId) {
        this.currentCalendar = calendar;
      }
    });
  }

  resetIngredients() {
    this.groceriesIngredients = new GroceryList();
  }

  initializeIngredients() {
    this.calendars.forEach((calendar) => {
      if (calendar.id === this.selectedPlanningOptionId) {
        calendar.planners.forEach((planner) => {
          planner.meal.ingredients.forEach((ingredient) => {
            let grocery = new Grocery();
            grocery.ingredient = ingredient;
            grocery.checked = false;
            this.groceriesIngredients.groceries.push(grocery);
          });
        });
      }
    });

    this.sortIngredients();
  }

  sortIngredients() {
    this.groceriesIngredients.groceries =
      this.groceriesIngredients.groceries.sort((a, b) =>
        a.ingredient.name > b.ingredient.name ? 1 : -1
      );
  }

  handleShowAddIngredientForm() {
    this.showAddIngredientForm = !this.showAddIngredientForm;
  }

  addIngredient() {
    let grocery = new Grocery();
    grocery.ingredient = this.newIngredient;
    grocery.checked = false;
    console.log('grocery', grocery);

    this.groceriesIngredients.groceries.push(grocery);
    console.log('groceriesIngredients', this.groceriesIngredients);
    this.sortIngredients();
    this.newIngredient = new Ingredient();
  }

  handleCheckIngredient(i: number) {
    this.groceriesIngredients.groceries[i].checked =
      !this.groceriesIngredients.groceries[i].checked;
  }

  removeGrocery(index: number) {
    this.groceriesIngredients.groceries.splice(index, 1);
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'La liste de course a été modifiée avec succès.',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/groceries']);
      }, 2000);
    });
  }

  jsonifyGroceryList(): any {
    const groceriesData = this.groceriesIngredients.groceries.map(
      (grocery) => ({
        ingredient: {
          name: grocery.ingredient.name,
          quantity: grocery.ingredient.quantity,
          unit: grocery.ingredient.unit,
        },
        checked: grocery.checked,
      })
    );

    const groceryList = {
      ...this.groceriesIngredients,
      startDate: this.currentCalendar.startDate,
      endDate: this.currentCalendar.endDate,
      calendarId: this.currentCalendar.id,
      groceries: groceriesData,
    };

    return groceryList;
  }

  updateGroceryList() {
    const jsonifiedGroceryList = this.jsonifyGroceryList();
    this.groceryService.update(jsonifiedGroceryList).subscribe(() => {
      this.presentToast();
    });
  }
}
