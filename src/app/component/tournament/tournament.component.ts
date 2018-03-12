import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
import * as Parse from 'parse';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  btnPrimary: any;
  id: any;
  status: any;
  response: any;
  games: any;
  groups: any;
  rounds: any;
  court: any;
  filteredRounds: any;
  reserveRounds: any;
  organaizer: any;
  currentUser: any;
  canRegister: any;
  
  results: any = [];
  isRecent: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.canRegister = false;
    this.btnPrimary = false;
    // раунды
    this.filteredRounds = [];
    this.rounds = [
      [{'round': '1/128', 'games': [], 'value' : 8}],
      [{'round': '1/64', 'games': [], 'value' : 7}],
      [{'round': '1/32', 'games': [], 'value' : 6}],
      [{'round': '1/16', 'games': [], 'value' : 5}],
      [{'round': '1/8', 'games': [], 'value' : 4}],
      [{'round': '1/4', 'games': [], 'value' : 3}],
      [{'round': '1/2', 'games': [], 'value' : 2}],
      [{'round': '1/1', 'games': [], 'value' : 1}],
    ];

    // setTimeout(() => {
    //   console.log(this.filteredRounds[1][0].games[0].attributes.player1);
    //   this.filteredRounds[1][0].round = 'abl';
    //     }, 15000);
    this.games = [];
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
  }

  register() {
    if (this.canRegister) {
      this.btnPrimary = false;
      console.log('registered');
      const Tournament = Parse.Object.extend('TournamentUser');
      const register = new Tournament();
      register.set('tournamentId', this.response[0]);
      register.set('playerId', this.currentUser);
      register.set('score', 0);
      console.log(this.currentUser, this.response);
      register.save(null, {
        success: function(register) {
          alert('Вы зарегистрированы');
        },
          error: function(register, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }
  }

  parseRating(id) {
    const TournamentUser = Parse.Object.extend('TournamentUser');
    const Tournament = Parse.Object.extend('Tournament');
    let tournament = new Tournament();
    tournament.id = id;
    const query = new Parse.Query(TournamentUser);
    query.equalTo('tournamentId', tournament);
    query.include('playerId');
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + '' + error.message);
      }
    })).then(results => {
      this.results = results;
      console.log('rating:', results);
    });
  }

  parseRequest(id) {
    const GameScore = Parse.Object.extend('Tournament');
    const query = new Parse.Query(GameScore);
    query.equalTo('objectId', id);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + ' ' + error.message);
        }
      })).then((value) => {
        console.log(value);
        // court
        const queryCourt = new Parse.Query(Parse.Object.extend('Court'));
        queryCourt.equalTo('objectId', (value[0].get('court')).id);
        Promise.resolve(queryCourt.find()).then(data => {
          this.court = data;
        });
        // organaizer
        const queryOrg = new Parse.Query(Parse.Object.extend('User'));
        queryOrg.equalTo('objectId', (value[0].get('organizer')).id);
        Promise.resolve(queryOrg.find()).then(data => {
          this.organaizer = data;
        });
        this.response = value;
        this.parseGames(this.id, value[0]);
        value[0].attributes.groups2.forEach(group => {
          const Groups = Parse.Object.extend('Group');
          const queryGroups = new Parse.Query(Groups);
          this.groups = [];
          queryGroups.equalTo('objectId', group.id);
          Promise.resolve(
            queryGroups.find({
              success: function(results) {
            },
            error: function(error) {
              alert('Error: ' + error.code + ' ' + error.message);
            }
            })
          ).then(data => {
            data.forEach(game => {
              this.groups.push([{
                'name': game.attributes.name,
                'id': game.id,
                'rows': []
              }]);
              game.attributes.rows2.forEach(rowid => {
                const Rows = Parse.Object.extend('GroupRow');
                const queryRows = new Parse.Query(Rows);
                queryRows.equalTo('objectId', rowid.id);
                Promise.resolve(
                  queryRows.find({
                    success: function(results) {
                  },
                  error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                  }
                  })
                ).then(data => {
                    // console.log(data);
                    Promise.resolve(
                      this.parseRequestDat('User', 'objectId', data[0].attributes.playerId.id, data[0].attributes.score, game.id));
                });
              });
            });
          });
        });
      });
  }

  parseRequestDat(parseit, fiva, lava, score, game) {
    const GameScore = Parse.Object.extend(parseit);
    const query = new Parse.Query(GameScore);
    query.equalTo(fiva, lava);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + ' ' + error.message);
        }
      })).then((value) => {
        this.groups.forEach(groupPles => {
          if (groupPles[0].id === game) {
            groupPles[0].rows.push({
              'user': value[0].attributes.firstName + ' ' + value[0].attributes.lastName,
              'score': score
            });
          // console.log(this.groups);
          }
        });
      });
  }

  parseGames(id, tournament) {
    const Games = Parse.Object.extend('Game');
    const query = new Parse.Query(Games);
    query.equalTo('tournamentId', tournament);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + ' ' + error.message);
        }
      })).then((value) => {

        Promise.resolve(value.forEach(game => {
            this.rounds.forEach(round => {
              if (round[0].round === game.get('round')) {
                round[0].games.push(game);
                // round[0].queue = game.get('queue');
                // console.log(this.rounds);
              }
            });
        })
      ).then(data => {
        this.rounds.forEach(round => {
          // console.log(round);
          if (round[0].games.length !== 0) {
            // this.rounds.splice(this.rounds.indexOf(round), 1)
            // console.log(this.rounds)
            this.filteredRounds.push(round);
            // console.log(this.filteredRounds);
          }
        });
      }).then(val => {
        Promise.resolve(this.filteredRounds.forEach(round => {
          round[0].games.sort(this.compare);
          console.log(this.filteredRounds);
          })
        ).then(data => {
          this.reserveRounds = this.filteredRounds;
        });
      });
      // .then(data => {
      //   this.filteredRounds.forEach((newRound) => {
      //     newRound[0].games.forEach(newGame => {
      //
      //     })
      //   })
      // })
      });
  }

  compare(a, b) {
    if (a.get('queue') < b.get('queue')) {
      return -1;
    }
    if (a.get('queue') > b.get('queue')) {
      return 1;
    }
    return 0;
  }

   sortRounds(val) {
    if (this.filteredRounds.length < this.reserveRounds.length) {
      this.filteredRounds = this.reserveRounds;
    }
    if (val === 1) {
      this.filteredRounds = [this.filteredRounds[(this.filteredRounds.findIndex(x => x[0].value === val))]];
    } else if (val === 2) {
      this.filteredRounds = [this.filteredRounds[(this.filteredRounds.findIndex(x => x[0].value === val))]];
      this.filteredRounds.push(this.reserveRounds[(this.reserveRounds.findIndex(x => x[0].value === 1))]);
      console.log(this.filteredRounds);
    } else {
      this.filteredRounds = [this.filteredRounds[(this.filteredRounds.findIndex(x => x[0].value === val))]];
      let counter = 0;
      for(let i = val; val <= this.reserveRounds.length ; val++) 
      {
        while (counter != 3)
        {
          this.filteredRounds.push(this.reserveRounds.findIndex(x => x[0].value === i));
          counter++;
        }
      }
    }
  }


  dateTransform(data) {
    const date = String(data);
    const clearData = date.slice(4);
    return clearData.replace(clearData.substring(11), '');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];

    if (this.status === 'current' ) {
      console.log(this.status);
      this.parseRequest(this.id);
    } else if (this.status === 'recent') {
      this.isRecent = true;
      console.log(this.status);
      this.parseRequest(this.id);
      this.parseRating(this.id);
    } else {
      console.log(this.status);
      this.parseUpcom(this.id);
    }

    this.currentUser = Parse.User.current();
    if (this.currentUser) {
      console.log(this.currentUser);
      const query = new Parse.Query(Parse.Object.extend('TournamentUser'));
      query.equalTo('playerId', this.currentUser);
      Promise.resolve(query.find()).then(data => {
        const c = data.filter(x => (x.get('tournamentId')).id === this.id);
        if (c.length !== 0) {
          this.btnPrimary = false;
        } else {
          this.canRegister = true;
          this.btnPrimary = true;
        }
      });
    } else {
    // show the signup or login page
    }
  }

  parseUpcom(id) {
    const GameScore = Parse.Object.extend('Tournament');
    const query = new Parse.Query(GameScore);
    query.equalTo('objectId', id);
    Promise.resolve(query.find({
      success: function(results) {
        return results;
      },
      error: function(error) {
        alert('Error: ' + error.code + ' ' + error.message);
        }
      })).then((value) => {
        // console.log(value);
        // court
        const queryCourt = new Parse.Query(Parse.Object.extend('Court'));
        queryCourt.equalTo('objectId', (value[0].get('court')).id);
        Promise.resolve(queryCourt.find()).then(data => {
          this.court = data;
        });
        // organaizer
        const queryOrg = new Parse.Query(Parse.Object.extend('User'));
        queryOrg.equalTo('objectId', (value[0].get('organizer')).id);
        Promise.resolve(queryOrg.find()).then(data => {
          this.organaizer = data;
        });
        this.response = value;
     });
    return this.response;
 }
}
