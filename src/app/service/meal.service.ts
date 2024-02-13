import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Meal } from '../model/meal';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private dbPath = '/meal';
  mealsRef: AngularFirestoreCollection<Meal>;

  constructor(private db: AngularFirestore) {
    this.mealsRef = db.collection(this.dbPath);
    console.log('db');
    console.log(db.collection);
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
}
