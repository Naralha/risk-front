import { Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal-component',
  templateUrl: './success-modal-component.component.html',
  styleUrls: ['./success-modal-component.component.css']
})
export class SuccessModalComponentComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
