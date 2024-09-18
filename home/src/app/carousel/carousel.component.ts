import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = [
    "assets/carousel 1.jpg",
    "assets/carousel 2.jpg",
    "assets/carousel 3.jpg"
  ];

  currentIndex = 0;
  intervalId:any;

  ngOnInit() { 
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
  }

  changeIndex(index: number) {
    this.currentIndex = index;
  }

}
