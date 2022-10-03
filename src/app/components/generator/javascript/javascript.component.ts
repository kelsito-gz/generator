import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css']
})
export class JavascriptComponent implements OnInit {

  formJavascript: FormGroup;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(){
    this.formJavascript = this._formBuilder.group({
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
