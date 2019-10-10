import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/header/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('sss', 'gasdfasf asdfasdf'),
    new Recipe('sss', 'ggg')
  ];

  constructor() {}

  ngOnInit() {}
}
