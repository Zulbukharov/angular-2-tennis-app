import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Parse from 'parse';

@Component({
	selector: 'app-court',
	templateUrl: './court.component.html',
	styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
	court: any;
	id: any;
	photos: any;
	courtWood = [];
	courtHard = [];
	courtGrunt = [];

	constructor(
		private router: Router,
    	private route: ActivatedRoute
    ) {

    }

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.parseCourt();
	}

	parseCourt() {
		const Court = Parse.Object.extend('Court');
		const CourtItem = Parse.Object.extend('CourtItem');
	    const CourtPhoto = Parse.Object.extend('CourtPhoto');
		const court = new Court();

		const query = new Parse.Query(Court);
		query.equalTo('objectId', this.id);

		Promise.resolve(query.first()).then(court => {
			//console.log(court);
			this.court = court;

			const queryCourts = new Parse.Query(CourtItem);
	    	queryCourts.equalTo('court', court);

			Promise.resolve(queryCourts.find()).then(data => {
				//console.log('data:', data);
				data.forEach(courtItem => {
					if (courtItem.get('type') === 'wood') {
						this.courtWood.push(courtItem);
					} else if (courtItem.get('type') === 'hard') {
						this.courtHard.push(courtItem);
					} else if (courtItem.get('type') === 'grunt') {
						this.courtGrunt.push(courtItem);
					}
				});
			});

			const photoQuery = new Parse.Query(CourtPhoto);
			photoQuery.equalTo('court',  court);
			Promise.resolve(photoQuery.find()).then(data => {
				//console.log('data:', data);
				this.photos = data;
			});
		});
  	}

}
