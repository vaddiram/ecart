import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const apiURL = "http://127.0.0.1:3000/";
@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private http: HttpClient) {
    
  }
  getAllEmp():Observable<any>{
    return this.http.get(apiURL+'getAllEmployees');
  }
  createEmployee(eData):Observable<any>{
    console.log(eData);
    return this.http.post(apiURL+'createEmployee',JSON.parse(eData))
  }
  getSingleEmp(eid):Observable<any>{
    return this.http.get(apiURL+'getSingleEmployee/'+eid);
  }
  updateEmp(empData):Observable<any>{
    //console.log(empData);
    return this.http.put(apiURL+'updateEmployee',empData);
  }
  // deleting single employee
  deleteEmp(eid):Observable<any>{ 
    console.log(eid);
    return this.http.delete(apiURL+'deleteEmployee/'+eid);
  }
}
