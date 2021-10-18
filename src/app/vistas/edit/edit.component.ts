import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from '../../modelos/paciente.interface';
import { ResponseI } from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alertas: AlertasService
  ) {}

  datosPaciente: PacienteI | undefined;
  editarForm = new FormGroup({
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

  ngOnInit(): void {
    let pacienteid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSinglePaciente(pacienteid).subscribe((data) => {
      this.datosPaciente = data;
      this.editarForm.patchValue({
        'nombre': this.datosPaciente?.Nombre,
        'correo': this.datosPaciente?.Correo,
        'dni': this.datosPaciente?.DNI,
        'direccion': this.datosPaciente?.Direccion,
        'codigoPostal': this.datosPaciente?.CodigoPostal,
        'genero': this.datosPaciente?.Genero,
        'telefono': this.datosPaciente?.Telefono,
        'token': token,
        'pacienteId': pacienteid,
        'fechaNacimiento': this.datosPaciente?.FechaNacimiento,
      });
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  actualizarForm(form: PacienteI) {
    this.api.putPacientes(form).subscribe((data) => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 'ok') {
        this.alertas.showSuccess('Se actualizó con exito', 'Actualizar');
      } else {
        this.alertas.showError('Error al Actualizar!!', 'Error');
      }
    });
  }
  eliminar() {
    let datos: PacienteI = this.editarForm.value;
    this.api.eliminarPacientes(datos).subscribe((data) => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 'ok') {
        this.alertas.showSuccess('Se eliminó el paciente', 'Eliminar');
        this.router.navigate(['inicio']);
      } else {
        this.alertas.showError(respuesta.result.error_msg, 'Error');
      }
    });
  }

  cancelar() {
    this.router.navigate(['inicio']);
  }
}
