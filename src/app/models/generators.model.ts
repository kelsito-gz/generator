import { ITypeGenerator } from "./type-generator.model";

export interface IGenerator{
  typeGenerator: ITypeGenerator;

  getData(): string;
  nextNumber(): number;
  getLabels(): string[];
}

export class LinealGenerator implements IGenerator {
  typeGenerator: ITypeGenerator;
  seed: number;
  c: number;
  ai: number;
  m: number;
  nextNumberNormal: number;
  hasNumberOld: boolean = false;

  constructor(seed: number, g: number, k: number, c: number, typeGenerator: ITypeGenerator){
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

  nextNumber(): number{
    if(this.hasNumberOld){
      //We dont have to generate a number if we have one of before, cause this modify the distribution
      let number = this.nextNumberNormal;
      this.hasNumberOld = false;
      return number;
    }
    let xi1 = ((this.ai * this.seed)+this.c)%this.m;
    this.seed = xi1;
    let random = xi1/(this.m);
    if(this.typeGenerator.isNormal()){
      xi1 = ((this.ai * this.seed)+this.c)%this.m;
      this.seed = xi1;
      let random2 = xi1/(this.m);
      let numbersNormals: number[] = this.typeGenerator.getNumberDistribution(random, random2) as number[];
      this.nextNumberNormal = numbersNormals[1];
      this.hasNumberOld = true;
      return numbersNormals[0];
    } else {
      return this.typeGenerator.getNumberDistribution(random) as number;
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
  }
}

export class MultiplicativeGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  seed: number;
  ai: number;
  m: number;
  nextNumberNormal: number;
  hasNumberOld: boolean = false;

  constructor(seed: number, g: number, k: number, typeGenerator: ITypeGenerator){
    this.seed = seed;
    this.ai = 1 + (4*k);
    this.m = Math.pow(2, g);
    this.typeGenerator = typeGenerator;
  }
  getData(){
    let message: string = `Multiplicative Generator: X(i+1)=(${this.ai}* Xi)/(mod ${this.m}) | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number{
    if(this.hasNumberOld){
      //This is because we can he have 0 as a random generated
      //We dont have to generate a number if we have one of before, cause this modify the distribution
      let number = this.nextNumberNormal;
      this.hasNumberOld = false;
      return number;
    }
    let xi1 = (this.ai * this.seed)%this.m;
    this.seed = xi1;
    let random = xi1/(this.m-1);
    if(this.typeGenerator.isNormal()){
      xi1 = (this.ai * this.seed)%this.m;
      this.seed = xi1;
      let random2 = xi1/(this.m);
      let numbersNormals: number[] = this.typeGenerator.getNumberDistribution(random, random2) as number[];
      this.nextNumberNormal = numbersNormals[1];
      this.hasNumberOld = true;
      return numbersNormals[0];
    } else {
      return this.typeGenerator.getNumberDistribution(random) as number;
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
  }

}

export class LanguageGenerator implements IGenerator{
  typeGenerator: ITypeGenerator;
  random: Math;
  nextNumberNormal: number;
  hasNumberOld: boolean = false;

  constructor(typeGenerator: ITypeGenerator){
    this.typeGenerator = typeGenerator;
    this.random = Math;
  }
  getData(){
    let message: string = `Language Generator: with the clock | ${this.typeGenerator.getData()}`;
    return message;
  }

  nextNumber(): number{
    if(this.hasNumberOld){
      //We dont have to generate a number if we have one of before, cause this modify the distribution
      let number = this.nextNumberNormal;
      this.hasNumberOld = false;
      return number;
    }
    let random = this.random.random();
    if(this.typeGenerator.isNormal()){
      let random2 = this.random.random();
      let numbersNormals: number[] = this.typeGenerator.getNumberDistribution(random, random2) as number[];
      this.nextNumberNormal = numbersNormals[1];
      this.hasNumberOld = true;
      return numbersNormals[0];
    } else {
      return this.typeGenerator.getNumberDistribution(random) as number;
    }
  }

  getLabels(): string[] {
    return this.typeGenerator.getLabels();
  }
}
