import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService } from '../services/dish.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  dishes: string[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishService.fetchDishes().subscribe(data => {
      this.dishes = Object.keys(data.data);
    });
  }

  onCheckboxChange(dish: string, isChecked: boolean) {
    if (isChecked) {
      this.dishService.selectDish(dish);
    } else {
      this.dishService.deselectDish(dish);
    }
  }
}
