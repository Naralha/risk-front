import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeOrganogramaComponent } from './tree-organograma.component';

describe('TreeOrganogramaComponent', () => {
  let component: TreeOrganogramaComponent;
  let fixture: ComponentFixture<TreeOrganogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeOrganogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeOrganogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
