import { MascotaServiceService } from '../mascota-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mascotas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mascotas-list.component.html',
  styleUrl: './mascotas-list.component.css'
})
export default class MascotasListComponent implements OnInit {
  mascotas: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private MascotasServiceService: MascotaServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas() {
    this.MascotasServiceService.getMascotas().subscribe({
      next: (data) => {
        console.log(data);
        this.mascotas = data.data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  Crear() {
    this.router.navigate(['home/mascotas-create']);
  }

  Actualizar(id: any) {
    this.router.navigate(['home/mascotas-edit/', id]);
  }

  DeleteMascota(id: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          let payload = {
            id: id
          };

          this.MascotasServiceService.DeleteMascota(payload).subscribe({
            next: () => {
              this.getMascotas();
              console.log('Mascota eliminada con éxito');

              swalWithBootstrapButtons.fire({
                title: '¡Eliminado!',
                text: 'La Mascota ha sido eliminada.',
                icon: 'success'
              });
            },
            error: (err) => {
              console.error('Error al eliminar Mascota:', err.message);

              if (err.status === 500) {
                swalWithBootstrapButtons.fire({
                  title: 'Error al eliminar',
                  text: 'No se puede eliminar esta Mascota porque tiene datos relacionados.',
                  icon: 'error'
                });
              } else {
                swalWithBootstrapButtons.fire({
                  title: 'Error',
                  text: 'Ocurrió un error inesperado al eliminar la Mascota.',
                  icon: 'error'
                });
              }
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'La Mascota está a salvo :)',
            icon: 'error'
          });
        }
      });
  }

  exportToExcel(): void {
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mascotas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mascotas');
    XLSX.writeFile(wb, 'mascotas.xlsx');
  }
}

