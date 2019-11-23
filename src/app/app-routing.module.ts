import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  // {
  //   path: "recipes",
  //   loadChildren: "recipes/recipes.module.ts#RecipesModule"
  // }
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then(m => m.RecipesModule)
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        m => m.ShoppingListModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
