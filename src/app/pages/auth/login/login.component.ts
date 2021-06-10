import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  keysForm: User = {
    email: 'email',
    password: 'password'
  };

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      [this.keysForm.email]: [''],
      [this.keysForm.password]: ['']
    });
  }

  iniciarSesion(): void {
    this.auth.singIn(this.userForm.value);
  }

}
