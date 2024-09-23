import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ecomm',
  templateUrl: './ecomm.component.html',
  styleUrls: ['./ecomm.component.css']
})
export class EcommComponent {

  

  constructor(public authService:AuthService){}
  


}
