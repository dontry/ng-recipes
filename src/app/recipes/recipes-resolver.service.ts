import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Recipe } from "../shared/Recipe.model";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({ providedIn: "root" })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
