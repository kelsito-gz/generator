import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LinealGenerator } from 'src/app/models/generators.model';
import { ITypeGenerator } from 'src/app/models/type-generator.model';
import { Output, EventEmitter } from '@angular/core';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit {

  formLineal: FormGroup;
  @Output() generator = new EventEmitter<LinealGenerator>();

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
      c: ['', Validators.required]
    })
  }

  simulate(){
    const dialogRef = this.dialog.open(ModalTypeGeneratorComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(
      (res: ITypeGenerator) => {
        if(res){
          this.generator.emit(
            new LinealGenerator(
              this.formLineal.controls['seed'].value,
              this.formLineal.controls['g'].value,
              this.formLineal.controls['k'].value,
              this.formLineal.controls['c'].value,
              res
            )
          );
        }
      }
    )
  }

}
