import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostModel} from "./models/post.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  createAnDStorePost(postData: PostModel) {
    this.http.post<{ name: string }>
    ("https://angular2023-4ce89-default-rtdb.europe-west1.firebasedatabase.app/posts.json", postData)
      .subscribe(response => {
        console.log(response)
      });
  }

  fetchPosts() {
    return this.http.get<PostModel>("https://angular2023-4ce89-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
      .pipe(map((responseData) => {
        const postsArray: PostModel[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray
      }))
  }
}
