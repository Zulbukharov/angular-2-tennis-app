import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  msg: any;
  current_user: any;
  model: any = {};
  user: any;
  currentUser: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.msg = '';
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
      this.router.navigate(['login']);
    }
  }
  edit () {
    console.log(this.model);
    for (const key in this.model) {
      if (this.model.hasOwnProperty(key)) {
        if (key === 'height' ) {
          this.currentUser.set(key, Number(this.model[key]));
        } else if (key === 'born_date') {
          this.currentUser.set(key, new Date((this.model[key]).replace(/-/g, ',')));
        } else if (key === 'weight' ) {
          this.currentUser.set(key, Number(this.model[key]));
        } else {
          this.currentUser.set(key, this.model[key]);
        }
      }
    }
    this.currentUser.save(
      {success: function(data) {
        this.router.navigate(['']);
        console.log(data);
      }, error: function(data, error) {
        alert(error.message);
      }
      }
    );
    this.model = {};
  }

}
