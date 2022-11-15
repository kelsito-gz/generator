import { ITypeGenerator } from "./type-generator.model";

export interface IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;

  getData(): string;
  nextNumber(): number | number[];
  getLabels(): string[];
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

  nextNumber(): number | number[] {
    let xi1 = ((this.ai * this.seed)+this.c)%this.m;
    this.seed = xi1;
    let random = xi1/(this.m);
    if(this.typeGenerator.isNormal()){
      xi1 = ((this.ai * this.seed)+this.c)%this.m;
      this.seed = xi1;
      let random2 = xi1/(this.m);
      return this.typeGenerator.getNumberDistribution(random, random2)
    } else {
      return this.typeGenerator.getNumberDistribution(random);
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
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

  nextNumber(): number | number[] {
    let xi1 = (this.ai * this.seed)%this.m;
    this.seed = xi1;
    let random = xi1/(this.m-1);
    if(this.typeGenerator.isNormal()){
      xi1 = (this.ai * this.seed)%this.m;
      this.seed = xi1;
      let random2 = xi1/(this.m);
      return this.typeGenerator.getNumberDistribution(random, random2)
    } else {
      return this.typeGenerator.getNumberDistribution(random);
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
  }

}

export class LanguageGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  ammountNumbers: number;
  random: Math;

  constructor(ammount: number, typeGenerator: ITypeGenerator){
    this.ammountNumbers = ammount;
    this.typeGenerator = typeGenerator;
    this.random = Math;
  }
  getData(){
    let message: string = `Language Generator: with the clock | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number | number[] {
    let random = this.random.random();
    if(this.typeGenerator.isNormal()){
      let random2 = this.random.random();
      return this.typeGenerator.getNumberDistribution(random, random2)
    } else {
      return this.typeGenerator.getNumberDistribution(random);
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
  }
}
