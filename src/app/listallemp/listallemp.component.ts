import { Component, OnInit } from '@angular/core';
import { EmpserviceService } from '../empservice.service';
import { Router } from '@angular/router';
import { $ } from 'protractor';
@Component({
  selector: 'app-listallemp',
  templateUrl: './listallemp.component.html',
  styleUrls: ['./listallemp.component.css']
})
export class ListallempComponent implements OnInit {
  empList:any="";
  updateM: any = {};
  constructor(private eService: EmpserviceService,private _router: Router) { }

  ngOnInit() {
    this.eService.getAllEmp().subscribe(result=>{
      //console.log(result);
      this.empList = result.data;
    });
  } 
  editEmployee(id){
    //console.log(id);
    this.eService.getSingleEmp(id).subscribe(result=>{
     
      this.updateM = result.data[0];
      console.log(this.updateM);
    });
  }
  /** 
   * Autor: Murali Pagadala
   * Method: saveupdated()
   * Description: This allows user to updated single record
   * Date: 21/04/2019
  */
  saveupdated(){
    //console.log(this.updateM);
    this.eService.updateEmp(this.updateM).subscribe(result=>{
      console.log(result);
      if(result.error=="false"){  
        //console.log(event);      
        //this._router.navigate(['register']);
        //window.location.href = "listall";
        //$('#editEmployee').modal("hide");
        this.ngOnInit();
      }
    });
  }
   /** 
   * Autor: Murali Pagadala
   * Method: deleteEmp()
   * Description: This allows user to delete single record
   * Date: 21/04/2019
  */
  deleteEmp(eid){
    //console.log(this.updateM);
    //var edata = {id:eid.toString()};
    this.eService.deleteEmp(eid).subscribe(result=>{
      if(result.error=="false"){  
        this.ngOnInit();
      }
    });
  }

  
}//closing of class
