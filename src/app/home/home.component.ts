import { Component, OnInit } from '@angular/core';
import { CategorylistComponent} from '../categorylist/categorylist.component';
import { EmpserviceService } from '../empservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
empList:any =""; 
  constructor(private emphttp:EmpserviceService) { }

  ngOnInit() {
    this.emphttp.getAllEmp().subscribe(result=>{
      console.log(result);
      this.empList = result.data;
    });
  }

}
