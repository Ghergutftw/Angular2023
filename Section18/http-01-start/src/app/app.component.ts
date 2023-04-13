import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {PostModel} from "./models/post.model";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching: boolean = false



  constructor(private http: HttpClient , private service : PostsService) {
  }

  ngOnInit() {
    this.isFetching = true
    this.onFetchPosts()
  }

  onCreatePost(postData: PostModel) {
    this.service.createAnDStorePost(postData)
  }

  onFetchPosts() {
    // Send Http request
    this.service.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts
    })
    this.isFetching = false
  }

  onClearPosts() {
    // Send Http request
  }

}
