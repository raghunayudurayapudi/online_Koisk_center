import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  token: string;
  auth:any;
  istokenavialble: BehaviorSubject<boolean>;
  constructor(private router: Router, private af: AngularFire) {
  const istokenkey = Object.keys(window.localStorage)
    .filter(item => item.startsWith('firebase:authUser'))[0] ? true : false;

    this.istokenavialble = new BehaviorSubject(istokenkey);
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
      console.log(this.auth);
      this.istokenavialble.next(true);
    },
       (error) => {console.log(error);
            this.istokenavialble.next(false);
          }
  );
  }

  signupUser(emailaddress: string, pass: string) {
    this.af.auth.createUser({email: emailaddress, password: pass}).then(() => {console.log('success');
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
      console.log(this.auth);
      this.token = auth['uid'];
      this.istokenavialble.next(true);
      this.router.navigate(['/admin-home']);
    },
       (error) => {console.log(error);
            this.istokenavialble.next(false);
          }
  );
    this.istokenavialble.next(true);
    }
  )
    .catch(error => console.log(error));
    // firebase.auth().createUserWithEmailAndPassword(email, password).then(
    //   res => {
    //     firebase.auth().currentUser.getToken()
    //     .then(
    //       (token: string) => {this.token = token;
    //         this.istokenavialble.next(true);
    //       this.router.navigate(['/admin-home']); }
    //     );
    //   }
    // )
    //   .
  }

  signinUser(emailaddress: string, pass: string) {
    this.af.auth.login({email: emailaddress, password: pass},
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }
    )
      .then(
       () => {
          console.log('sucessful Login');
          this.istokenavialble.next(true);
          this.router.navigate(['/admin-home']);
        }
      )
      .catch(
       error => {console.log(error);
        this.istokenavialble.next(false); }
      );
  }

  logout() {
   this.af.auth.logout();
   this.istokenavialble.next(false);
   this.token = null;
   this.router.navigate(['home']);
  }

  isAuthenticated() {
    return this.token != null;
  }
}
