import { ITypeGenerator } from "./type-generator.model";

export interface IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;
}

export class LinealGenerator implements IGenerator {
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;
  seed: number;
  c: number;
  ai: number;
  m: number;
  constructor(ammount: number, seed: number, g: number, k: number, c: number, typeGenerator: ITypeGenerator){
    this.ammountNumbers = ammount;
    this.seed = seed;
    this.ai = 1 + (4*k);
    this.m = Math.pow(2, g);
    this.c = c;
    this.typeGenerator = typeGenerator;
  }
}

export class MultiplicativeGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;
  seed: number;
  ai: number;
  m: number;
  constructor(ammount: number, seed: number, g: number, k: number, typeGenerator: ITypeGenerator){
    this.ammountNumbers = ammount;
    this.seed = seed;
    this.ai = 1 + (4*k);
    this.m = Math.pow(2, g);
    this.typeGenerator = typeGenerator;
  }
}

export class LanguageGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;

  constructor(ammount: number, typeGenerator: ITypeGenerator){
    this.ammountNumbers = ammount;
    this.typeGenerator = typeGenerator;
  }
}
