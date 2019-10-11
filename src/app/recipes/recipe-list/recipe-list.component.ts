import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/shared/Recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {}
  recipes: Recipe[] = [
    new Recipe('sss', 'gasdfasf asdfasdf', ''),
    new Recipe('sss', 'ggg', '')
  ];

  ngOnInit() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
