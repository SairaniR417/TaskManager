export interface Recipe {
    name: string | null;
    category: string | null;
    ingredients: {
      main: string | null;
      additional?: string | null;
    };
    instructions: string | null;
  }
  
  