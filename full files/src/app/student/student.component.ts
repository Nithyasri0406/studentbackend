import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  constructor(private stuService:StudentService){}
  ngOnInit(): void {
    this.getStudents();
  }

   newStu:Student = {name:"",email:"",phoneNo:"",address:""};
   stuList:Student[]=[];
   editingStudent:Student|null=null;
   updateStudent:Student={name:"",email:"",phoneNo:"",address:""};

   createStudent()
   {
    this.stuService.createStudent(this.newStu).subscribe(result=>{
      this.stuList.push(result);
    });
    this.newStu={name:"",email:"",phoneNo:"",address:""};
   }
   getStudents(){
    this.stuService.getStudents().subscribe(result=>{
            this.stuList=result;
    });
   }

   editStudent(editStudent:Student)
   {
     this.editingStudent=editStudent;
     this.updateStudent={...editStudent}
   }

   updateStudentById()
   {
    this.stuService.updateStudent(this.editingStudent!.stuId!,this.updateStudent).subscribe(result=>{
      const index=this.stuList.findIndex((stu)=>stu.stuId==this.editingStudent!.stuId);
       
      if(index!==-1)
      {
        this.stuList[index]=result;
      }
    });
    this.updateStudent={name:"",email:"",phoneNo:"",address:""};
   }
   deleteStudentById()
   {
    this.stuService.deleteStudent(this.editingStudent!.stuId!).subscribe(()=>
    {
      this.getStudents();
    }
    );
   }
}
