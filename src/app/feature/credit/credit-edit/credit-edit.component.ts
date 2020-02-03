import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { Movie } from 'src/app/model/movie.class';
import { Actor } from 'src/app/model/actor.class';
import { MovieService } from 'src/app/service/movie.service';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css']
})
export class CreditEditComponent implements OnInit {
  title: string = 'Credit-Edit';
  submitBtnTitle: string = 'Save';
  credit: Credit = new Credit();
  movies: Movie[] = [];
  actors: Actor[] = [];
  id: number = 0;
  
  constructor(private movieSvc: MovieService,
              private actorSvc: ActorService,
              private creditSvc: CreditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get the credit id from the url
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.creditSvc.get(this.id).subscribe( jr => {
      this.credit = jr.data as Credit;
    });
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
    this.creditSvc.edit(this.credit).subscribe(jr => {
      let errs: string = jr.errors;
      if (errs!=null) {
        console.log("Error editing credit: "+errs);
      }
      this.router.navigateByUrl('/credit/list');
    });
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id === b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id === b.id;
  }

}
