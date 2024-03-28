import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpclient:HttpClient) { }

  apiURL="http://localhost:8080/student"


  createStudent(d:Student):Observable<Student>
  { 
    return this.httpclient.post<Student>(this.apiURL,d);
     
  }
  getStudents():Observable<Student[]>
  {
    return this.httpclient.get<Student[]>(this.apiURL);
  }
  updateStudent(stuId:number,d:Student):Observable<Student>
  {
    return this.httpclient.put<Student>(this.apiURL+'/'+stuId,d);
  }
  deleteStudent(stuId:number){
    return this.httpclient.delete(this.apiURL+'/'+stuId);
  }

}
