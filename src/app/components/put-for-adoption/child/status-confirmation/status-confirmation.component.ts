import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-confirmation',
  templateUrl: './status-confirmation.component.html',
  styleUrls: ['./status-confirmation.component.scss']
})
export class StatusConfirmationComponent implements OnInit {
  confirm = "confirm"
  constructor(public dialogRef: MatDialogRef<StatusConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}
