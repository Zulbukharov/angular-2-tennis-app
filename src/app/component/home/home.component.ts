import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	games: any;
  users: any;
  currentTournaments: any;

	constructor() { }

	ngOnInit() {
		this.parseGames();
    this.parseUsers();
    this.parseCurrentTournaments();
    this.currentTournaments = [];
	}

	parseGames() {
    const Game = Parse.Object.extend('Game');
    const query = new Parse.Query(Game);
    query.include("player1");
    query.include("player2");
    query.limit(8);

    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
      }
    })).then(data => {
      this.games = [];
      data.forEach(val => {
        this.games.push(val);
      });
      console.log('Games: ', this.games);
    });
  }

  parseCurrentTournaments() {
    const Tournament = Parse.Object.extend('Tournament');
    const query = new Parse.Query(Tournament);
    query.limit(20);
    Promise.resolve(query.find({
      success: function(results) {
        console.log(typeof(results));
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
      })).then((value) => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        value.forEach(data => {
            const startDate = new Date(data.attributes.timeStart);
            const endDate = new Date(data.attributes.timeEnd);
            const startTime = startDate.getTime();
            const endTime = endDate.getTime();
            const a = Math.sign(currentTime - startTime);
            if (a === 1) {
              const bar = Math.sign(endTime - currentTime);
              if (bar === 1) {
                this.currentTournaments.push(data);
              }
            }
        });
      });
  }

  parseUsers() {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.limit(10);
    Promise.resolve(query.find({
      success: function(results) {
        console.log(typeof(results));
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
        }
      })).then(result => {
        this.users = [];
        result.forEach(user => {
            if (user.attributes.profile_avatar) {
              this.users.push({
                'img' : user.attributes.profile_avatar._url,
                'id' : user.id,
                'user': user.get('firstName') + ' ' + user.get('lastName'),
              });
            } else {
              this.users.push({
                'id' : user.id,
                'user': user.get('firstName') + ' ' + user.get('lastName'),
              });
            }
        });
      });
  }

  dateTransform(data) {
    const date = String(data);
    const clearData = date.slice(4);
    return clearData.replace(clearData.substring(11), '');
  }

}
