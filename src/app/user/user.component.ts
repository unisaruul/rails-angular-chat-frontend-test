import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null),
      avatar_image: new FormControl(null)
    })
  }

  onSave() {
    alert("form submit")

    var formData: any = new FormData();
    formData.append("user[nickname]", this.form.get('nickname').value);
    formData.append("user[avatar_image]", this.file);

    this.http.put('http://localhost:3000/api/v1/user/profile', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
  file = null;
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // this.form.get('avatar_image').setValue(file);
    }
  }
}
