import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from '@angular/common';
import { IGenerator } from 'src/app/models/generators.model';
import { ChartData, ChartOptions } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { NumbersModalComponent } from '../numbers-modal/numbers-modal.component';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  @Input() generator: IGenerator;
  @Input() generatorNumber: number;
  @Output() deleteGenerator: EventEmitter<IGenerator> = new EventEmitter();

  subtitle: string;
  number: number;
  chartOptions: ChartOptions;
  barChartData: ChartData<'bar'>;

  Math: Math = Math;

  displayedColumns = ["interval", "ammount", "expected", "error", "error-percentage", "goodnes-fit-test"];
  labels: string[] = [];
  expectedAmount: number[] = [];
  cumulativeGoodnesFit: number[] = [];
  totalGenerated: number = 0;

  analysis: string;


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initChart();
    this.getSubititle();
  }

  private initChart(): void{
    this.labels = this.truncateLabels(this.generator.getLabels())
    this.expectedAmount = this.generator.getExpectedFrecuency(this.totalGenerated);
    this.barChartData = {
      labels: this.labels,
      datasets: [{
        data: Array(this.generator.typeGenerator.numberIntervals).fill(0),
        label: `Serie ${this.generatorNumber +1}.`
      }],
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
  }
  }

  private truncateLabels(labels: string[]): string[]{
    let labelNormal: string[] = [];
    let numbersOfDecimals = 2;
    labels.forEach(x => {
      let coma: string[] = x.split(",");
      let lowerLimit: string = coma[0].includes("∞") ? "∞" : (parseFloat(coma[0].substring(1))).toFixed(numbersOfDecimals).toString();
      let upperLimit: string = coma[1].includes("∞") ? "∞" : (parseFloat(coma[1].substring(0, coma[1].length - 1))).toFixed(numbersOfDecimals).toString();
      labelNormal.push(`${coma[0].charAt(0)}${lowerLimit},${upperLimit}${coma[1].charAt(coma[1].length -1)}`);
    })
    return labelNormal;
  }

  generateNumber(): void{
    this.number = this.generator.nextNumber();
    this.addNumberToGraphic(this.number);
    this.totalGenerated++;
    this.expectedAmount = this.generator.getExpectedFrecuency(this.totalGenerated);
    this.calculateGoodnesFit();
  }

  calculateGoodnesFit(): void{
    let cumulativeGoodnesFit: number[] = [];
    //This is a test rule
    if(this.totalGenerated > 30){
      for (let i = 0; i < this.labels.length; i++) {
        let observedFrecuency: number = this.barChartData.datasets[0].data[i];
        if(i == 0)
          cumulativeGoodnesFit.push(Math.pow(observedFrecuency - this.expectedAmount[i], 2)/this.expectedAmount[i]);
        else
          cumulativeGoodnesFit.push(cumulativeGoodnesFit[i-1] +(Math.pow(observedFrecuency - this.expectedAmount[i], 2)/this.expectedAmount[i]))
      }
      this.cumulativeGoodnesFit = cumulativeGoodnesFit;
      this.analysisResults();
    }
    else{
      //Kolmogorov-Smirnov test
    }
  }

  analysisResults(){
    let chiTabulated: number = this.chisquaredInverseCumulativeDistribution(this.generator.getDegreesOfFreedom(), 0.95);
    let chiCalculated: number = this.cumulativeGoodnesFit[this.cumulativeGoodnesFit.length - 1];
    if(chiCalculated > chiTabulated){
      this.analysis = `The hypothesis that the generator complies with the ${this.generator.typeGenerator.getDescriptionType()} distribution is rejected, since it should give a coefficient less than ${chiTabulated.toFixed(2)}, and it gave ${chiCalculated.toFixed(2)}.`;
      this.analysis += "This means that the generator is favoring certain intervals and does not meet 95% accuracy."
    } else
      this.analysis = `The hypothesis that the generator complies with the ${this.generator.typeGenerator.getDescriptionType()} distribution is not rejected, since it gave a coefficient less than ${chiTabulated.toFixed(2)}, and it gave ${chiCalculated.toFixed(2)}`;
  }

  generateNumbers(){
    const dialogRef = this.dialog.open(NumbersModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        tittle: 'Generate Many numbers',
        message: 'How many numbers do you want to generate?',
        accept: 'Accept',
        cancel: 'Cancel'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((res: number) => {
      if(res){
        for (let i = 0; i < res; i++) {
          this.generateNumber();
        }
      }
    })
  }

  addNumberToGraphic(newNumber: number){
    let dataset = this.barChartData.datasets[0].data.slice();
    dataset[this.getNumberLabel(newNumber as number)] += 1;
    this.barChartData.datasets = [{data: dataset, label: this.barChartData.datasets[0].label}];
  }

  //This method find the position of the new number in the grapich
  private getNumberLabel(newNumber: number): number{
    let array: string[] = this.barChartData.labels as string[];
    if(array){
      for (let i = 0; i < array.length; i++) {
        let limitsString: string = array[i].slice(1);
        limitsString = limitsString.slice(0, limitsString.length-1)
        const limits: string[] = limitsString.split(',');
        if(newNumber >= parseFloat(limits[0]) && newNumber < parseFloat(limits[1])){
          return i;
        }
        if(i == 0 && newNumber < parseFloat(limits[1]) && limits[0] == "∞"){
          return i;
        }
        if(i == array.length-1 && newNumber >= parseFloat(limits[0]) && limits[1] == "∞"){
          return i;
        }
      }
    }
    return -1;
  }

  private getSubititle(): void{
    this.subtitle = this.generator.getData();
  }

  delete(){
    const dialogRef = this.dialog.open(NumbersModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        tittle: 'Delete generator',
        message: 'Are you sure you wanna delete this?',
        accept: 'Accept',
        cancel: 'Cancel',
        showForm: false,
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.deleteGenerator.emit(this.generator);
      }
    })
  }



  //#region Chi-squared
  chisquaredInverseCumulativeDistribution(freedom: number, p: number){
    return this.gammaLowerRegularizedInv(freedom / 2, p) / 0.5;
  }

  private gammaLowerRegularizedInv(a: number, y0: number): number{
    y0 = 1 - y0;
    let num: number = 4503599627370496.0;
    let num2: number = 0.0;
    let num3: number = 1.0;
    let num4: number = 0.0;
    let num5: number = 1.0 / (9.0 * a);
    let num6: number = 1.0 - num5 - 1.3859292911256331 * this.ErfInv(2.0 * y0 - 1.0) * Math.sqrt(num5);
    let num7: number = a * num6 * num6 * num6;
    let num8: number = this.GammaLn(a);

    for (let i = 0; i < 20; i++)
    {
        if (num7 < num2 || num7 > num)
        {
            num5 = 0.0625;
            break;
        }

        num6 = 1.0 - this.GammaLowerRegularized(a, num7);
        if (num6 < num4 || num6 > num3)
        {
            num5 = 0.0625;
            break;
        }

        if (num6 < y0)
        {
            num = num7;
            num4 = num6;
        }
        else
        {
            num2 = num7;
            num3 = num6;
        }

        num5 = (a - 1.0) * Math.log(num7) - num7 - num8;
        if (num5 < -709.782712893384)
        {
            num5 = 0.0625;
            break;
        }

        num5 = 0.0 - Math.exp(num5);
        num5 = (num6 - y0) / num5;
        if (Math.abs(num5 / num7) < 1E-15)
        {
            return num7;
        }

        if (num5 > num7 / 4.0 && y0 < 0.05)
        {
            num5 = num7 / 10.0;
        }

        num7 -= num5;
    }

    if (num == 4503599627370496.0)
    {
        if (num7 <= 0.0)
        {
            num7 = 1.0;
        }

        while (num == 4503599627370496.0)
        {
            num7 = (1.0 + num5) * num7;
            num6 = 1.0 - this.GammaLowerRegularized(a, num7);
            if (num6 < y0)
            {
                num = num7;
                num4 = num6;
                break;
            }

            num5 += num5;
        }
    }

    let num9: number = 0;
    num5 = 0.5;
    for (let j = 0; j < 400; j++)
    {
        num7 = num2 + num5 * (num - num2);
        num6 = 1.0 - this.GammaLowerRegularized(a, num7);
        num8 = (num - num2) / (num2 + num);
        if (Math.abs(num8) < 5.0000000000000008E-15)
        {
            return num7;
        }

        num8 = (num6 - y0) / y0;
        if (Math.abs(num8) < 5.0000000000000008E-15)
        {
            return num7;
        }

        if (num7 <= 0.0)
        {
            return 0.0;
        }

        if (num6 >= y0)
        {
            num2 = num7;
            num3 = num6;
            if (num9 >= 0)
            {
                num5 = ((num9 <= 1) ? ((y0 - num4) / (num3 - num4)) : (0.5 * num5 + 0.5));
            }
            else
            {
                num9 = 0;
                num5 = 0.5;
            }

            num9++;
        }
        else
        {
            num = num7;
            num4 = num6;
            if (num9 <= 0)
            {
                num5 = ((num9 >= -1) ? ((y0 - num4) / (num3 - num4)) : (0.5 * num5));
            }
            else
            {
                num9 = 0;
                num5 = 0.5;
            }

            num9--;
        }
    }

    return num7;
  }

  private GammaLowerRegularized(a: number, x:number)
  {
    let num = a * Math.log(x) - x - this.GammaLn(a);
    if (num < -709.782712893384)
    {
        if (!(a < x))
        {
            return 0.0;
        }
        return 1.0;
    }
    if (x <= 1.0 || x <= a)
    {
      let num2 = a;
      let num3 = 1.0;
      let num4 = 1.0;
      do
      {
          num2 += 1.0;
            num3 = num3 * x / num2;
            num4 += num3;
        }
        while (num3 / num4 > 1E-15);
        return Math.exp(num) * num4 / a;
    }
    let num5 = 0;
    let num6 = 1.0 - a;
    let num7 = x + num6 + 1.0;
    let num8 = 1.0;
    let num9 = x;
    let num10 = x + 1.0;
    let num11 = num7 * x;
    let num12 = num10 / num11;
    let num17;
    do
    {
        num5++;
        num6 += 1.0;
        num7 += 2.0;
        let num13 = num6 * num5;
        let num14 = num10 * num7 - num8 * num13;
        let num15 = num11 * num7 - num9 * num13;
        if (num15 != 0.0)
        {
          let num16 = num14 / num15;
          num17 = Math.abs((num12 - num16) / num16);
          num12 = num16;
        }
        else
        {
          num17 = 1.0;
        }
        num8 = num10;
        num10 = num14;
        num9 = num11;
        num11 = num15;
        if (Math.abs(num14) > 4503599627370496.0)
        {
          num8 *= 2.2204460492503131E-16;
          num10 *= 2.2204460492503131E-16;
          num9 *= 2.2204460492503131E-16;
          num11 *= 2.2204460492503131E-16;
        }
    }
    while (num17 > 1E-15);
    return 1.0 - Math.exp(num) * num12;
  }

  private readonly GammaDk: number[] = [
    2.4857408913875355E-05,
    1.0514237858172197,
    -3.4568709722201625,
    4.5122770946689483,
    -2.9828522532357664,
    1.056397115771267,
    -0.19542877319164587,
    0.017097054340444121,
    -0.00057192611740430573,
    4.6339947335990567E-06,
    -2.7199490848860772E-09
  ]

  private readonly ErvInvImpAn: number[] = [
    -0.00050878194965828065,
    -0.0083687481974173677,
    0.033480662540974461,
    -0.012692614766297404,
    -0.036563797141176267,
    0.021987868111116891,
    0.0082268787467691569,
    -0.0053877296507124292
  ];

  private readonly ErvInvImpAd: number[] = [
    1.0,
    -0.97000504330329063,
    -1.5657455823417585,
    1.5622155839842302,
    0.662328840472003,
    -0.71228902341542844,
    -0.05273963823400997,
    0.079528368734157168,
    -0.0023339375937419,
    0.00088621639045642468
  ];

  private readonly ErvInvImpBn: number[] = [
    -0.20243350835593876,
    0.10526468069939171,
    8.3705032834312,
    17.644729840837403,
    -18.851064805871424,
    -44.6382324441787,
    17.445385985570866,
    21.129465544834051,
    -3.6719225470772936
  ];

  private readonly ErvInvImpBd: number[] = [
    1.0,
    6.2426412485424754,
    3.9713437953343869,
    -28.66081804998,
    -20.14326346804852,
    48.560921310873994,
    10.826866735546016,
    -22.643693341313973,
    1.7211476576120028
  ];

  private readonly ErvInvImpCn: number[] = [
    -0.1311027816799519,
    -0.16379404719331705,
    0.11703015634199525,
    0.38707973897260434,
    0.33778553891203589,
    0.14286953440815717,
    0.029015791000532906,
    0.0021455899538880526,
    -6.7946557518112632E-07,
    2.8522533178221704E-08,
    -6.81149956853777E-10
  ];

  private readonly ErvInvImpCd: number[] = [
    1.0,
    3.4662540724256723,
    5.3816834570700687,
    4.778465929458438,
    2.5930192162362027,
    0.848854343457902,
    0.15226433829533179,
    0.011059242293464892
  ];

  private readonly ErvInvImpDn: number[] = [
    -0.0350353787183178,
    -0.0022242652921344794,
    0.018557330651423107,
    0.0095080470132591962,
    0.0018712349281955923,
    0.00015754461742496055,
    4.60469890584318E-06,
    -2.3040477691188261E-10,
    2.6633922742578204E-12
  ];

  private readonly ErvInvImpDd: number[] = [
    1.0,
    1.3653349817554064,
    0.76205916455362344,
    0.22009110576413124,
    0.03415891436709477,
    0.00263861676657016,
    7.6467529230279444E-05
  ];

  private readonly ErvInvImpEn: number[] = [
    -0.016743100507663373,
    -0.0011295143874558028,
    0.001056288621524929,
    0.00020938631748758808,
    1.4962478375834237E-05,
    4.4969678992770644E-07,
    4.6259616352287857E-09,
    -2.8112873562883179E-14,
    9.9055709973310331E-17
  ];

  private readonly ErvInvImpEd: number[] = [
    1.0,
    0.59142934488641752,
    0.13815186574908331,
    0.016074608709367652,
    0.00096401180700516557,
    2.7533547476472603E-05,
    2.82243172016108E-07
  ];

  private readonly ErvInvImpFn: number[] = [
    -0.0024978212791898131,
    -7.79190719229054E-06,
    2.5472303741302746E-05,
    1.6239777734251093E-06,
    3.9634101130480117E-08,
    4.1163283119094419E-10,
    1.4559628671867504E-12,
    -1.1676501239718427E-18
  ];

  private readonly ErvInvImpFd: number[] = [
    1.0,
    0.20712311221442251,
    0.01694108381209759,
    0.00069053826562268464,
    1.4500735981823264E-05,
    1.4443775662814415E-07,
    5.0976127659977847E-10
  ];

  private readonly ErvInvImpGn: number[] = [
    -0.00053904291101907853,
    -2.8398759004727723E-07,
    8.994651148922914E-07,
    2.2934585926592085E-08,
    2.2556144486350015E-10,
    9.478466275030226E-13,
    1.3588013010892486E-15,
    -3.4889039339994887E-22
  ];

  private readonly ErvInvImpGd: number[] = [
    1.0,
    0.084574623400189938,
    0.002820929847262647,
    4.6829292194089421E-05,
    3.999688121938621E-07,
    1.6180929088790448E-09,
    2.315586083102596E-12
  ];

  private GammaLn(z: number){
    if (z < 0.5)
    {
        let num = this.GammaDk[0];
        for (let i = 1; i <= 10; i++)
        {
            num += this.GammaDk[i] / (i - z);
        }

        return 1.1447298858494002 - Math.log(Math.sin(Math.PI * z)) - Math.log(num) - 0.6207822376352452 - (0.5 - z) * Math.log((0.5 - z + 10.900511) / Math.E);
    }

    let num2 = this.GammaDk[0];
    for (let j = 1; j <= 10; j++)
    {
        num2 += this.GammaDk[j] / (z + j - 1.0);
    }

    return Math.log(num2) + 0.6207822376352452 + (z - 0.5) * Math.log((z - 0.5 + 10.900511) / Math.E);
  }

  private ErfInv(z: number)
  {
      if (z == 0.0)
      {
          return 0.0;
      }

      if (z >= 1.0)
      {
        return Number.POSITIVE_INFINITY;
      }

      if (z <= -1.0)
      {
        return Number.NEGATIVE_INFINITY;
      }

      let num;
      let q;
      let s;
      if (z < 0.0)
      {
          num = 0.0 - z;
          q = 1.0 - num;
          s = -1.0;
      }
      else
      {
          num = z;
          q = 1.0 - z;
          s = 1.0;
      }

      return this.ErfInvImpl(num, q, s);
  }

  private ErfInvImpl(p: number, q: number, s: number)
  {
    let num3;
    if (p <= 0.5)
    {
      let num = p * (p + 10.0);
      let num2 = this.Evaluate(p, this.ErvInvImpAn) / this.Evaluate(p, this.ErvInvImpAd);
      num3 = num * 0.089131474494934082 + num * num2;
    }
    else if (q >= 0.25)
    {
      let num4 = Math.sqrt(-2.0 * Math.log(q));
      let z = q - 0.25;
      let num5 = this.Evaluate(z, this.ErvInvImpBn) / this.Evaluate(z, this.ErvInvImpBd);
      num3 = num4 / (2.249481201171875 + num5);
    }
    else
    {
      let num6 = Math.sqrt(0.0 - Math.log(q));
      if (num6 < 3.0)
      {
        let z2 = num6 - 1.125;
        let num7 = this.Evaluate(z2, this.ErvInvImpCn) / this.Evaluate(z2, this.ErvInvImpCd);
        num3 = 0.807220458984375 * num6 + num7 * num6;
      }
      else if (num6 < 6.0)
      {
        let z3 = num6 - 3.0;
        let num8 = this.Evaluate(z3, this.ErvInvImpDn) / this.Evaluate(z3, this.ErvInvImpDd);
        num3 = 0.93995571136474609 * num6 + num8 * num6;
      }
      else if (num6 < 18.0)
      {
        let z4 = num6 - 6.0;
        let num9 = this.Evaluate(z4, this.ErvInvImpEn) / this.Evaluate(z4, this.ErvInvImpEd);
        num3 = 0.98362827301025391 * num6 + num9 * num6;
      }
      else if (num6 < 44.0)
      {
        let z5 = num6 - 18.0;
        let num10 = this.Evaluate(z5, this.ErvInvImpFn) / this.Evaluate(z5, this.ErvInvImpFd);
        num3 = 0.99714565277099609 * num6 + num10 * num6;
      }
      else
      {
        let z6 = num6 - 44.0;
        let num11 = this.Evaluate(z6, this.ErvInvImpGn) / this.Evaluate(z6, this.ErvInvImpGd);
        num3 = 0.99941349029541016 * num6 + num11 * num6;
      }
    }
    return s * num3;
  }

  private Evaluate(z: number, coefficients: number[])
  {
    if (coefficients == null)
    {
        return 0;
    }
    let num = coefficients.length;
    if (num == 0)
    {
        return 0.0;
    }
    let num2 = coefficients[num - 1];
    for (let num3 = num - 2; num3 >= 0; num3--)
    {
        num2 *= z;
        num2 += coefficients[num3];
    }
    return num2;
  }
  //#endregion

}
