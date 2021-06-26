import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';
import { User as UserAuth } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fb;
  constructor(public auth: AngularFireAuth, public router: Router, private storage: LocalStorageService) {

    this.fb = firebase;
  }

  createUser(user: UserAuth): void {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const userData: firebase.User | null = userCredential.user;
        // const user: User = {
        //   token: userData?.refreshToken,
        //   email: userData?.email,
        //   userId: userData?.uid,
        //   isNewUser: userCredential.additionalUserInfo?.isNewUser
        // };
        // this.storage.setUser(user);

        Swal.fire({
          title: 'Exito!',
          text: 'Usuario creado',
          icon: 'success',
          confirmButtonText: 'ok',
          allowOutsideClick: false,
          allowEscapeKey: false,
          preConfirm: () => {
            this.router.navigateByUrl('/login');
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'ok'
        })
      });
  }

  singIn(user: UserAuth): void {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const userData: firebase.User | null = userCredential.user;
        const userLogin: User = {
          token: userData?.refreshToken,
          email: userData?.email,
          userId: userData?.uid,
          isNewUser: userCredential.additionalUserInfo?.isNewUser
        };
        this.storage.setUser(userLogin);
        this.router.navigateByUrl('/');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'ok'
        })
        // ..
      });
  }
}


