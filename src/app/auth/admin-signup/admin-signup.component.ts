import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  constructor(private authService: AuthService) { }
    ngOnInit() {
    }
    onSignup(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signupUser(email, password);

}
}
