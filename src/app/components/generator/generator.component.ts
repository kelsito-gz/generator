import { Component, OnInit } from '@angular/core';
import { IGenerator, LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';
import { NegativeExponentialGenerator, NormalGenerator, UniformGenerator } from 'src/app/models/type-generator.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  numbersGenerator: IGenerator[] = [];
  constructor() {
    this.numbersGenerator.push(new LanguageGenerator(new UniformGenerator(8, 3, 5)));
    this.numbersGenerator.push(new LanguageGenerator(new NegativeExponentialGenerator(8, 3)));
    this.numbersGenerator.push(new LanguageGenerator(new NormalGenerator(8, 3, 5)));
  }

  ngOnInit(): void {
  }

  generate(generator: IGenerator){
    this.numbersGenerator.push(generator);
  }

  deleteGenerator(generator: IGenerator){
    this.numbersGenerator.splice(this.numbersGenerator.findIndex(x => x == generator), 1);
  }

}
