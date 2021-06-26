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

  userForm: FormGroup = this.fb.group({});
  keysForm = {
    EMAIL: 'email',
    PASSWORD: 'password',
    RECORDARME: 'recordarme'
  };

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      [this.keysForm.EMAIL]: ['msveliz16@gmail.com'],
      [this.keysForm.PASSWORD]: ['123456789'],
      [this.keysForm.RECORDARME]: false
    });
  }

  iniciarSesion(): void {
    this.auth.singIn(this.userForm.value);
  }

}
