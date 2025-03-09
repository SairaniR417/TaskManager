import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-recipedetails',
  imports: [CommonModule,NgIf],
  templateUrl: './recipedetails.component.html',
  styleUrl: './recipedetails.component.css'
})
export class RecipedetailsComponent {
  recipe: Recipe | undefined;

  // Sample data (Replace this with API data later)
  recipes: Recipe[] = [
    {
      _id: '1',
      name: 'Spaghetti Carbonara',
      category: 'Pasta',
      ingredients: {
        main: 'Spaghetti, Eggs, Parmesan Cheese, Pancetta, Black Pepper',
        additional: 'Salt, Garlic'
      },
      instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine everything and serve.',
      image: 'https://source.unsplash.com/400x300/?pasta,food'
    },
    {
      _id: '2',
      name: 'Chicken Biryani',
      category: 'Rice Dish',
      ingredients: {
        main: 'Basmati Rice, Chicken, Onion, Yogurt, Spices',
        additional: 'Mint, Coriander, Lemon'
      },
      instructions: 'Cook rice. Marinate chicken. Layer and cook with spices.',
      image: 'https://source.unsplash.com/400x300/?biryani,food'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.recipe = this.recipes.find(r => r._id === recipeId) || undefined;
  }
}
