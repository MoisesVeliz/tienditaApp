import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user = {
    userName: '',
    localName: '',
    localLocation: '',
    typeList: 'newList'
  }


  constructor(
    private auth: AuthService,
    public router: Router,
    private lStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  selectTypeList(value: 'default' | 'newList'): void {
    this.user.typeList = value;
  }

  submit(): void {
    this.auth.saveDataUser(this.user).subscribe(res => {
      console.log(res);
      if (res) {
        this.lStorage.setUser(this.lStorage.DATA_USER, res);
        this.router.navigateByUrl('/');
      }
    });
  }

}
