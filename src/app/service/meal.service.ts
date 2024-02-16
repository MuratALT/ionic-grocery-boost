import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Meal } from '../model/meal';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  mealSubject = new Subject<Meal[]>();
  private dbPath = '/meal';
  mealsRef: AngularFirestoreCollection<Meal>;

  constructor(private db: AngularFirestore) {
    this.mealsRef = db.collection(this.dbPath);
  }

  getAll(): any {
    return this.mealsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc: any) => {
          return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
        });
      })
    );
  }

  save(meal: Meal): any {
    return new Observable((obs) => {
      this.mealsRef.add({ ...meal }).then(() => {
        obs.next();
      });
    });
  }

  update(meal: Meal) {
    return new Observable((obs) => {
      this.mealsRef.doc(meal.id).update(meal);
      obs.next();
    });
  }

  get(id: string): any {
    return new Observable((obs) => {
      this.mealsRef
        .doc(id)
        .get()
        .subscribe((res) => {
          obs.next({ id: res.id, ...res.data() });
        });
    });
  }

  delete(id: string) {
    this.db.doc(`meal/${id}`).delete();
  }
}
