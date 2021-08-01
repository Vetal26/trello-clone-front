import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnInit {

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: Params) => {
      console.log(params)
    })
  }
}
