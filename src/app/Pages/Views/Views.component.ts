import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../Models/Producto-model';
import { PeticionesService } from '../../Services/peticiones.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Views',
  templateUrl: './Views.component.html',
  styleUrls: ['./Views.component.css'],
})
export class ViewsComponent implements OnInit {
  produtos: ProductoModel[] = [];
  constructor(
    private peticionServices: PeticionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ObtenerProductos();
  }

  ObtenerProductos() {
    this.peticionServices.GetProductos().subscribe((resp) => {
      console.log(resp);
      this.produtos = resp;
    });
  }

  eliminar(idFire) {
    Swal.fire({
      title: '¿ESTA SEGURO?',
      text: 'Esta a punto de Eliminar un Productos, ¿Desea Continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.value) {
        this.peticionServices.GetProductos().subscribe((resp) => {
          this.produtos = resp;
        });
      }
    });
  }

  editProducto(producto: ProductoModel) {
    this.router.navigate(['edit/' + producto.idFire]);
  }
}
