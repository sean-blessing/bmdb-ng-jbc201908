import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/app/model/movie.class';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  title: string = 'Movie-List';

  constructor(private movieSvc: MovieService) { }

  ngOnInit() {
    // populate movies
    this.movieSvc.list().subscribe(
      jr => {
        this.movies = jr.data as Movie[];
        console.log(this.movies);
      }
    );
  }

}
