import ProductImageModel from "./productImage";

interface DimensionsModel {
  width: number;
  height: number;
}

interface RecommendationsModel {
  alt: string;
  src: string;
  id: string;
}

interface DetailsModel {
  dimensions: DimensionsModel;
  size: number;
  description: string;
  recommendations: RecommendationsModel[];
}

interface ProductModel {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: ProductImageModel;
  bestseller: boolean;
  featured: boolean;
  details: DetailsModel | null;
}

export default ProductModel;
