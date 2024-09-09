import { MascotaServiceService } from '../mascota-service.service'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mascotas-edit.component.html',
  styleUrl: './mascotas-edit.component.css'
})
export default class MascotasEditComponent implements OnInit{
  mascotaForm: FormGroup;
  id: string = '';
  isEditing: boolean = false;
  constructor(
    private MascotaServiceService: MascotaServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mascotaForm = this.fb.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      especie: [null, [Validators.required]],
      raza: [null, [Validators.required, Validators.email]],
      fecha_nacimiento: [null, [Validators.required]],
      tipo_identificacion: [null, [Validators.required]],
      id_propietario: [null, [Validators.required]],
      nombre_propietario: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      fecha_registro: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);

    this.loadMascotaData();
  }
  loadMascotaData(): void {
    let payload={
      id:this.id

    }

      this.MascotaServiceService.getMascotaById(payload).subscribe(data => {
       console.log(data.data);
       this.mascotaForm.patchValue({
        id:data.data.id,
        nombre: data.data.nombre,
        especie: data.data.especie,
        raza: data.data.raza,
        fecha_nacimiento: data.data.fecha_nacimiento,
        tipo_identificacion: data.data.tipo_identificacion,
        id_propietario: data.data.id_propietario,
        nombre_propietario: data.data.nombre_propietario,
        ciudad: data.data.ciudad,
        direccion: data.data.direccion,
        telefono: data.data.telefono,
        fecha_registro: data.data.fecha_registro
      });
      });

  }
  onSubmit() {
   

    let mascotaSend: any = this.mascotaForm.getRawValue(); // Obtener los valores del formulario

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡actualizar! ",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.MascotaServiceService.AddMascota(mascotaSend).subscribe(
          (response) => {
            if (response.code == 200) {
              this.ngOnInit();
              swalWithBootstrapButtons.fire({
                title: "¡Actualizado!",
                text: "La mascota ha sido actualizada con éxito.",
                icon: "success"
              }).then(() => {
                console.log('Mascota actualizada', response);
                this.router.navigate(['home/mascotas-list']);
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: response.message,
                icon: "error"
              });
            }
          }
        );
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La actualización ha sido cancelada.",
          icon: "error"
        });
      }
    });
  }



  onCancel(): void {
    this.router.navigate(['home/mascotas-list']);
  }
}
