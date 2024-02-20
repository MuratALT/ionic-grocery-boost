import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Calendar } from 'src/app/model/calendar';
import { Grocery } from 'src/app/model/grocery';
import { GroceryList } from 'src/app/model/grocery-list';
import { Ingredient } from 'src/app/model/ingredient';
import { CalendarService } from 'src/app/service/calendar.service';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-groceries-new',
  templateUrl: './groceries-new.page.html',
  styleUrls: ['./groceries-new.page.scss'],
})
export class GroceriesNewPage implements OnInit {
  selectedPlanningOptionId: string = '';
  calendars!: Calendar[];
  planningVisibility: boolean = false;
  groceryListCreation: boolean = false;
  groceriesIngredients!: GroceryList;
  showAddIngredientForm: boolean = false;
  newIngredient!: Ingredient;
  currentCalendar!: Calendar;

  constructor(
    private calendarService: CalendarService,
    private toastCtrl: ToastController,
    private router: Router,
    private groceryService: GroceryService
  ) {}

  ngOnInit() {
    this.calendarService.getAll().subscribe((data: any) => {
      this.calendars = data;
    });
    this.groceriesIngredients = new GroceryList();
    this.newIngredient = new Ingredient();
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

  handleCheckIngredient(i: number) {
    this.groceriesIngredients.groceries[i].checked =
      !this.groceriesIngredients.groceries[i].checked;
  }

  removeGrocery(index: number) {
    this.groceriesIngredients.groceries.splice(index, 1);
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'La liste de course a été créée avec succès.',
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

  confirmGroceryList() {
    const jsonifiedGroceryList = this.jsonifyGroceryList();
    this.groceryService.save(jsonifiedGroceryList).subscribe(() => {
      this.groceriesIngredients = new GroceryList();
      this.newIngredient = new Ingredient();
      this.selectedPlanningOptionId = '';
      this.planningVisibility = false;
      this.groceryListCreation = false;
      this.presentToast();
    });
  }
}
