import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent {
  @ViewChild ('tabs') tabs!:ElementRef<HTMLElement>
  
  ngAfterViewInit(){
    // const element = document.getElementById("tabs-864039589");
    // DDS.Tabs(element);
    new DDS.Tabs(this.tabs.nativeElement);
  }
}
