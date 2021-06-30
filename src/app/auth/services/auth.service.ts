import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { User as UserAuth } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbUrl: string = environment.firebaseConfig.databaseURL;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private storage: LocalStorageService,
    private http: HttpClient,
    private lStorage: LocalStorageService
  ) {

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
        this.storage.setUser(this.storage.SIN_IN_DATA, userLogin);

        this.getUser().subscribe(res => {
          console.log(res);
          if (res) {
            this.router.navigateByUrl('/');
          } else {
            this.router.navigateByUrl('/welcome');
          }
        }, error => {
          console.log(error);
        });


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

  getUser(): Observable<any> {
    return this.http.get(`${this.dbUrl}/user/${this.lStorage.getUser(this.storage.SIN_IN_DATA).userId}.json`);
  }

  saveDataUser(dataUser: any): Observable<any> {
    return this.http.put(`${this.dbUrl}/user/${this.lStorage.getUser(this.storage.SIN_IN_DATA).userId}.json`, dataUser);
  }
}


