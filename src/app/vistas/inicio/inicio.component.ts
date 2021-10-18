import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { Router } from "@angular/router";

import { ListapacientesI } from "../../modelos/listapacientes.interface";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  pacientes: ListapacientesI[] = [];


  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllPacientes(1).subscribe(data =>{
     this.pacientes = data;
    })
  }

  nuevoPaciente(){
    this.router.navigate(['create']);
  }

  editarPaciente(id: any): void{
  this.router.navigate(['edit',id]);
  }

}
