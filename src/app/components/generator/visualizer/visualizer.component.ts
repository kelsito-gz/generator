import { Component, OnInit, Input } from '@angular/core';
import {  } from '@angular/common';
import { LanguageGenerator, LinealGenerator, MultiplicativeGenerator } from 'src/app/models/generators.model';
import { ChartData } from 'chart.js';

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

  barChartData: ChartData<'bar'>

  constructor() { }

  ngOnInit(): void {
    this.initChart();
    this.getSubititle();
  }

  private initChart(): void{
    this.barChartData = {
      labels: this.generator.getLabels(),
      datasets: [{
        data: Array(this.generator.typeGenerator.numberIntervals).fill(0),
        label: `Serie ${this.generatorNumber +1}.`
      }]
    };
  }

  generateNumber(){
    this.number = this.generator.nextNumber();
    this.addNumberToGraphic(this.number);
  }

  addNumberToGraphic(newNumber: number){
    let dataset = this.barChartData.datasets[0].data.slice();
    dataset[this.getNumberLabel(newNumber)] += 1;
    this.barChartData.datasets = [{data: dataset, label: this.barChartData.datasets[0].label}];
  }

  private getNumberLabel(newNumber: number): number{
    let array: string[] = this.barChartData.labels as string[];
    if(array){
      for (let i = 0; i < array.length; i++) {
        let limitsString: string = array[i].slice(1);
        limitsString = limitsString.slice(0, limitsString.length-1)
        const limits: string[] = limitsString.split(',');
        if(newNumber >= parseFloat(limits[0]) && newNumber < parseFloat(limits[1]) ){
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
