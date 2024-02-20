import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Calendar } from '../model/calendar';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Meal } from '../model/meal';
import { Planner } from '../model/planner';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  calendarSubject = new Subject<Calendar[]>();
  private dbPath = '/calendar';
  calendarsRef: AngularFirestoreCollection<Calendar>;

  constructor(private db: AngularFirestore) {
    this.calendarsRef = db.collection(this.dbPath);
  }

  getAll(): any {
    return this.calendarsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc: any) => {
          return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
        });
      })
    );
  }

  save(calendar: Calendar): any {
    return new Observable((obs) => {
      this.calendarsRef.add({ ...calendar }).then(() => {
        obs.next();
      });
    });
  }

  update(calendar: Calendar) {
    return new Observable((obs) => {
      this.calendarsRef.doc(calendar.id).update(calendar);
      obs.next();
    });
  }

  get(id: string): any {
    return new Observable((obs) => {
      this.calendarsRef
        .doc(id)
        .get()
        .subscribe((res) => {
          obs.next({ id: res.id, ...res.data() });
        });
    });
  }

  delete(id: string) {
    this.db.doc(`calendar/${id}`).delete();
  }
}
