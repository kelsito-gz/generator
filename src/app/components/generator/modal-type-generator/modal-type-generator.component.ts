import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITypeGenerator, NegativeExponentialGenerator, NormalGenerator, UniformGenerator } from 'src/app/models/type-generator.model';

@Component({
  selector: 'app-modal-type-generator',
  templateUrl: './modal-type-generator.component.html',
  styleUrls: ['./modal-type-generator.component.css']
})
export class ModalTypeGeneratorComponent implements OnInit {

  typeGenerator: string;
  showForm: boolean = false;
  formType: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalTypeGeneratorComponent>, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formType = this.formBuilder.group({
      intervalSize: ['', Validators.required],
    })
  }

  onChangeRadioGroup(event: any){
    this.formType = this.formBuilder.group({
      intervalSize: ['', Validators.required],
    })
    if(event.value){
      switch(event.value){
        case 'uniform':
          this.formType.addControl('lowerLimit', new FormControl('', [Validators.required]))
          this.formType.addControl('upperLimit', new FormControl('', [Validators.required]))
          break;
        case 'normal':
          this.formType.addControl('half', new FormControl('', [Validators.required]))
          this.formType.addControl('standardDeviation', new FormControl('', [Validators.required]))
          break;
        case 'exponential':
          this.formType.addControl('half', new FormControl('', [Validators.required]))
          break;
        default:
          break;
      }
      this.typeGenerator = event.value;
      this.showForm = true;
    }
  }

  generate(){
    let type: ITypeGenerator;
    switch(this.typeGenerator){
      case 'uniform':
        type = new UniformGenerator(
          this.formType.controls['intervalSize'].value,
          this.formType.controls['lowerLimit'].value,
          this.formType.controls['upperLimit'].value,
        );
        break;
      case 'normal':
        type = new NormalGenerator(
          this.formType.controls['intervalSize'].value,
          this.formType.controls['half'].value,
          this.formType.controls['standardDeviation'].value,
        );
        break;
      case 'exponential':
        type = new NegativeExponentialGenerator(
          this.formType.controls['intervalSize'].value,
          this.formType.controls['half'].value,
        );
        break;
      default:
        return;
    }
    this.dialogRef.close(type);
  }

}
