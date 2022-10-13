export interface ITypeGenerator{
  numberIntervals: number;
  firstVariable: number;
  secondVariable: number;

  getData(): string;
  getLabels(): string[];
}

export class UniformGenerator implements ITypeGenerator{
  firstVariable: number;  //lowerLimit
  secondVariable: number;  //upperLimit
  numberIntervals: number;

  constructor(numberIntervals: number, lowerLimit: number, upperLimit: number){
    this.firstVariable = lowerLimit;
    this.secondVariable = upperLimit;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Uniform: Interval Size: ${this.numberIntervals}, Lower Limit: ${this.firstVariable}, Upper Limit: ${this.secondVariable}`;
  }
  getLabels(): string[]{
    let labels: string[] = [];
    let intervalSize: number = (this.secondVariable - this.firstVariable)/this.numberIntervals;
    for (let i = 0; i < this.numberIntervals; i++) {
       labels.push(`[${(i*intervalSize).toFixed(2)},${(intervalSize*(i+1)).toFixed(2)})`)
    }
    return labels;
  }

}

export class NormalGenerator implements ITypeGenerator{
  firstVariable: number;   //half
  secondVariable: number;  //standard deviation
  numberIntervals: number;

  constructor(numberIntervals: number, half: number, deviation: number){
    this.firstVariable = half;
    this.secondVariable = deviation;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Normal: Interval Size: <${this.numberIntervals}, Half: ${this.firstVariable}, Deviation: ${this.secondVariable}`;
  }
  getLabels(): string[]{
    return [""]
  }
}

export class NegativeExponentialGenerator implements ITypeGenerator{
  firstVariable: number;  //half
  secondVariable: number; //null
  numberIntervals: number;

  constructor(numberIntervals: number, half: number){
    this.firstVariable = half;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Negative Exponential: Interval Size: ${this.numberIntervals}, Half: ${this.firstVariable}`;
  }
  getLabels(): string[]{
    return [""]
  }
}
