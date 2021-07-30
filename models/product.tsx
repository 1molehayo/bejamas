interface ImageModel {
  src: string;
  alt: string;
}

interface DimensionsModel {
  width: number;
  height: number;
}

interface DetailsModel {
  dimensions: DimensionsModel;
  size: number;
  description: string;
  recommendations: ImageModel[];
}

interface ProductModel {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: ImageModel;
  bestseller: boolean;
  featured: boolean;
  details: DetailsModel | null;
}

export default ProductModel;
