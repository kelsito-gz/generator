import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MultiplicativeGenerator } from 'src/app/models/generators.model';
import { ITypeGenerator } from 'src/app/models/type-generator.model';
import { Output, EventEmitter } from '@angular/core';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-multiplicative',
  templateUrl: './multiplicative.component.html',
  styleUrls: ['./multiplicative.component.css']
})
export class MultiplicativeComponent implements OnInit {

  formMultiplicative: FormGroup;
  @Output() generator = new EventEmitter<MultiplicativeGenerator>();

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
            new MultiplicativeGenerator(
              this.formMultiplicative.controls['seed'].value,
              this.formMultiplicative.controls['g'].value,
              this.formMultiplicative.controls['k'].value,
              res
            )
          );
        }
      }
    )
  }

}
