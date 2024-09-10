import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    const payload = {
      usuario: this.username,
      contraseña: this.password
    };

    this.loginService.login(payload).subscribe(
      response => {
        if (response.code === 200) { 
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido a la Veterinaria SoftCaribbean',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: 'swal2-center' 
            }
          }).then(() => {
            this.router.navigate(['home']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      }
    );
  }
}
