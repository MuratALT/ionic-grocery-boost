import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { GroceryList } from '../model/grocery-list';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Meal } from '../model/meal';
import { Grocery } from '../model/grocery';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  grocerySubject = new Subject<GroceryList[]>();
  private dbPath = '/groceryList';
  groceriesRef: AngularFirestoreCollection<GroceryList>;

  constructor(private db: AngularFirestore) {
    this.groceriesRef = db.collection(this.dbPath);
  }

  getAll(): any {
    return this.groceriesRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc: any) => {
          return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
        });
      })
    );
  }

  save(grocery: GroceryList): any {
    return new Observable((obs) => {
      this.groceriesRef.add({ ...grocery }).then(() => {
        obs.next();
      });
    });
  }

  update(grocery: GroceryList) {
    return new Observable((obs) => {
      this.groceriesRef.doc(grocery.id).update(grocery);
      obs.next();
    });
  }

  get(id: string): any {
    return new Observable((obs) => {
      this.groceriesRef
        .doc(id)
        .get()
        .subscribe((res) => {
          obs.next({ id: res.id, ...res.data() });
        });
    });
  }

  delete(id: string) {
    this.db.doc(`groceryList/${id}`).delete();
  }
}
