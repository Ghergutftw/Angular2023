import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService : DataStorageService,private recipeService : RecipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipes()

    if(recipes.length === 0){
      this.dataStorageService.onFetchData().subscribe()
    }else {
      return of(recipes);
    }

  }
}
