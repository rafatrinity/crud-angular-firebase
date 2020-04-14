import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireDatabase } from '@angular/fire/database/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private db: AngularFireDatabase) {}
  insert(product: Product) {
    this.db
      .list('product')
      .push(product)
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  update(product: Product, key: string) {
    this.db
      .list('product')
      .update(key, product)
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  delete(key: string) {
    this.db
      .list('product/' + key)
      .remove()
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  getAll() {
    this.db
      .list('product')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val
          }));
        })
      );
  }
}
