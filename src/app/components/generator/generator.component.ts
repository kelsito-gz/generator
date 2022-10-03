import { Component, OnInit } from '@angular/core';
import { LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generate(generator: LinealGenerator | LanguageGenerator | MultiplicativeGenerator){
    console.log(generator);
  }

}
