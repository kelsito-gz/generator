export interface ITypeGenerator{
  numberIntervals: number;

  getData(): string;
  getLabels(): string[];
  getNumberDistribution(num: number, num2?: number): number | number[];
  isNormal(): boolean;
}

export class UniformGenerator implements ITypeGenerator{
  lowerLimit: number;
  upperLimit: number;
  numberIntervals: number;

  constructor(numberIntervals: number, lowerLimit: number, upperLimit: number){
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Uniform: Interval Size: ${this.numberIntervals}, Lower Limit: ${this.lowerLimit}, Upper Limit: ${this.upperLimit}`;
  }

  getLabels(): string[]{
    let labels: string[] = [];
    let intervalSize: number = (this.upperLimit - this.lowerLimit)/this.numberIntervals;
    for (let i = 0; i < this.numberIntervals; i++) {
       labels.push(`[${(i*intervalSize+this.lowerLimit).toFixed(2)},${(intervalSize*(i+1)+this.lowerLimit).toFixed(2)})`)
    }
    return labels;
  }

  getNumberDistribution(num: number): number{
    return (num*(this.upperLimit-this.lowerLimit)+this.lowerLimit);
  }

  isNormal(): boolean {
    return false;
  }

}

export class NormalGenerator implements ITypeGenerator{
  half: number;
  deviation: number;
  numberIntervals: number;

  constructor(numberIntervals: number, half: number, deviation: number){
    this.half = half;
    this.deviation = deviation;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Normal: Interval Size: <${this.numberIntervals}, Half: ${this.half}, Deviation: ${this.deviation}`;
  }

  getLabels(): string[]{
    let labels: string[] = [];
    let intervalSize: number = (this.deviation * 6) / (this.numberIntervals - 2); //Here it is 99.73 % of the numbers;
    labels.push(`(∞, ${this.half - (this.deviation * 2)})`);
    for (let i = 0; i < this.numberIntervals-2; i++) {
      labels.push(`[${this.half - (this.deviation * 6) + (i+2) * intervalSize}, ${this.half - (this.deviation * 6) + (i+3) * intervalSize})`)
    }
    labels.push(`(${this.half + (this.deviation * 2)}, ∞)`)
    return labels;
  }

  getNumberDistribution(num: number, num2: number): number[]{
    let normal: number[] = [];
    let sqrt = this.truncatetofive(Math.sqrt((-2*this.truncatetofive(Math.log(num)))));
    let sin = this.truncatetofive(Math.sin(Math.PI*2*num2));
    let cos = this.truncatetofive(Math.cos(Math.PI*2*num2));
    normal.push(sqrt*sin * this.deviation + this.half );
    normal.push(sqrt*cos * this.deviation + this.half );
    return normal;
  }

  isNormal(): boolean {
    return true;
  }

  private truncatetofive(num: number): number{
    return Math.trunc(num*100000)/100000;
  }
}

export class NegativeExponentialGenerator implements ITypeGenerator{
  half: number;
  numberIntervals: number;

  constructor(numberIntervals: number, half: number){
    this.half = half;
    this.numberIntervals = numberIntervals;
  }

  getData(): string{
    return `Negative Exponential: Interval Size: ${this.numberIntervals}, Half: ${this.half}`;
  }

  getLabels(): string[]{
    let labels: string[] = [];
    for (let i = 0; i < this.numberIntervals; i++) {
      labels.push(`[${i*this.half*this.numberIntervals/100},${(i+1)*this.half*this.numberIntervals/100})`);
    }
    return labels;
  }

  getNumberDistribution(num: number): number{
    return Math.log(1-num)/(-this.half);
  }

  isNormal(): boolean {
    return false;
  }
}
