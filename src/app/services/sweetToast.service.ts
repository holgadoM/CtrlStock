import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetToastService{
    constructor(){}

    success(msg:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            customClass: {
              title: 'style="color: #545454"',
            },
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            title: msg,
            icon: 'success',
            timer: 3000
          });
          return Toast;
    }

    warning(msg:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            customClass: {
              title: 'style="color: #545454"'
            },
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            title: msg,
            icon: 'warning',
            timer: 3000
          });
          return Toast;
    }

    danger(msg:string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            title: msg,
            icon: 'error',
            timer: 3000
          });
          return Toast;
    }


}