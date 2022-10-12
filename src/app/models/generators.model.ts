import { ITypeGenerator } from "./type-generator.model";

export interface IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;

  getData(): string;
  nextNumber(): number;
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

  getData(){
    let message: string = `Lineal Generator: X(i+1)=(${this.ai}* Xi + ${this.c})/(mod ${this.m}) | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number {
    return 1
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
  getData(){
    let message: string = `Multiplicative Generator: X(i+1)=(${this.ai}* Xi)/(mod ${this.m}) | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number {
    return 1
  }
}

export class LanguageGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;

  constructor(ammount: number, typeGenerator: ITypeGenerator){
    this.ammountNumbers = ammount;
    this.typeGenerator = typeGenerator;
  }
  getData(){
    let message: string = `Language Generator: ${this.typeGenerator} | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number {
    return 1
  }
}
