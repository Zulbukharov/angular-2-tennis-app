import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  news: any;
  id: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
    this.news = [];
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.parseRequest(this.id);
  }

  parseRequest(id) {
    const News = Parse.Object.extend('News');
    const query = new Parse.Query(News);
    query.equalTo('objectId', id);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
    })).then(data => {
      this.news = data;
      console.log(this.news);
    });
  }

}
