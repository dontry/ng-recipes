import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../shared/Recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('sss', 'gasdfasf asdfasdf', '', [
      new Ingredient('French Fries', 20),
      new Ingredient('Tomatoes', 4),
      new Ingredient('Potatoes', 20)
    ]),
    new Recipe('sss', 'ggg', '', [
      new Ingredient('French Fries', 20),
      new Ingredient('Chicken Breast', 1)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
