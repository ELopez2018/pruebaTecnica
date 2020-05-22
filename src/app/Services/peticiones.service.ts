import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../Models/Producto-model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PeticionesService {
  private url = 'https://pruebatecnica-ef041.firebaseio.com/';
  constructor(private http: HttpClient) {}
  public GetCountries(): Observable<any> {
    return this.http.get<any>('https://restcountries.eu/rest/v2/all');
  }

  public CrearProducto(Producto: ProductoModel) {
    return this.http.post(`${this.url}/Productos.json`, Producto).pipe(
      map((resp: any) => {
        Producto.idFire = resp.name;
        Swal.fire({
          title: 'PRODUCTO CREADO',
          icon: 'success',
          text: 'El Producto fue Creado Satisfactoriamente',
        });
      })
    );
  }
  public ActualizarProducto(Producto: ProductoModel) {
    return this.http
      .put(`${this.url}/Productos/${Producto.idFire}.json`, Producto)
      .pipe(
        map((resp) => {
          Swal.fire({
            title: 'PRODUCTO ACTUALIZADO',
            icon: 'success',
            text: 'El Producto fue Creado Satisfactoriamente',
          });
        })
      );
  }

  public GetProductos() {
    return this.http.get<any>(`${this.url}/Productos.json`).pipe(
      map((resp) => {

        return this.CrearArreglo(resp);
      })
    );
  }
  public GetProducto(id) {
    return this.http.get<any>(`${this.url}/Productos/${id}.json`).pipe(
      map((resp) => {

        return resp;
      })
    );
  }
  CrearArreglo(prodObj: object) {
    const Productos: ProductoModel[] = [];

    Object.keys(prodObj).forEach((key) => {
      var producto = prodObj[key];
      producto.idFire = key;
      Productos.push(producto);
    });

    return Productos;
  }

}
