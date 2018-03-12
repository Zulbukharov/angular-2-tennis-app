import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
	selector: 'app-user-trainings',
	templateUrl: './user-trainings.component.html',
	styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
	currentUser: any;
	isTrainer: boolean = false;
	games: any;

	constructor() {
		const parse = require('parse');
	    parse.initialize('1');
	    parse.serverURL = 'http://icyflame.net:1337/parse';
	}

	ngOnInit() {
		this.currentUser = Parse.User.current();
		if (this.currentUser.get('isTrainer')) {
			this.parseTrainerGames();
			this.isTrainer = true;
		} else {
			this.parseMyGames();
		}
	}

	parseMyGames() {
	    const Training = Parse.Object.extend('Training');
	    const query = new Parse.Query(Training);
	    query.equalTo('playerId', this.currentUser);
	    query.include('trainerId');
	    Promise.resolve(query.find({
			success: function(results) {
				return results;
			},
			error: function(error) {
				alert('Error: ' + error.code + '' + error.message);
			}
	    })).then(results => {
	    	this.games = [];
	    	results.forEach(val => {
				this.games.push(val);
			});
	    });
	}

	parseTrainerGames() {
		const Training = Parse.Object.extend('Training');
	    const query = new Parse.Query(Training);
	    query.equalTo('trainerId', this.currentUser);
	    query.include('playerId');
	    Promise.resolve(query.find({
			success: function(results) {
				return results;
			},
			error: function(error) {
				alert('Error: ' + error.code + '' + error.message);
			}
	    })).then(results => {
	    	this.games = [];
	    	results.forEach(val => {
				this.games.push(val);
			});
	    });
	}

	confirmTraining(id) {
		const Training = Parse.Object.extend('Training');
    	const training = new Training();
    	training.id = id;

	    training.set('isConfirmed', true);
	    training.save(null, {
	      success: (news) => {
	        alert('Вы успешно подтвердили тренировку!');
	      },
	      error: function(news, error) {
	        console.log(error);
	      }
	    }).then(data => {
	      this.parseTrainerGames();
	    });
	}

	cancelTrainingT(id) {
		const Training = Parse.Object.extend('Training');
    	const training = new Training();
    	training.id = id;

	    training.set('isCanceledT', true);
	    training.save(null, {
	      success: (news) => {
	        alert('Вы успешно отклонили тренировку!');
	      },
	      error: function(news, error) {
	        console.log(error);
	      }
	    }).then(data => {
	      this.parseTrainerGames();
	    });
	}
}
