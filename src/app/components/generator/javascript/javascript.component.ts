import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LanguageGenerator } from 'src/app/models/generators.model';
import { Output, EventEmitter } from '@angular/core';
import { ITypeGenerator } from 'src/app/models/type-generator.model';
import { ModalTypeGeneratorComponent } from '../modal-type-generator/modal-type-generator.component';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css']
})
export class JavascriptComponent implements OnInit {

  formJavascript: FormGroup;
  @Output() generator = new EventEmitter<LanguageGenerator>();

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(){
    this.formJavascript = this._formBuilder.group({
    })
  }

  simulate(){
    const dialogRef = this.dialog.open(ModalTypeGeneratorComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(
      (res: ITypeGenerator) => {
        if(res){
          this.generator.emit(new LanguageGenerator(
            res
          ));
        }
      }
    )
  }

}
