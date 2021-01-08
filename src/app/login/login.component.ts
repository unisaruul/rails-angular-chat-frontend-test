import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {email: 'chinzorigt_saruulgun@unimedia.co.jp', password: '12345678'};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  submit() {
    this.apiService.login(this.user)
      .subscribe(data => {
        localStorage.setItem('user', JSON.stringify(data))
    })
  }
}
