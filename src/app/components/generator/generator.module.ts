import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinealComponent } from './lineal/lineal.component';
import { MultiplicativeComponent } from './multiplicative/multiplicative.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { GeneratorComponent } from './generator.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTypeGeneratorComponent } from './modal-type-generator/modal-type-generator.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    LinealComponent,
    MultiplicativeComponent,
    JavascriptComponent,
    GeneratorComponent,
    ModalTypeGeneratorComponent,
    VisualizerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule,
  ],
  exports:[
    GeneratorComponent,
  ]
})
export class GeneratorModule { }
