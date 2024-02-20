import { Component, OnInit } from '@angular/core';
import { Calendar } from '../model/calendar';
import { MealService } from '../service/meal.service';
import { AlertController } from '@ionic/angular';
import { CalendarService } from '../service/calendar.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit {
  calendars!: Array<Calendar>;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.getAll().subscribe((data: any) => {
      this.calendars = data;
    });
  }

  getReformattedSrc() {
    let url =
      'https://static.vecteezy.com/system/resources/previews/010/851/447/original/calendar-flat-icon-png.png';
    return url;
  }

  getReformattedDate(date: string | null) {
    if (date !== null && date !== undefined && date !== '')
      return new Date(date).toLocaleDateString();
    else return '';
  }
}
