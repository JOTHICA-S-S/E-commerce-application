import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    productsData:any=[];

    columns: any[] = [];
    data: any[] = [];

  constructor(private navService:NavigateService, private route:Router){}

  ngOnInit(): void {
    this.get();
}

  ngAfterViewInit(){
    const element = document.getElementById("tabs-895821743");
    DDS.Tabs(element);
  }

  get()
  {  
      this.navService.getProducts().subscribe({
        next:res=>{
            // console.log(res);
            this.productsData=res;
            this.processData(res);
            // console.log(this.productsData);  
        },
        error: err=>{
          
            console.log(err);
            this.route.navigate(["/SignIn"]);
            localStorage.removeItem("token");
          
        }
      })
  }


  processData(response: any[]){
    // Getting the keys of the first object in teh array as all objects has similar keys
    const keys = Object.keys(response[0]);
    console.log("entered processData");
    // console.log(Object.keys(response[0]));
    // console.log(response[0]);
    // console.log("keys : "+keys);
    // console.log("response.keys:"+response.keys());
    
    
    // Creating columns array from keys
    this.columns = keys.map(key => ({ value: key}));
    console.log(this.columns);
    console.log("keys after mapping : "+keys);
    
    
    // Creating data array as per the template
    this.data = response.map(item => {
                                    return{
                                      columns: keys.map(key =>{
                                        return{value: item[key]}})
          
      
    }});
    console.log("data is");
    
    console.log(this.data);
    
    this.initializeTable();
  }

  initializeTable() {
    const element = document.getElementById("table-998110420");
    console.log("entered table initialization");

    DDS.Table(element, {
      data:this.data,
      columns:this.columns
    });
  }

}

