import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinealComponent } from './lineal/lineal.component';
import { MultiplicativeComponent } from './multiplicative/multiplicative.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { GeneratorComponent } from './generator.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LinealComponent,
    MultiplicativeComponent,
    JavascriptComponent,
    GeneratorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[
    GeneratorComponent,
  ]
})
export class GeneratorModule { }
