import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: {
    main: { type: [String], required: true },
    additional: { type: [String] }
  },
  instructions: { type: String, required: true },
  image: { type: String}
})


const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
