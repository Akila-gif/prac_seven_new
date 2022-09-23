import { Component, OnInit } from '@angular/core';
import {Gender} from "../../../../../../prac_seven_new/prac_seven/src/app/entity/Gender";
import {GenderService} from "../../../servise/gender.service";
import {EmployeeService} from "../../../servise/employee.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../../../../prac_seven_new/prac_seven/src/app/entity/Employee";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {

  private selectedId: number = 6;
  genders : Gender[] | undefined = [];
  constructor(private genderService : GenderService,private employeeService : EmployeeService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadGender();
    this.activatedRoute.paramMap.subscribe( async (params)=>{
        // @ts-ignore
        this.selectedId = + params.get('id');
      }
    )
    this.loadEmployee(this.selectedId);
  }

  employeeForm = new FormGroup({
    empTitle : new FormControl("",[
        Validators.required,
      ]
    ),
    empName :  new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^[a-z A-Z]{3,255}$'),
      ]
    ),
    empNic : new FormControl("",[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12),
      Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$'),
    ]),
    empAge :  new FormControl("",[
      Validators.required,
      Validators.min(18),
      Validators.max(50),
    ]),
    empGender :  new FormControl("invalid",[
      Validators.required,
    ])
  });

  get titleField (): FormControl{
    return this.employeeForm.controls.empTitle as FormControl;
  }

  get nameField (): FormControl{
    return this.employeeForm.controls.empName as FormControl;
  }

  get nicField (): FormControl{
    return this.employeeForm.controls.empNic as FormControl;
  }

  get ageField (): FormControl{
    return this.employeeForm.controls.empAge as FormControl;
  }

  get genderField (): FormControl{
    return this.employeeForm.controls.empGender as FormControl;
  }

  selected: any = "Select Gender";

  async loadGender():Promise<void>{
    this.genders =await this.genderService.getAll();
  }
  async loadEmployee(id:number):Promise<void>{
    let employee : Employee | undefined = new Employee();
    employee = await this.employeeService.getAllById(id);

    this.nameField.patchValue(employee?.name);
    this.nicField.patchValue(employee?.nic);
    this.ageField.patchValue(employee?.age);
    this.genderField.patchValue(employee?.gender_id?.id);

  }

  async update() : Promise<void>{
    let employee = new Employee();
    const formgen  = new Gender();


    /*
        employee.name = this.employeeForm.controls.empName.value;
        employee.age = this.employeeForm.controls.empAge.value;
        employee.nic = this.employeeForm.controls.empNic.value;
        formgen.id = this.employeeForm.controls.empGender.value;
        formgen.type = this.employeeForm.controls.empGender.value.name;
    */
    if (!this.employeeForm.valid){
      try {
        window.alert("do you want to update ?");
        employee.name = this.nameField.value;
        employee.age = this.ageField.value;
        employee.nic = this.nicField.value;
        formgen.id = this.genderField.value;
        formgen.type = this.genderField.value;

        employee.gender_id =formgen;
        let a = await this.employeeService.update(JSON.stringify(employee),this.selectedId);
        window.alert(a?.name);
        this.ClearAll();
      }catch (Exe:any) {
        console.log(Exe.error.text);
      }
    }
  }

  ClearAll() {
    this.employeeForm.controls.empName.setValue(null);
    this.employeeForm.controls.empAge.setValue(null);
    this.employeeForm.controls.empNic.setValue(null);
    this.employeeForm.controls.empGender.setValue("noneValue");
    this.employeeForm.reset();
  }


}
