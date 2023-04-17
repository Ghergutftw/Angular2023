import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {PostModel} from "./models/post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<HttpErrorResponse>()

  constructor(private http: HttpClient) {
  }

  createAnDStorePost(postData: PostModel) {
    this.http.post<{ name: string }>
    ("https://angular2023-4ce89-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      , postData
      , {
        observe: 'response'
      })
      .subscribe(response => {
        console.log(response)
      }, error => {
        this.error.next(error.message)
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('bianca', 'frumoasa')
    return this.http
      .get<PostModel>("https://angular2023-4ce89-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Hello'
          }),
          params: searchParams,
          responseType : 'json'
        }
      )
      .pipe(map((responseData) => {
          const postsArray: PostModel[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key})
            }
          }
          return postsArray
        }),
        catchError(err => {
          throw (err)
        })
      );
  }

  deletePosts() {
    return this.http.delete('https://angular2023-4ce89-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType : 'text'
      }).pipe(tap(x => {
      console.log(x);
      if(x.type === HttpEventType.Sent){
        console.log(x.type)
      }
      if(x.type === HttpEventType.Response){
        console.log(x.body)
      }
    }))
  }
}
