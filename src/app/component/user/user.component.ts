import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: any;
  user: any;
  current_user: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.current_user = false;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
   }

  ngOnInit() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      if (currentUser.id === this.id) {
        this.current_user = true;
      }
    } else {
  // show the signup or login page
    }
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.equalTo('objectId', this.id);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
      })).then(res => {
        console.log(res);
        this.user = res;
      });
  }

  dateTransform(data) {
    const date = String(data);
    const clearData = date.slice(4);
    return clearData.replace(clearData.substring(11), '');
  }
}
