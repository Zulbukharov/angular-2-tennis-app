import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;
  current_user: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.current_user = false;
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  ngOnInit() {
    this.currentUser = Parse.User.current();
    if (this.currentUser) {
      if (this.currentUser.id) {
        this.current_user = true;
      }
    } else {
    }
  }

  exit() {
    window.localStorage.removeItem('Parse/1/currentUser');
    location.reload();
  }

}
