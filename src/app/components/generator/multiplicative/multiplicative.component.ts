import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-multiplicative',
  templateUrl: './multiplicative.component.html',
  styleUrls: ['./multiplicative.component.css']
})
export class MultiplicativeComponent implements OnInit {

  formMultiplicative: FormGroup;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    this.initForm();
  }


  ngOnInit(): void {
  }

  initForm(){
    this.formMultiplicative = this._formBuilder.group({
      seed: ['', [Validators.required]],
      k: ['', Validators.required],
      g: ['', Validators.required],
      ammount: ['', Validators.required],
    })
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
