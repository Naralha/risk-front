import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-name-dialog',
  templateUrl: './edit-name-dialog.component.html',
  styleUrls: ['./edit-name-dialog.component.css']
})
export class EditNameDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
