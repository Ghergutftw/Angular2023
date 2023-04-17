import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  serverId: number = 0;

  constructor(private serversService: ServersService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(value =>{
      this.server = value['server']
    })
    // this.serverId = +this.activatedRoute.params['id'];
    // this.server = this.serversService.getServer(this.serverId)
    // this.activatedRoute.params.subscribe(value => {
    //   this.server = this.serversService.getServer(+value['id']);
    // })

  }

  onEdit() {
    // sau ['/server' , this.serverId, 'edit']
    this.router.navigate(['edit'],{relativeTo: this.activatedRoute , queryParamsHandling:'preserve'})
  }
}
