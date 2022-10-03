import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit {

  formLineal: FormGroup;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    this.initForm()
  }

  ngOnInit(): void {
  }

  initForm(){
    this.formLineal = this._formBuilder.group({
      seed: ['', [Validators.required]],
      k: ['', Validators.required],
      g: ['', Validators.required],
      ammount: ['', Validators.required],
      c: ['', Validators.required]
    })
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

  simulate(){
    const dialogRef = this.dialog.open(ModalTypeGeneratorComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if(res){
        }
      }
    )
  }

}
