import { Meal } from './meal';

export class Planner {
  meal: Meal;
  date: string | null;

  constructor() {
    this.meal = new Meal();
    this.date = null;
  }

  reformatDate(): string {
    let date = new Date(this.date!);
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
}
