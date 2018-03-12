import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-trainers-all',
  templateUrl: './trainers-all.component.html',
  styleUrls: ['./trainers-all.component.css']
})
export class TrainersAllComponent implements OnInit {
  locations = {
    'Казахстан': ['Алматы', 'Астана'],
    'Россия': ['Москва', 'Питер'],
  };
  countries: string[];
  selectedCountry: string;
  selectedCity: string;
  trainers: any;

  constructor() {
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';

    this.countries = Object.keys(this.locations);
    this.selectedCountry = 'Казахстан';
  }

  ngOnInit() {
    this.parseRequest();
  }



  trainerFilter(trainer) {
    return trainer.get('isTrainer');
  }

  parseRequest() {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.limit(255);

    if (this.selectedCountry) {
      query.equalTo("country_live", this.selectedCountry);
      if (this.selectedCity) {
        query.equalTo("city_live", this.selectedCity);
      }
    }

    Promise.resolve(query.find()).then(data => {
      console.log(data);
      this.trainers = [];
      this.trainers = data.filter(this.trainerFilter);
      console.log(this.trainers);
    });
  }

  selectCountry() {
    this.selectedCity = '';
    this.parseRequest();
  }
  selectCity(city) {
    this.parseRequest();
  }

}
