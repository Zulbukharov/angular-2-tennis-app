import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any;
  constructor() {
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  ngOnInit() {
    this.news = [];
    this.parseRequest();
  }

  parseRequest() {
    const News = Parse.Object.extend('News');
    const query = new Parse.Query(News);
    query.limit(255);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
    })).then(data => {
      this.news = [];
      data.forEach(val => {
        this.news.push(val);
        console.log(this.news)
      });
    });
  }
}
