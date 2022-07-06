import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinealComponent } from './lineal/lineal.component';
import { MultiplicativeComponent } from './multiplicative/multiplicative.component';
import { JavascriptComponent } from './javascript/javascript.component';


@NgModule({
  declarations: [
    LinealComponent,
    MultiplicativeComponent,
    JavascriptComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class GeneratorModule { }