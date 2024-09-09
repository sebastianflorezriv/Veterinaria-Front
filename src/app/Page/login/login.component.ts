import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Se incluye FormsModule para ngModel
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = 'admin';
  password: string = '0000';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '0000') {
      // Redirigir a la página principal o a otra ruta protegida
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido a la Veterinaria SoftCaribbean',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: 'swal2-center' // Clase personalizada para centrar
        }
      });
      
      this.router.navigate(['home']);
    } else {
      
      // Mostrar un mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      });
    }
  }
}
