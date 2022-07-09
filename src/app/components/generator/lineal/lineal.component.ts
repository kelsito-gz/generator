import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit {

  formLineal: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.formLineal = this._formBuilder.group({
      Seed: ['', [Validators.required]],
      K: ['', Validators.required],
      G: ['', Validators.required],
      Ammount: ['', Validators.required],
      C: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getMultiplicativeConstant(): number{
    let k = parseFloat(this.formLineal.controls['K'].value);
    return 1 + (4*k);
  }

  getAditiveConstant(): number{
    let c = parseFloat(this.formLineal.controls['C'].value);
    return c;
  }

  getModulator(): number{
    let g = parseFloat(this.formLineal.controls['G'].value);
    return Math.pow(2, g);
  }

  canSimulate(): boolean{
    let g = parseFloat(this.formLineal.controls['G'].value);
    let c = parseFloat(this.formLineal.controls['C'].value);
    let k = parseFloat(this.formLineal.controls['K'].value);
    let seed = parseFloat(this.formLineal.controls['Seed'].value);
    let ammount = parseFloat(this.formLineal.controls['Ammount'].value);
    if(k && g && c && seed && ammount)
      return true;
    return false;
  }

  simulate(){

  }

}
