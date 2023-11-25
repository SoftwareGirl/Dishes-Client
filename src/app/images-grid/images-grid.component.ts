import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Masonry } from '@fristys/masonry';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-images-grid',
  standalone: true,
  templateUrl: './images-grid.component.html',
  imports: [
    CommonModule
  ]
})
export class ImagesGridComponent implements OnInit {
  @ViewChild('masonryGrid', { static: false }) masonryGrid!: ElementRef;
  images: string[] = [];
  private subscription: Subscription = new Subscription();
  private masonryInstance: Masonry | undefined;
  isLoading = true;
  imageCounts: { [key: string]: number } = {};

  constructor(private dialog: MatDialog, private dishService: DishService) {}

  ngOnInit() {
    this.subscription.add(this.dishService.dishes$.subscribe(dishes => {
      // Map each dish to an observable fetching its images
      const imageRequests = dishes.map(dish => 
        this.dishService.fetchImagesForDish(dish).pipe(
          map(imageNames => ({ dish, imageNames }))
        )
      );
  
      forkJoin(imageRequests).subscribe(results => {
        this.images = []; // Reset images array
        let imageCounts: { [key: string]: number } = {};
  
        for (const result of results) {
          const urls = result.imageNames.map(name => `http://127.0.0.1:8000/${name}`);
          this.images.push(...urls);
          imageCounts[result.dish] = urls.length;
        }
  
        this.checkAllImagesLoaded();
        this.dishService.updateImageCounts(imageCounts); // Update image counts in the service
      });
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Clean up the subscription
  }

  onImageLoad() {
    // Call this method from image (load) event
    // Check if all images are loaded
    this.checkAllImagesLoaded();
  }

  private checkAllImagesLoaded() {
    // Count loaded images
    let loadedImagesCount = 0;
    this.images.forEach(imgSrc => {
      const img = new Image();
      img.onload = () => {
        loadedImagesCount++;
        if (loadedImagesCount === this.images.length) {
          this.initializeMasonry(); // Initialize or update Masonry layout
        }
      };
      img.src = imgSrc;
    });
  }

  private initializeMasonry() {
    if (!this.masonryInstance) {
      this.masonryInstance = new Masonry(this.masonryGrid.nativeElement, {
        gutter: 10,
        gutterUnit: 'px',
        columnBreakpoints: { 960: 2, 740: 1 }
        // ... other options
      });
    } else {
      this.masonryInstance.init(); // Reinitialize if already created
    }
  }

  openImageDialog(imageSrc: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { imageSrc: imageSrc },
      width: '60%', // Adjust size as needed
      height: '60%'
    });
  }
}
