import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialog-data.model';

@Component({
  selector: 'app-numbers-modal',
  templateUrl: './numbers-modal.component.html',
  styleUrls: ['./numbers-modal.component.css']
})
export class NumbersModalComponent implements OnInit {
  tittle: string;
  message: string;
  accept: string;
  cancel: string;
  formNumber: FormControl;


  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData, public dialogRef: MatDialogRef<NumbersModalComponent>) {
    this.setInfo(data)
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formNumber = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  }

  setInfo(data: DialogData){
    if(data){
      this.tittle = data.tittle ? data.tittle : "Custom question";
      this.message = data.message ? data.message : "Do you accept?";
      this.accept = data.accept ? data.accept : "accept";
      this.cancel = data.cancel ? data.cancel : "cancel";
    }
  }

  acceptModal(){
    this.dialogRef.close(this.formNumber.value);
  }

  cancelModal(){
    this.dialogRef.close(0);
  }

  close(){
    this.dialogRef.close(0);
  }

}
