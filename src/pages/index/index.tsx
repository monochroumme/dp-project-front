import { useMemo, useState } from "react";
import { Button } from "antd";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { PageCardLayout } from "@/layouts/page-card-layout";
import { useCoffees } from "@/modules/shared/hooks/use-coffees";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cart";
import { EUserType } from "@/modules/shared/types/user-type";
import { CartModal } from "@/modules/client/organisms/cart-modal";

import type { TState } from "@/store/types";
import type { TCoffee } from "@/modules/shared/types/coffee";

import "./index.scss";

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const { coffees, isLoadingCoffees } = useCoffees();
  const { items } = useSelector((state: TState) => state.cart);

  const onAddToCart = (item: TCoffee) => () => {
    dispatch(
      addToCart({
        id: item.id,
        quantity: 1,
      }),
    );
  };

  const checkIsAlreadyInCart = (item: TCoffee) =>
    !!items.find((cartItem) => cartItem.id === item.id);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartItemsCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  return (
    <>
      <CartModal onClose={closeCart} open={isCartOpen} />

      <PageCardLayout
        className="index-page"
        contentClassName="index-page__content"
        userType={EUserType.CLIENT}
        headerRightContent={
          <div className="index-page__cart-btn-wrapper">
            {cartItemsCount ? (
              <div className="index-page__cart-btn-count">{cartItemsCount}</div>
            ) : null}
            <Button
              icon={<ShoppingCartOutlined style={{ fontSize: 16 }} />}
              onClick={openCart}
              type="primary"
            />
          </div>
        }
      >
        {isLoadingCoffees ? <LoadingOutlined /> : null}
        {!isLoadingCoffees
          ? coffees?.map((item) => {
              const isAlreadyInCart = checkIsAlreadyInCart(item);

              return (
                <div key={item.id} className="index-page__coffee-card">
                  <div className="index-page__coffee-card-img-wrapper">
                    <img
                      alt={item.name}
                      className="index-page__coffee-card-img"
                      src={item.imageUrl}
                    />
                  </div>
                  <div className="index-page__coffee-card-bottom">
                    <div className="index-page__coffee-card-bottom-row">
                      <div className="index-page__coffee-card-title">
                        {item.name}
                      </div>
                      <div className="index-page__coffee-card-price">
                        ${item.price}
                      </div>
                    </div>
                    <Button
                      block
                      disabled={isAlreadyInCart}
                      onClick={onAddToCart(item)}
                      type="primary"
                    >
                      {isAlreadyInCart ? "Already in cart" : "Add to cart"}
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </PageCardLayout>
    </>
  );
};

export { IndexPage };
