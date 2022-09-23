import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../../../../prac_seven_new/prac_seven/src/app/entity/Employee";
import {EmployeeService} from "../../../servise/employee.service";
import {formControl} from "@angular/core/schematics/migrations/typed-forms/util";
import {FormControl, FormGroup} from "@angular/forms";
import {Gender} from "../../../../../../prac_seven_new/prac_seven/src/app/entity/Gender";
import {GenderService} from "../../../servise/gender.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employees : Employee[] | undefined = [];
  displayedColumns: string[] = ['id','name','nic','age','gender_id','btnMore','btnUpdate','btnDelete'];
  genders : Gender[] | undefined = [];

  get NameSearchField() : FormControl{
    return this.searchFormGroup.controls.employeeNameSearch as FormControl;
  }

  get GenderSearchField() : FormControl{
    return this.searchFormGroup.controls.employeeGenderSearch as FormControl;
  }

  searchFormGroup = new FormGroup(
    {
      employeeNameSearch : new FormControl(),
      employeeGenderSearch : new FormControl(),
    }
  );

  //employeeNameSearch = new FormControl();
  //employeeGenderSearch = new FormControl();

  constructor(private employeeService: EmployeeService, private genderService:GenderService) {
    this.loadTable();
    this.loadGender();
  }

  async loadGender():Promise<void> {
    this.genders =  await this.genderService.getAll();
    console.log(this.genders);
  }

  ngOnInit(): void {
  }

  async loadTable():Promise<void>{
    this.employees =await this.employeeService.getAll();
    console.log(this.employees);
  }

  async searchEmp():Promise<void>{
    let name:string  = this.NameSearchField.value;
    let gender:number = this.GenderSearchField.value;
    if (gender!=null && name!=null){
      this.employees =  await this.employeeService.getAllByNameGender(name,gender);
    }
    else if (name!=null){
      this.employees =  await this.employeeService.getAllByName(name);
    }
    else if (gender!=null){
      this.employees =  await this.employeeService.getAllByGender(gender);
    }
    else {
      this.loadTable();
    }
  }

  async deleteEmployee (employee:Employee) : Promise<void>{
    let deleteResult : boolean | undefined = await this.employeeService.deleteEmployee(employee.id);
    console.log(deleteResult);
  }
}
