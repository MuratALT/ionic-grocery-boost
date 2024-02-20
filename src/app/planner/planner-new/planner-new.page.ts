import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Calendar } from 'src/app/model/calendar';
import { Meal } from 'src/app/model/meal';
import { Planner } from 'src/app/model/planner';
import { CalendarService } from 'src/app/service/calendar.service';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-planner-new',
  templateUrl: './planner-new.page.html',
  styleUrls: ['./planner-new.page.scss'],
})
export class PlannerNewPage implements OnInit {
  meals!: Array<Meal>;
  calendar = new Calendar();
  calendarVisibility: boolean = false;
  selectedMealOptionIds: string[] = [];

  constructor(
    private mealService: MealService,
    private calendarService: CalendarService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.mealService.getAll().subscribe((data: any) => {
      this.meals = data;
    });
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Le planning a été ajouté avec succès.',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/planner']);
      }, 500);
    });
  }

  handleCalendar() {
    this.calendarVisibility = true;
  }

  confirmCalendar() {
    this.calendarVisibility = true;
    this.sendData();
  }

  updateCalendar() {
    this.calendarVisibility = false;
  }

  sendData() {
    console.log(this.calendar);
    this.resetPlanners();
    this.initializePlanners();
  }

  jsonifiedCalendar(): any {
    const plannersData = this.calendar.planners.map((planner) => ({
      date: planner.date,
      meal: planner.meal,
    }));

    const calendarWithPlanners = {
      ...this.calendar,
      planners: plannersData,
    };

    return calendarWithPlanners;
  }

  handleConfirm() {
    for (let i = 0; i < this.selectedMealOptionIds.length; i++) {
      let meal = new Meal();
      this.mealService
        .get(this.selectedMealOptionIds[i])
        .subscribe((data: any) => {
          meal = data;
          this.addMealToPlannerByIndex(meal, i);
        });
    }
    setTimeout(() => {
      const jsonifiedCalendar = this.jsonifiedCalendar();

      console.log(`Calendar with planners:`);
      console.dir(jsonifiedCalendar);

      this.calendarService.save(jsonifiedCalendar).subscribe(() => {
        this.calendar = new Calendar();
        this.presentToast();
      });
    }, 1000);
  }

  resetPlanners() {
    this.calendar.planners = [];
    this.selectedMealOptionIds = [];
  }

  plannersExist() {
    return this.calendar.planners.length > 0;
  }

  addMealToPlannerByIndex(meal: Meal, plannerIndex: number): void {
    this.calendar.planners[plannerIndex].meal = meal;
  }

  initializePlanners() {
    let start = new Date(this.calendar.startDate!);
    let end = new Date(this.calendar.endDate!);

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      let planner = new Planner();
      planner.date = new Date(date).toISOString();
      this.calendar.planners.push(planner);
    }
    console.log(`Planners initialized:`);
    console.dir(this.calendar.planners);
  }
}
