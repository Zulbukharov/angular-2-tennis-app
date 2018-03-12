import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
	  selector: 'app-featured-news',
	  templateUrl: './featured-news.component.html',
	  styleUrls: ['./featured-news.component.css']
})
export class FeaturedNewsComponent implements OnInit {
	//news
	news: any;
  featuredNews: any;
	constructor() { }

	ngOnInit() {
		this.fetchNews();
	}

	fetchNews() {
    const News = Parse.Object.extend('News');
    const query = new Parse.Query(News);
    query.limit(3);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
    })).then(data => {
      this.news = [];
      this.featuredNews = data[0];
      let news = data.slice(1, data.length);
      news.forEach(val => {
        this.news.push(val);
      });
      console.log(this.news);
    });
  }

}
