import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBArComponent {
  selectedItem:String="Ecommerce";

  selected(item:any)
  {
    this.selectedItem=item;
  }
 
}
