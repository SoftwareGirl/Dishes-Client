import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DishService {
  private dishesSubject = new BehaviorSubject<string[]>([]);
  dishes$ = this.dishesSubject.asObservable();

  private imageCounts = new BehaviorSubject<{ [key: string]: number }>({});
  imageCounts$ = this.imageCounts.asObservable();

  constructor(private http: HttpClient) {}

  fetchDishes(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/dishes/');
  }

  fetchImagesForDish(dish: string): Observable<string[]> {
    return this.http.get<string[]>(`http://127.0.0.1:8000/dishes/${dish}`);
  }

  selectDish(dish: string) {
    const currentDishes = [...this.dishesSubject.getValue(), dish];
    this.dishesSubject.next(currentDishes);
  }

  deselectDish(dish: string) {
    const updatedDishes = this.dishesSubject.getValue().filter(d => d !== dish);
    this.dishesSubject.next(updatedDishes);
  }

  updateImageCounts(imageCounts: { [key: string]: number }) {
    this.imageCounts.next(imageCounts);
  }
}
