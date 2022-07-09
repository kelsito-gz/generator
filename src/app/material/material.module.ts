import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
