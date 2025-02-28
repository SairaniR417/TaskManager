import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipelist',
  imports: [CommonModule, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent {
  recipes = [
    {
      name: 'Classic Spaghetti Carbonara',
      image: 'assets/images/spaghetti.jpg',
      description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper.',
      time: '20 mins'
    },
    {
      name: 'Fresh Caprese Salad',
      image: 'assets/images/caprese.jpg',
      description: 'Tomatoes, mozzarella, basil, and balsamic glaze for a refreshing appetizer.',
      time: '10 mins'
    },
    {
      name: 'Chocolate Lava Cake',
      image: 'assets/images/lava-cake.jpg',
      description: 'A rich chocolate cake with a gooey molten center.',
      time: '30 mins'
    }
  ];
}
