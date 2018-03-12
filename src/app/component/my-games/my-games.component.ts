import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {
	currentUser: any;
	games: any;

  constructor() {
  }

  ngOnInit() {
  	this.currentUser = Parse.User.current();
  	this.parseGames();
  }

  parseGames() {
    const Game = Parse.Object.extend('Game');
    const query = new Parse.Query(Game);
    query.equalTo("player1", this.currentUser);
    query.equalTo("player2", this.currentUser);

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

}
