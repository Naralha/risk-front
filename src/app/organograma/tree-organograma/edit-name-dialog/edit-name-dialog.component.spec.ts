import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameDialogComponent } from './edit-name-dialog.component';

describe('EditNameDialogComponent', () => {
  let component: EditNameDialogComponent;
  let fixture: ComponentFixture<EditNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
