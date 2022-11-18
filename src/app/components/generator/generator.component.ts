import { Component, OnInit } from '@angular/core';
import { LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';
import { NegativeExponentialGenerator, NormalGenerator, UniformGenerator } from 'src/app/models/type-generator.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  numbersGenerator: any[] = [];
  constructor() {
    this.numbersGenerator.push(new LanguageGenerator(new UniformGenerator(8, 3, 5)));
    this.numbersGenerator.push(new LanguageGenerator(new NegativeExponentialGenerator(8, 3)));
    this.numbersGenerator.push(new LanguageGenerator(new NormalGenerator(8, 3, 5)));
  }

  ngOnInit(): void {
  }

  generate(generator: LinealGenerator | LanguageGenerator | MultiplicativeGenerator){
    this.numbersGenerator.push(generator);
  }

}
