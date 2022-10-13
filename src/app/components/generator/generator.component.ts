import { Component, OnInit } from '@angular/core';
import { LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';
import { UniformGenerator } from 'src/app/models/type-generator.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  numbersGenerator: any[] = [];
  constructor() {
    this.numbersGenerator.push(new LinealGenerator(12, 6, 3, 3, 7, new UniformGenerator(12, 0, 1)));
  }

  ngOnInit(): void {
  }

  generate(generator: LinealGenerator | LanguageGenerator | MultiplicativeGenerator){
    this.numbersGenerator.push(generator);
  }

}
