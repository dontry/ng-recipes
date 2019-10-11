import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/Recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() {}

  ngOnInit() {}

  onRecipeSelected(event: Event) {
    console.log('event:', event);
    this.selectedRecipe = event;
  }
}
