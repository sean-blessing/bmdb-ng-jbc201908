import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.class';
import { Actor } from 'src/app/model/actor.class';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css']
})
export class CreditCreateComponent implements OnInit {
  title: string = 'Credit-Create';
  submitBtnTitle: string = 'Create';
  credit: Credit = new Credit();
  movies: Movie[] = [];
  actors: Actor[] = [];
  constructor(private movieSvc: MovieService,
              private actorSvc: ActorService,
              private creditSvc: CreditService,
              private router: Router) { }

  ngOnInit() {
    // populate list of movies and list of actors
    // populate movies
    this.movieSvc.list().subscribe(
      jr => {
        this.movies = jr.data as Movie[];
        console.log(this.movies);
      }
    );
    console.log("calling all actors!");
    this.actorSvc.list().subscribe(jr => {
      console.log("jr:", jr);
      this.actors = jr.data as Actor[];
      console.log("actors: ", this.actors);
    });

  }

  save() {
    this.creditSvc.create(this.credit).subscribe(jr => {
      let errs: string = jr.errors;
      if (errs!=null) {
        console.log("Error creating credit: "+errs);
      }
      this.router.navigateByUrl('/credit/list');
    });
  }
}
