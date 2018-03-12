import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  id: any;
  trainer: any;
  currentUser: any;
  registrateToTrainer: any;
  current_user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.registrateToTrainer = false;
    this.current_user = false;
    const parse = require('parse');
    parse.initialize('1');
    parse.serverURL = 'http://icyflame.net:1337/parse';
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.parseRequest();
    this.currentUser = Parse.User.current();
    if (this.currentUser) {
      if (this.currentUser.id) {
        this.current_user = true;
      }
    } else {
    }
  }

  registrate() {
    return this.registrateToTrainer = true;
  }

  calculateAge(birthday) { // birthday is a date
    const bd = new Date(birthday);
    const ageDifMs = Date.now() - bd.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  parseRequest() {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.equalTo('objectId', this.id);
    Promise.resolve(query.find()).then(data => {
      console.log(data);
      if (data[0].get('isTrainer')) {
        this.trainer = data;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  onSubmit({ value, valid }) {
    console.log(value, valid);
    const Training = Parse.Object.extend('Training');
    const training = new Training();

    const User = Parse.Object.extend('User');
    var trainer = User.createWithoutData(value.trainerId);
    var player = User.createWithoutData(value.playerId);

    training.set('TrainingDate', `${value.date} ${value.time}`);
    training.set('trainerId', trainer);
    training.set('playerId', player);
    training.set('isConfirmed', false);
    training.set('requestText', value.requestText);
    training.save(null, {
      success: (news) => {
        alert('Вы успешно записались!');
        this.registrateToTrainer = false;
      },
      error: function(news, error) {
        console.log(error);
      }
    }).then(data => {
      this.parseRequest();
    });
  }

}
