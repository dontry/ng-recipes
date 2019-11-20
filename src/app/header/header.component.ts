import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
  // styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  private isAuthenticated = false;
  @Output() featureSelected = new EventEmitter<string>();
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSignout() {
    this.authService.signout();
  }
}
