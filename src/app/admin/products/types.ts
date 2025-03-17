export interface CloudinaryImage {
  url: string;
  public_id: string;
}

export interface ProblemToCure {
  title: string;
  description: string;
  images: Array<string | CloudinaryImage | File>;
}

export interface Ingredient {
  title: string;
  description: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: string | number;
  category: string[];
  brand: string;
  stock: string | number;
  images: Array<string | CloudinaryImage | File>;
  tags: string[];
  care_for: string[];
  who_should_use: string[];
  dosage: string[];
  problem_to_cure: ProblemToCure[];
  ingredients: Ingredient[];
  slug?: string;
} 