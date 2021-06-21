import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  userForm: FormGroup = this.fb.group({});
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

  registrarme(): void {
    this.auth.createUser(this.userForm.value);

  }

}
