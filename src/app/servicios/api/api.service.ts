import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { ListapacientesI } from '../../modelos/listapacientes.interface';
import { PacienteI } from '../../modelos/paciente.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url: string = 'http://localhost';
  url: string = 'http://api.solodata.es/';

  constructor(private http: HttpClient) {}

  loginByEmail(form: LoginI) {
    let direccion = this.url + 'auth';
    return this.http.post<ResponseI>(direccion, form);
  }

  getAllPacientes(page: number): Observable<ListapacientesI[]> {
    let direccion = this.url + 'pacientes?page=' + page;
    return this.http.get<ListapacientesI[]>(direccion);
  }

  getSinglePaciente(id: string | null): Observable<PacienteI> {
    let direccion = this.url + 'pacientes?id=' + id;
    return this.http.get<PacienteI>(direccion);
  }
  postPaciente(form: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    return this.http.post<ResponseI>(direccion, form);
  }
  putPacientes(form: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    return this.http.put<ResponseI>(direccion, form);
  }

  eliminarPacientes(form: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    let optiones = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      body: form,
    };
    return this.http.delete<ResponseI>(direccion, optiones);
  }
}
