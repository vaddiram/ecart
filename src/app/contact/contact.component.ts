import { Component, OnInit } from '@angular/core';
//import { MustMatch } from '../must-match.validator';
import { EmpserviceService } from '../empservice.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  cfmodel: any = {};
  constructor(private eService: EmpserviceService) { 
    
  }

  ngOnInit() {
    //this.cfmodel = {firstName:"Murali",lastName:"pagadala",email:"m@gmail.com",
    //password:"12345678", confirmPassword:"12345678"}
    
  }

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.cfmodel));
    this.eService.createEmployee(JSON.stringify(this.cfmodel)).subscribe(data=>{
      console.log(data);
      if(data.error=="false"){
        alert("Thank you registering with us , we will get back to you shortly!");
        
      }
    })
  }

}
