import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from '../../modelos/paciente.interface';
import { ResponseI } from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl(''),
  });
  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertasService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.createForm.patchValue({
      'token': token,
    });
  }

  crearNewUsuario(form: PacienteI) {
    this.api.postPaciente(form).subscribe((data) => {
      console.log(data);
    });
  }
  cancelar() {
    this.router.navigate(['inicio']);
  }
}
