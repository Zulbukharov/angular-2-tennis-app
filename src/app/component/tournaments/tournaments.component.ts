import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  Parse  = null;
  Users = null;
  // массив для списка чемпионатов
  upcomingTournaments: any;
  recentTournaments: any;
  currentTournaments: any;

  constructor() {
    // инициализая и подключение к Parse
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  dateTransform(data) {
    const date = String(data);
    const clearData = date.slice(4);
    return clearData.replace(clearData.substring(11), '');
  }

  ngOnInit() {
    // this.tournaments = [];
    // запрос по классу Rating
    this.upcomingTournaments = [];
    this.recentTournaments = [];
    this.currentTournaments = [];
    const GameScore = Parse.Object.extend('Tournament');
    const query = new Parse.Query(GameScore);
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
        console.log(value);
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        value.forEach(data => {
            const startDate = new Date(data.attributes.timeStart);
            const endDate = new Date(data.attributes.timeEnd);
            const startTime = startDate.getTime();
            const endTime = endDate.getTime();
            const a = Math.sign(currentTime - startTime);
            if (a === 1) {
              console.log('1, 3');
              const bar = Math.sign(endTime - currentTime);
              if (bar === 1) {
                this.currentTournaments.push(data);
              } else if (bar === (-1)) {
                if (bar === (-1)) {
                  this.recentTournaments.push(data);
                }
              }
            } else if (a === (-1)) {
              console.log('2');
              this.upcomingTournaments.push(data);
            }
        });
      });
  }
}
