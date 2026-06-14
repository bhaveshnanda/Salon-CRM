import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector:'app-dashboard',
 standalone:true,
 imports:[CommonModule],
 templateUrl:'./dashboard.component.html',
 styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent {

 stats = [
  {
   title:'Today Appointments',
   value:24
  },
  {
   title:'Revenue',
   value:'₹18,500'
  },
  {
   title:'Clients',
   value:146
  },
  {
   title:'Staff',
   value:8
  }
 ];

}