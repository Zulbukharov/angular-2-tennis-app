import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  model: any = {};
  msg: any = {};
  constructor(
    private router: Router,
  ) {
    this.msg = '';
    this.model = {};
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  ngOnInit() {
    const currentUser = Parse.User.current();
      if (currentUser) {
        this.router.navigate(['']);
    } else {
    // show the signup or login page
    }
  }
  errorHand(user, error) {
    console.log(error);
  }

  login() {
    Promise.resolve(
    Parse.User.logIn(this.model.username, this.model.password, {
      success: function(user) {
        return user;
      },
    })
    ).then(data => {
      if (data.isCurrent) {
        this.router.navigate(['']);
        location.reload();
      } else {
      }
    });
    setTimeout(() => {
      this.msg  = 'error';
     }, 5000);
    setTimeout(() => {
      this.msg  = ' ';
    }, 20000);

  }

}
