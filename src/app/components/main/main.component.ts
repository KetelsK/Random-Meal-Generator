import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/Meal';
import { RandomMealService } from 'src/app/services/random-meal.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  meal: Meal;
  isLoading: boolean = true;
  safeUrl: SafeResourceUrl;

  constructor(
    private mealService: RandomMealService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.meal = new Meal();
  }

  getRandomMeal() {
    this.mealService.getRandomMeal().subscribe((meal) => {
      this.createMeal(meal.meals[0]);
    });
  }

  GetMealByCategory(category: string) {
    this.mealService.getMealByCategory(category).subscribe((meal) => {
      let randomNumber = Math.floor(Math.random() * meal.meals.length);
      console.log(randomNumber);
      console.log(meal.meals[randomNumber]);
      this.mealService
        .getMealDetails(meal.meals[randomNumber].idMeal)
        .subscribe((mealDetails) => {
          this.createMeal(mealDetails.meals[0]);
        });
    });
  }

  createMeal(meal: any) {
    this.meal.idMeal = meal.idMeal;
    this.meal.imgSrc = meal.strMealThumb;
    this.meal.recipe = meal.strInstructions;
    this.meal.title = meal.strMeal;
    this.meal.video = `https://www.youtube.com/embed/${meal.strYoutube.slice(
      -11
    )}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.meal.video
    );
    this.meal.category = meal.strCategory;
    this.meal.area = meal.strArea;
    if (meal.strTags) {
      let tags = meal.strTags.split(',').join(', ');
      this.meal.tags = tags;
    }

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      }
    }
    this.meal.ingredients = ingredients;
    this.isLoading = false;
  }
}
