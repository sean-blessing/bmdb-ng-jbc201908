import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  title: string = "Actor List";
  actors: Actor[] = [];

  constructor(private actorSvc: ActorService) { 
  }

  ngOnInit() {
    console.log("calling all actors!");
    this.actorSvc.list().subscribe(jr => {
      console.log("jr:", jr);
      this.actors = jr.data as Actor[];
      console.log("actors: ", this.actors);
    });

  }

}