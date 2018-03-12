import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  users: any;
  rating: any;
  randomInt: any;
  constructor() {
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
   }

   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.limit(255);
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
                'img' : 'http://placehold.it/300x300',
                'id' : user.id,
                'user': user.get('firstName') + ' ' + user.get('lastName'),
              });
            }
        });
      }).then(data => {
          this.randomInt = this.getRandomInt(0, (this.users.length - 1));
          console.log(this.randomInt);
          const Rating = Parse.Object.extend('Rating');
          const queryRating = new Parse.Query(Rating);
          queryRating.limit(1000);
          Promise.resolve(queryRating.find({
            success: function(results) {
              // console.log(typeof(results));
              return results;
            },
            error: function(error) {
              alert('Error: ' + error.code + '' + error.message);
              }
            })).then(val => {
              // console.log(val);

              function findRating(id) {
                const res = val.filter(x => (x.get('user')).id === id);
                // console.log(res);
                return res[0];
              }

              function compare(a, b) {
                if (a.position < b.position) {
                  return -1;
                }
                if (a.position > b.position) {
                  return 1;
                }
                return 0;
              }
              this.users.forEach(us => {
                const response = findRating(us.id);
                // console.log(response);
                if (response) {
                for (const key in response.attributes) {
                  if (response.attributes.hasOwnProperty(key)) {
                    if (key === 'createdAt') {
                      continue;
                    } else if (key === 'organizer') {
                      continue;
                    } else if (key === 'user') {
                      continue;
                    } else if (key === 'updatedAt') {
                      continue;
                    } else {
                      us[key] = response.attributes[key];
                      // console.log(us);
                      // console.log(this.users);
                    }
                  }
                }
              } else {
                // console.log('empty response');
              }
                // us.position = response.get('position');
                // us.points = response.get('points');
                // us.kid = response.get('kid');
                // us.posMix = response.get('posMix');
                // us.posDuo = response.get('posDuo');
                // us.posKid = response.get('posKid');
                // us.mix = response.get('mix');
                // us.duo = response.get('duo');
                // us.solo = response.get('solo');
              });
              this.users.sort(compare);
            });
      });
  }



}
