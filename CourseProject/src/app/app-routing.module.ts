import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipesEditComponent} from "./recipes/recipes-edit/recipes-edit.component";

const routes: Routes = [
  {path : '' , redirectTo : '/recipes' , pathMatch: 'full'},
  {path : 'recipes' , component : RecipesComponent , children :[
      {path : '' , component: RecipeStartComponent},
      {path : 'new' , component: RecipesEditComponent},
      {path : ':id' , component: RecipeDetailComponent},
      {path : ':id/edit' , component: RecipesEditComponent},
    ]},
  {path : 'shopping-list' , component : ShoppingListComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {
}