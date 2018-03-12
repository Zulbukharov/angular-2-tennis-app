import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import * as Parse from 'parse';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(
    private router: Router,
  ) {
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  ngOnInit() {
  }

  register() {
      const user = this.model;
      this.loading = true;
      console.log(user);
      const newUser = new Parse.User();
      newUser.set('username', user.username);
      newUser.set('password', user.password);
      newUser.set('firstName', user.firstName);
      newUser.set('lastName', user.lastName);
      newUser.set('phoneNumber', user.phoneNumber);
      newUser.signUp(null, {
        success: function(newUser) {
           // Hooray! Let them use the app now.
      },
        error: function(newUser, error) {
        // Show the error message somewhere and let the user try again.
          this.loading = false;
          alert('Error: ' + error.code + '' + error.message);
      }
      });
      this.router.navigate(['']);
    // const news = new News();
    // news.set('Title', this.model.title);
    // news.set('Text', this.model.text);
    // news.save(null, {
    //   success: function(news) {
    //     this.msg = 'Record is successfully added..... ';
    //   },
    //   error: function(news, error) {
    //     this.msg = '${error.message}..... ';
    //   }
    // }).then(data => {
    //   this.parseRequest();
    //   this.model = {};
    // });
  }

}
