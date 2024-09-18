import { Component } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent {
  ngAfterViewInit(){
    const element = document.getElementById("tabs-864039589");
    DDS.Tabs(element);;
  }

}
