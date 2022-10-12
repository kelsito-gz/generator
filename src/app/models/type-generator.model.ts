export interface ITypeGenerator{
  intervalSize: number;
  firstVariable: number;
  secondVariable: number;

  getData(): string;
}

export class UniformGenerator implements ITypeGenerator{
  firstVariable: number;  //lowerLimit
  secondVariable: number;  //upperLimit
  intervalSize: number;

  constructor(intervalSize: number, lowerLimit: number, upperLimit: number){
    this.firstVariable = lowerLimit;
    this.secondVariable = upperLimit;
    this.intervalSize = intervalSize;
  }

  getData(): string{
    return `Uniform: Interval Size: ${this.intervalSize}, Lower Limit: ${this.firstVariable}, Upper Limit: ${this.secondVariable}`;
  }
}

export class NormalGenerator implements ITypeGenerator{
  firstVariable: number;   //half
  secondVariable: number;  //standard deviation
  intervalSize: number;

  constructor(intervalSize: number, half: number, deviation: number){
    this.firstVariable = half;
    this.secondVariable = deviation;
    this.intervalSize = intervalSize;
  }

  getData(): string{
    return `Normal: Interval Size: <${this.intervalSize}, Half: ${this.firstVariable}, Deviation: ${this.secondVariable}`;
  }
}

export class NegativeExponentialGenerator implements ITypeGenerator{
  firstVariable: number;  //half
  secondVariable: number; //null
  intervalSize: number;

  constructor(intervalSize: number, half: number){
    this.firstVariable = half;
    this.intervalSize = intervalSize;
  }

  getData(): string{
    return `Negative Exponential: Interval Size: ${this.intervalSize}, Half: ${this.firstVariable}`;
  }
}
