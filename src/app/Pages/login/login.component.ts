import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passForm: FormGroup;
  msjerrorLogin;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }


  buildForm() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });

  }
  logear() {
    this.router.navigate(['/home']);
  }



}
