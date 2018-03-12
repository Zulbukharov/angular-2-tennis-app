import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
	selector: 'app-courts',
	templateUrl: './courts.component.html',
	styleUrls: ['./courts.component.css']
})
export class CourtsComponent implements OnInit {
	locations = {
		'Казахстан': ['Алматы', 'Астана'],
		'Россия': ['Москва', 'Питер'],
	};
	countries: string[];
	selectedCountry: string;
	selectedCity: string;
	courts = [];

	constructor() {
		const parse = require('parse');
		parse.initialize('1');
		parse.serverURL = 'http://icyflame.net:1337/parse';

		this.countries = Object.keys(this.locations);
    	this.selectedCountry = 'Казахстан';
	}

	ngOnInit() {
		this.parseCourts();
	}

	parseCourts() {
		const Court = Parse.Object.extend('Court');
		const CourtPhoto = Parse.Object.extend('CourtPhoto');
	    const query = new Parse.Query(Court);
	    query.limit(255);

	    if (this.selectedCountry) {
			query.equalTo("country", this.selectedCountry);
			if (this.selectedCity) {
				query.equalTo("city", this.selectedCity);
			}
		}

	    Promise.resolve(query.find()).then(data => {
			this.courts = data;
			//console.log(this.courts);

			data.forEach(court => {
				const photoQuery = new Parse.Query(CourtPhoto);
				photoQuery.equalTo('court',  court);
				Promise.resolve(photoQuery.find()).then(data => {
					//console.log('data:', court);
				});
			});
	    });
	}

	selectCountry() {
		this.selectedCity = '';
		this.parseCourts();
	}

	selectCity(city) {
		this.parseCourts();
	}

}
