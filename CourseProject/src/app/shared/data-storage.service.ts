import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl: string = 'https://courseproject-f44cd-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(this.baseUrl, recipes).subscribe(value => {
      console.log(value)
    })
  }

  onFetchData() {
    return this.http.get<Recipe[]>(this.baseUrl)
      .pipe(map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        }))
  }
}
