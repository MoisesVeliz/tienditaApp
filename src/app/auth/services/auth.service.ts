import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fb;
  constructor(public auth: AngularFireAuth, public router: Router) {

    this.fb = firebase;
  }

  createUser(user: User): void {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const userData = userCredential.user;
        console.log(userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  singIn(user: User): void {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const userData = userCredential.user;
        this.router.navigateByUrl('/');
        console.log(userData);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}
