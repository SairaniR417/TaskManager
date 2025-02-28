export interface Recipe {
   _id: string | null;
    name: string | null;
    category: string | null;
    ingredients: {
      main: string | null;
      additional?: string | null;
    };
    instructions: string | null;
    image: string|null;
  }
  