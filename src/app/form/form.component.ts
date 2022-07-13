import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FormComponent>) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close;
  }
}
