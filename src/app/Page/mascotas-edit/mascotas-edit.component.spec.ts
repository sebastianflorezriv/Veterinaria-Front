import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasEditComponent } from './mascotas-edit.component';

describe('MascotasEditComponent', () => {
  let component: MascotasEditComponent;
  let fixture: ComponentFixture<MascotasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
