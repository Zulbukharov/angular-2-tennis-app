import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title: any;
  news: any;
  model: any = {};
  model2: any = {};
  myValue: any;
  isAdmin: any;
  constructor() {
    this.isAdmin = false;
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
    this.news = [];
  }


  addNews() {
    const News = Parse.Object.extend('News');
    const news = new News();
    news.set('Title', this.model.title);
    news.set('Text', this.model.text);
    news.save(null, {
      success: function(news) {
      },
      error: function(news, error) {
      }
    }).then(data => {
      this.parseRequest();
      this.model = {};
    });
  }

  deleteNews(i) {
    this.news[i].destroy({
      success: function(myObject) {
      },
      error: function(myObject, error) {
      }
    }).then(data => {
      this.parseRequest();
    });
  }
  editEmployee(k) {
    this.model2.title = this.news[k].get('Title');
    this.model2.text = this.news[k].get('Text');
    this.myValue = k;

  }
  updateNews() {
    const k = this.myValue;
    const brooda = this.news[k];
    brooda.set('Title', this.model2.title);
    brooda.set('Text', this.model2.text);
    brooda.save();
    this.model2 = {};
  }

  parseRequest() {
    const News = Parse.Object.extend('News');
    const query = new Parse.Query(News);
    query.limit(255);
    Promise.resolve(query.find({
      success: function(results) {
        console.log(typeof(results));
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
    })).then(data => {
      this.news = [];
      data.forEach(val => {
        this.news.push(val);
        console.log(this.news);
      });
    });
  }

  ngOnInit() {
    this.parseRequest();
    const currentUser = Parse.User.current();
    console.log(currentUser);
    if (currentUser) {
        if (currentUser.get('isAdministrator') === true) {
          this.isAdmin = true;
        }
    } else {
    // show the signup or login page
    }
    }
}
