import { Injectable } from "@angular/core";
import { Recipe } from "../shared/Recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      "Schnitzel",
      "Very juicy and tasty",
      "https://natashaskitchen.com/wp-content/uploads/2016/02/Pork-Schnitzel-Recipe-7-600x900.jpg",
      [
        new Ingredient("French Fries", 20),
        new Ingredient("Tomatoes", 4),
        new Ingredient("Veal", 1)
      ]
    ),
    new Recipe(
      "Smash Burger Alfresco",
      "We found that a three-ounce patty hits the sweet spot",
      "https://assets.bonappetit.com/photos/5d1cb1880813410008e914fc/16:9/w_1280,c_limit/Print-Summer-Smash-Burger.jpg",
      [
        new Ingredient("French Fries", 20),
        new Ingredient("Chicken Breast", 1),
        new Ingredient("Ketchup", 1)
      ]
    )
  ];
  // recipes: Recipe[] = [];

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
}
