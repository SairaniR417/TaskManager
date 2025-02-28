import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-addrecipe',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule],
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.css'
})
export class AddrecipeComponent {
  private recipeService = inject(RecipesService);
  selectedImage!: File;

  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    ingredients: new FormGroup({
      main: new FormControl('', [Validators.required]),
      additional: new FormControl('')
    }),
    instructions: new FormControl('', [Validators.required, Validators.minLength(10)])
  });


  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe: Recipe = this.recipeForm.value as Recipe;
      console.log(newRecipe)
      this.recipeService.addRecipe(newRecipe).subscribe({
        next: (res) => {
          alert('Recipe added successfully!');
          this.recipeForm.reset();
        },
        error: (err) => {
          alert('Error adding recipe: ' + err.message);
        }
      });
    }
  }
}
