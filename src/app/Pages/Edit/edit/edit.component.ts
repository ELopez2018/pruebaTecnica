import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../../Models/Producto-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticionesService } from '../../../Services/peticiones.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  forma: FormGroup;
  paises: any[];
  producto: ProductoModel;
  id;
  imagenTemp: any;
  constructor(
    private peticionServices: PeticionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.imagenTemp = '../../../assets/sinimagen.jpg';
  }
  GetParam() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id != null) {
      this.peticionServices.GetProducto(id).subscribe((resp: any) => {
        this.forma = new FormGroup({
          id: new FormControl(resp.idpro),
          descripcion: new FormControl(resp.descripcion, [Validators.required]),
          caracteristicas: new FormControl(resp.caracteristicas),
          fechaLanz: new FormControl(resp.fechaLanz),
          emailFab: new FormControl(resp.emailFab, Validators.required),
          paisFab: new FormControl(resp.paisFab),
          precio: new FormControl(resp.precio),
          uniDispon: new FormControl(resp.uniDispon),
          unidVendidas: new FormControl(resp.unidVendidas),
          imagen: new FormControl(resp.imagen),
        });
        this.producto = resp;
      });
    }
  }
  ngOnInit() {
    this.ObtenerPaises();
    this.ObtenerProductos();
    this.GetParam();
  }

  ObtenerPaises() {
    this.peticionServices.GetCountries().subscribe((rest) => {
      this.paises = rest;
    });
  }

  ObtenerProductos() {
    this.peticionServices.GetProductos().subscribe((resp) => {});
  }

  GuardarProducto(forma: ProductoModel) {
    this.peticionServices.CrearProducto(forma).subscribe((resp) => {});
  }
}
