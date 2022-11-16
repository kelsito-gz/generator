import { Component, OnInit, Input } from '@angular/core';
import {  } from '@angular/common';
import { LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';
import { ChartData, ChartOptions } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { NumbersModalComponent } from '../numbers-modal/numbers-modal.component';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  @Input() generator: LinealGenerator | LanguageGenerator | MultiplicativeGenerator;
  @Input() generatorNumber: number;
  subtitle: string;
  number: number;
  chartOptions: ChartOptions;

  barChartData: ChartData<'bar'>;

  displayedColumns = ["interval", "ammount"];
  labels: string[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initChart();
    this.getSubititle();
  }

  private initChart(): void{
    this.labels = this.truncateLabels(this.generator.getLabels())
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

  generateNumber(){
    this.number = this.generator.nextNumber();
    this.addNumberToGraphic(this.number);
  }

  generateNumbers(){
    const dialogRef = this.dialog.open(NumbersModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        tittle: 'Tittle',
        message: 'Are you sure you want it',
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


}
