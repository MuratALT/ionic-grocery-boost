import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Calendar } from 'src/app/model/calendar';
import { Meal } from 'src/app/model/meal';
import { Planner } from 'src/app/model/planner';
import { CalendarService } from 'src/app/service/calendar.service';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-planner-show',
  templateUrl: './planner-show.page.html',
  styleUrls: ['./planner-show.page.scss'],
})
export class PlannerShowPage implements OnInit {
  editableMode: boolean = false;
  calendarVisibility: boolean = false;
  calendar!: Calendar;
  originalCalendar!: Calendar;
  plannerEditButton!: any;
  selectedMealOptionIds: string[] = [];
  meals!: Array<Meal>;
  id!: string;

  constructor(
    private mealService: MealService,
    private calendarService: CalendarService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  updateCalendar() {
    this.calendarVisibility = false;
  }

  confirmCalendar() {
    this.calendarVisibility = true;
    this.sendData();
  }

  ngOnInit() {
    this.calendar = new Calendar();
    this.originalCalendar = new Calendar();

    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.calendarService.get(this.id).subscribe((data: any) => {
      this.originalCalendar = data;

      console.dir(this.originalCalendar);
      this.calendar = { ...this.originalCalendar };
      this.sortPlannersByDate();

      this.calendar.planners.forEach((planner: Planner, i: number) => {
        this.selectedMealOptionIds[i] = planner.meal.id || '';
      });
    });

    this.mealService.getAll().subscribe((data: any) => {
      this.meals = data;
    });

    this.editableMode = false;
    this.plannerEditButton = {
      color: 'warning',
      text: 'Modifier le planning',
    };
  }

  getReformattedDate(date: string | null) {
    if (date !== null && date !== undefined && date !== '')
      return new Date(date).toLocaleDateString();
    else return '';
  }

  sortPlannersByDate() {
    this.calendar.planners.sort((a, b) => {
      if (a.date && b.date)
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      else return 0;
    });
  }

  handlePlannerUpdate() {
    this.editableMode = !this.editableMode;
    if (this.editableMode) {
      this.plannerEditButton = {
        color: 'danger',
        text: 'Annuler les modifications',
      };
    } else {
      this.plannerEditButton = {
        color: 'warning',
        text: 'Modifier le planning',
      };
      this.calendar = this.originalCalendar;
    }
  }

  reformatDate(planner: Planner): string {
    let date = new Date(planner.date!);
    let day = date.getDay();
    let reformattedDay = this.reformatDay(day);
    return `${reformattedDay.slice(0, 3)}. ${date.getDate()}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`;
  }

  reformatDay(day: number): string {
    switch (day) {
      case 1:
        return 'Lundi';
        break;
      case 2:
        return 'Mardi';
        break;
      case 3:
        return 'Mercredi';
        break;
      case 4:
        return 'Jeudi';
        break;
      case 5:
        return 'Vendredi';
        break;
      case 6:
        return 'Samedi';
        break;
      case 0:
        return 'Dimanche';
        break;
      default:
        return '';
        break;
    }
  }

  sendData() {
    this.resetPlanners();
    this.initializePlanners();
  }

  resetPlanners() {
    this.calendar.planners = [];
    this.selectedMealOptionIds = [];
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

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Le planning a été modifié avec succès.',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/planner']);
      }, 500);
    });
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

      this.calendarService.update(jsonifiedCalendar).subscribe(() => {
        this.calendar = new Calendar();
        this.presentToast();
      });
    }, 1000);
  }

  addMealToPlannerByIndex(meal: Meal, plannerIndex: number): void {
    this.calendar.planners[plannerIndex].meal = meal;
  }

  async handleDelete() {
    if (this.id !== undefined) {
      const alert = await this.alertCtrl.create({
        header: 'Etes vous sur de vouloir supprimer le planning ?',
        subHeader: 'Cette action est irréversible.',
        buttons: [
          {
            text: 'Annuler',
            role: 'Cancel',
          },
          {
            text: 'Supprimer',
            handler: () => {
              this.deleteCalendar(this.id);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  deleteCalendar(id: string) {
    this.calendarService.delete(id);
    this.router.navigate(['/planner']);
  }
}
