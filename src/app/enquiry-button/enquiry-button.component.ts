import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-enquiry-button',
  templateUrl: './enquiry-button.component.html',
  styleUrls: ['./enquiry-button.component.css'],
})
export class EnquiryButtonComponent implements OnInit {
  openDialog() {
    let dialogRef = this.dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog result:' + { result });
    });
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
