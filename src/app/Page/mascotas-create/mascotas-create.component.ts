import { MascotaServiceService } from '../mascota-service.service'
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-mascotas-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mascotas-create.component.html',
  styleUrl: './mascotas-create.component.css'
})
export default class MascotasCreateComponent implements OnInit {
  
  mascotaForm: FormGroup;

  constructor(private MascotaServiceService: MascotaServiceService, private router: Router, private fb: FormBuilder){
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      tipo_identificacion: ['', Validators.required],
      id_propietario: ['', Validators.required],
      nombre_propietario: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      tipo_identificacion: ['', Validators.required],
      id_propietario: ['', Validators.required],
      nombre_propietario: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  Cancelar(){
    this.router.navigate(['home/mascotas-list'])
  }
  onSubmit() {
    if (this.mascotaForm.valid) {
      this.MascotaServiceService.AddMascota(this.mascotaForm.value).subscribe(
        (response) => {
          console.log(this.mascotaForm.value);
          console.log('Mascota agregada con exito', response);

            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Mascota agregada con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['home/mascotas-list']);
          });
        },
        (error) => {
          console.error('Error al agregar mascota', error);
        }
      );
    }
  }
  
}
