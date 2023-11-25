import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { StatsSidebarComponent } from './stats-sidebar/stats-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    ImagesGridComponent,
    StatsSidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'image-viewer';
}
