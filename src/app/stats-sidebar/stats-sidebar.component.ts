import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-stats-sidebar',
  templateUrl: './stats-sidebar.component.html',
  styleUrls: ['./stats-sidebar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class StatsSidebarComponent implements OnInit, OnDestroy {
  public chartOptions: any;
  private subscription!: Subscription;

  constructor(private dishService: DishService) {
    // Initialize chartOptions with default values
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: [],
      // ... other options
    };
  }

  ngOnInit() {
    this.subscription = this.dishService.imageCounts$.subscribe(counts => {
      this.updateChartData(counts);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateChartData(counts: any) {
    // Assuming counts is an object with {dish: count}
    this.chartOptions.series = Object.values(counts);
    // If you need to update labels dynamically, you can do it here
    this.chartOptions.labels = Object.keys(counts);
  }
}