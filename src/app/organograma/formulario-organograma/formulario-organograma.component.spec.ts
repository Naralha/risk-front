import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOrganogramaComponent } from './formulario-organograma.component';

describe('FormularioOrganogramaComponent', () => {
  let component: FormularioOrganogramaComponent;
  let fixture: ComponentFixture<FormularioOrganogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioOrganogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOrganogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
