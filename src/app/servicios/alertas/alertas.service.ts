import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toast:ToastrService) { }


  showSuccess(texto: string | undefined, titulo: string | undefined){
    this.toast.success(texto, titulo)
  }
  showError(texto: string | undefined, titulo: string | undefined){
    this.toast.error(texto, titulo)
  }
}
