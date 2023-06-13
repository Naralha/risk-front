import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaComponent } from './organograma.component';

describe('OrganogramaComponent', () => {
  let component: OrganogramaComponent;
  let fixture: ComponentFixture<OrganogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
