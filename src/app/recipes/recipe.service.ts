import { Injectable } from '@angular/core';
import { Recipe } from '../shared/Recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe('sss', 'gasdfasf asdfasdf', '', [
  //     new Ingredient('French Fries', 20),
  //     new Ingredient('Tomatoes', 4),
  //     new Ingredient('Potatoes', 20)
  //   ]),
  //   new Recipe('sss', 'ggg', '', [
  //     new Ingredient('French Fries', 20),
  //     new Ingredient('Chicken Breast', 1)
  //   ])
  // ];
  recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  storeRecipes() {
    this.http
      .put(
        'https://ng-complete-guide-d54c0.firebaseio.com/recipes.json',
        this.recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-complete-guide-d54c0.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => ({ ingredients: [], ...recipe }));
        }),
        tap(recipes => {
          this.setRecipes(recipes);
        })
      );
  }
}
