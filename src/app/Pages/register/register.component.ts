import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ProductoModel } from "../../Models/Producto-model";
import { PeticionesService } from "../../Services/peticiones.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  paises: any[];
  producto: ProductoModel;
  imagenTemp: any;
  constructor(private peticionServices: PeticionesService) {
    this.forma = new FormGroup({
      idpro: new FormControl(null),
      descripcion: new FormControl(null, [Validators.required]),
      caracteristicas: new FormControl(null),
      fechaLanz: new FormControl(null),
      emailFab: new FormControl(null, Validators.required),
      paisFab: new FormControl(null),
      precio: new FormControl(null),
      uniDispon: new FormControl(null),
      unidVendidas: new FormControl(null),
      imagen: new FormControl(null),
      idFire: new FormControl(null)
    });
  }

  ngOnInit() {
    this.ObtenerPaises();
    this.ObtenerProductos();
    this.imagenTemp = '../../../assets/sinimagen.jpg';
  }

  ObtenerPaises() {
    this.peticionServices.GetCountries().subscribe((rest) => {
      this.paises = rest;
    });
  }

  ObtenerProductos() {
    this.peticionServices.GetProductos().subscribe((resp) => {
      console.log(resp);
    });
  }

  GuardarProducto(forma: ProductoModel) {
    console.log(forma);
    this.peticionServices.CrearProducto(forma).subscribe((resp) => {
      console.log(resp);
      console.log("object");
    });
  }
}
