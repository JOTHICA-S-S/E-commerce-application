import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBArComponent {
  @ViewChild('nav1') nav1!:ElementRef<HTMLElement>;
  @ViewChild('nav2') nav2!:ElementRef<HTMLElement>;
  @ViewChild('nav3') nav3!:ElementRef<HTMLElement>;
  // sidenavInstance:any;
  // selectednav:any;

  // ngAfterViewInit(){
  //   this.initializeDDS();
  
  // }

  // initializeDDS()
  // {
  //   const element = document.getElementById("sidenav-217800871");
  //   this.sidenavInstance=DDS.SideNav(element); 
  // }
  
sidenavInstance1:any;
sidenavInstance2:any;
sidenavInstance3:any;


  selected(item:any)
  {
    console.log("nav 1 selected");
    console.log(item);
    switch (item) {
     
      case 'Ecommerce':
      setTimeout(() => 
        {
       this.sidenavInstance1 =new DDS.SideNav(this.nav1.nativeElement);
        this.sidenavInstance1.select();
        console.log("nav 1 selected");
        
      }
    );
      
      break;
      case 'SignUp':
      setTimeout(() => {
        this.sidenavInstance2 =new DDS.SideNav(this.nav2.nativeElement);
        this.sidenavInstance2.select();
        console.log("nav 2 selected");
      },);
      
      break;
      case 'SignIn':
      setTimeout(() => {
        this.sidenavInstance3 =new DDS.SideNav(this.nav3.nativeElement);
        this.sidenavInstance3.select();
        console.log("nav 3 selected");
      },);
      
      break;
}
}
}
