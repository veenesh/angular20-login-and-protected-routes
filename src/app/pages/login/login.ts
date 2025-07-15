import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  http = inject(HttpClient);
  router = inject(Router)

  loginForm:FormGroup = new FormGroup({
    "email":new FormControl(""),
    "password":new FormControl("")
  });


  onLogin(){
    let formValue = this.loginForm.value;
    this.http.post("/api/login", formValue).subscribe({
      next:(result:any)=>{
        if(result.status){
          alert(result.message);
          sessionStorage.setItem('token', result.token);
          this.router.navigateByUrl('/dashboard')
        }else{
          alert(result.message)
        }
      },
      error:(error)=>{
        alert(error.error);
      }
    });
  }
}
