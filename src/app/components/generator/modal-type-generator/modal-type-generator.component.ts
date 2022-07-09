import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-type-generator',
  templateUrl: './modal-type-generator.component.html',
  styleUrls: ['./modal-type-generator.component.css']
})
export class ModalTypeGeneratorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTypeGeneratorComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    
  }

  ngOnInit(): void {
  }

}

export class DialogData{

}
