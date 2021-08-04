import Image from "next/image";
import { useAppContext } from "../contexts/appContext";
import CartModel from "../models/cart";
import { formatPrice, getOptimizedImage } from "../utility";
import { Button } from "./button";

interface IProps {
  onClose?: () => void;
}

export const Context = ({ onClose }: IProps) => {
  const { cart, clearCart } = useAppContext();

  return (
    <div className="context">
      <div className="text-right">
        <button className="context__close" onClick={onClose}>
          <span className="icon-close" />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="context__empty">{`< Cart is empty >`}</p>
      ) : (
        <div className="context__list">
          {cart.map((cartItem, i) => (
            <div key={i}>
              <div className="context__item">
                <div className="context__details">
                  <p className="font-bold color-black">{cartItem.name}</p>
                  <p>{formatPrice(cartItem.currency, cartItem.price)}</p>
                </div>

                <div className="context__image">
                  <Image
                    src={getOptimizedImage(cartItem.image.src, {
                      fit: "crop",
                      h: 300,
                      w: 210,
                    })}
                    alt={cartItem.image.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <hr className="divider" />
            </div>
          ))}
        </div>
      )}

      <Button
        text="clear"
        className="w-100"
        type="outline"
        onClick={clearCart}
      />
    </div>
  );
};
