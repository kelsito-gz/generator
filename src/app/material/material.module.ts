import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
  ],
  exports: [
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
