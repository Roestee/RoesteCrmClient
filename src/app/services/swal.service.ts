import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  callToast(title: string, icon: SweetAlertIcon = 'success') {
    Swal.fire({
      title: title,
      text: '',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-right',
      icon: icon,
    });
  }

  callSwal(
    title: string,
    text: string,
    callBack: () => void,
    icon: SweetAlertIcon = 'question',
    confirmButtonText: string = 'Sil',
    cancelButtonText: string = 'Vazgeç'
  ) {
    Swal.fire({
      title: title,
      text: text,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      icon: icon,
    }).then((res) => {
      if (res.isConfirmed) {
        callBack();
      }
    });
  }
}

export type SweetAlertIcon =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'question';
