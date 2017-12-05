import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AngularFireModule } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {

  }
}
