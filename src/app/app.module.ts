import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './component/tournaments/tournaments.component';
import { TournamentComponent } from './component/tournament/tournament.component';
import { RatingComponent } from './component/rating/rating.component';
import { UserComponent } from './component/user/user.component';
import { AdminComponent } from './component/admin/admin.component';
import { NewsComponent } from './component/news/news.component';
import { NewsPageComponent } from './component/news-page/news-page.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TrainersAllComponent } from './component/trainers-all/trainers-all.component';
import { TrainerComponent } from './component/trainer/trainer.component';
import { HomeComponent } from './component/home/home.component';
import { FeaturedNewsComponent } from './component/featured-news/featured-news.component';
import { UserTrainingsComponent } from './component/user-trainings/user-trainings.component';
import { MyGamesComponent } from './component/my-games/my-games.component';
import { CourtsComponent } from './component/courts/courts.component';
import { CourtComponent } from './component/court/court.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'tournaments', component: TournamentsComponent },
  {path: 'tournament/:status/:id', component: TournamentComponent },
  {path: 'rating', component: RatingComponent },
  {path: 'user/:id', component: UserComponent },
  {path: 'user/:id/games', component: MyGamesComponent },
  {path: 'user/:id/trainings', component: UserTrainingsComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'news', component: NewsComponent },
  {path: 'news/:id', component: NewsPageComponent },
  {path: 'signup', component: SignUpComponent },
  {path: 'login', component: LogInComponent },
  {path: 'edit', component: EditUserComponent },
  {path: 'trainers', component: TrainersAllComponent },
  {path: 'trainers/:id', component: TrainerComponent },
  {path: 'courts', component: CourtsComponent },
  {path: 'courts/:id', component: CourtComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    TournamentComponent,
    RatingComponent,
    UserComponent,
    AdminComponent,
    NewsComponent,
    NewsPageComponent,
    SignUpComponent,
    LogInComponent,
    EditUserComponent,
    NavbarComponent,
    TrainersAllComponent,
    TrainerComponent,
    HomeComponent,
    FeaturedNewsComponent,
    UserTrainingsComponent,
    MyGamesComponent,
    CourtsComponent,
    CourtComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
