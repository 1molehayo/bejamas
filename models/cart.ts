import ProductImageModel from "./productImage";


interface CartModel {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: ProductImageModel;
}

export default CartModel;