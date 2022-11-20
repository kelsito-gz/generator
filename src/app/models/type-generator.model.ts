export interface ITypeGenerator{
  numberIntervals: number;

  getData(): string;
  getLabels(): string[];
  getNumberDistribution(num: number, num2?: number): number | number[];
  isNormal(): boolean;
  //The expected frequency is obtained by subtracting the cumulative quantities from the interval limits.
  getExpectedFrecuency(totalAmount: number): number[];
  getAmountOfEmpiricalData(): number;
  getDegreesOfFreedom(): number;
  getDescriptionType(): string;
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
       labels.push(`[${i*intervalSize+this.lowerLimit},${intervalSize*(i+1)+this.lowerLimit})`)
    }
    return labels;
  }

  getNumberDistribution(num: number): number{
    return (num*(this.upperLimit-this.lowerLimit)+this.lowerLimit);
  }

  isNormal(): boolean {
    return false;
  }

  getExpectedFrecuency(totalAmount: number): number[]{
    return new Array(this.numberIntervals).fill(totalAmount/this.numberIntervals);
  }

  getAmountOfEmpiricalData(): number {
    return 0;
  }

  getDegreesOfFreedom(): number {
    return this.numberIntervals - 1 - this.getAmountOfEmpiricalData();
  }

  getDescriptionType(): string {
    return "uniform";
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
    let firstAmmount = this.half - (this.deviation * 2 + intervalSize);
    labels.push(`(∞, ${firstAmmount})`);
    for (let i = 0; i < this.numberIntervals-2; i++) {
      labels.push(`[${firstAmmount + (intervalSize * i)}, ${firstAmmount + (intervalSize*(i+1))})`);
    }
    labels.push(`[${this.half + (this.deviation * 3)}, ∞)`)
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

  getExpectedFrecuency(totalAmount: number): number[]{
    let labels = this.getLabels();
    let expectedFrecuency: number[] = [];
    labels.forEach(label => {
      let coma: string[] = label.split(",");
      let lowerLimit: number = coma[0].includes("∞") ? -9*Math.exp(10000) : parseFloat(coma[0].substring(1));
      let upperLimit: number = coma[1].includes("∞") ? 9*Math.exp(10000) : parseFloat(coma[1].substring(0, coma[1].length - 1));
      if(coma[0].includes("∞") || coma[1].includes("∞")){
        //only 0.1% of each side of the values are found outside the three deviations
        expectedFrecuency.push(Math.abs(totalAmount * 0.1 / 100));
      } else{
        let classMark: number = (upperLimit + lowerLimit) / 2;
        expectedFrecuency.push(Math.abs(this.getCumulative(classMark) * (upperLimit - lowerLimit) * totalAmount));
      }

    });
    return expectedFrecuency;
  }

  private getCumulative(limit: number){
    let firstPart = 1 / (this.deviation * (Math.trunc(Math.sqrt(2 * Math.PI)*100000)/100000));
    let secondPart = Math.exp(-0.5 * Math.pow((limit-this.half)/this.deviation, 2));
    return firstPart * secondPart;
  }

  getAmountOfEmpiricalData(): number {
      return 2;
  }

  getDegreesOfFreedom(): number {
    return this.numberIntervals - 1 - this.getAmountOfEmpiricalData();
  }

  getDescriptionType(): string {
    return "normal";
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
    //Density function:
    //P(0<=X<=x)=1-e^(-half*x) => X = 0.9973 == 99.73%
    //1 - 0.9973 = e^(-half*x)
    //ln(0.0027) = -half * x
    //ln(0.0027)/-half = x => x = upperLimit in the intervals thats gonna be show
    let maxLimit = Math.log(0.0027)/-this.half;
    let intervalSize = maxLimit / (this.numberIntervals - 1);
    for (let i = 0; i < this.numberIntervals-1; i++) {
      labels.push(`[${intervalSize*(i)},${intervalSize*(i+1)})`);
    }
    labels.push(`[${maxLimit},∞)`)
    return labels;
  }

  getNumberDistribution(num: number): number{
    return Math.log(1-num)/(-this.half);
  }

  isNormal(): boolean {
    return false;
  }

  getExpectedFrecuency(totalAmount: number): number[]{
    let labels = this.getLabels();
    let expectedFrecuency: number[] = [];
    labels.forEach(label => {
      let coma: string[] = label.split(",");
      let lowerLimit: number = coma[0].includes("∞") ? -9*Math.exp(10000) : parseFloat(coma[0].substring(1));
      let upperLimit: number = coma[1].includes("∞") ? 9*Math.exp(10000) : parseFloat(coma[1].substring(0, coma[1].length - 1));
      let cumulativeLower: number = this.getCumulative(lowerLimit);
      let cumulativeUpper: number = this.getCumulative(upperLimit);
      expectedFrecuency.push((Math.abs(cumulativeUpper - cumulativeLower)*totalAmount));
    });
    return expectedFrecuency;
  }

  private getCumulative(limit: number){
    return Math.exp(this.half * limit * -1);
  }

  getAmountOfEmpiricalData(): number {
    return 1;
  }

  getDegreesOfFreedom(): number {
    return this.numberIntervals - 1 - this.getAmountOfEmpiricalData();
  }

  getDescriptionType(): string {
    return "negative exponential";
  }
}
