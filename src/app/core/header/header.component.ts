import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isauthenticated: boolean = false;
  constructor(private authSerive: AuthService) {
    authSerive.istokenavialble.subscribe(data => {
      this.isauthenticated = data;
    });
   }

  ngOnInit() {
  }
  logout() {
    this.authSerive.logout();
  }

}
