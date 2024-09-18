import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ecomm',
  templateUrl: './ecomm.component.html',
  styleUrls: ['./ecomm.component.css']
})
export class EcommComponent {
@ViewChild ('carousel_slide') carouselSlide!:ElementRef<HTMLElement>;
  constructor(public authService:AuthService){}
  
   imagesArr=[
    
];




}
