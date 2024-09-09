import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasCreateComponent } from './mascotas-create.component';

describe('MascotasCreateComponent', () => {
  let component: MascotasCreateComponent;
  let fixture: ComponentFixture<MascotasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
