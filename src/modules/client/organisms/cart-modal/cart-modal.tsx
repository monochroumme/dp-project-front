import { Button, Empty, InputNumber, Modal, Typography } from "antd";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { useCoffees } from "@/modules/shared/hooks/use-coffees";
import { useAppDispatch } from "@/store";
import { addToCart, removeFromCart } from "@/store/cart";
import { useOrderItems } from "@/modules/client/hooks/use-order-items";
import { useOrderedItems } from "@/modules/client/hooks/use-ordered-items";

import type { TCartItem } from "@/modules/shared/types/cart";
import type { TCoffee } from "@/modules/shared/types/coffee";
import type { TState } from "@/store/types";

import "./cart-modal.scss";

type CartModalProps = {
  open?: boolean;
  onClose?: () => void;
};

// TODO show the cart with text ~"Your order delivered" once the isOrderServed = true
const CartModal = (props: CartModalProps) => {
  const { open, onClose } = props;

  const dispatch = useAppDispatch();
  const { coffees } = useCoffees();
  const { items, isOrderPlaced } = useSelector((state: TState) => state.cart);

  const cartItemMap = useMemo(
    () =>
      coffees?.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {} as Record<string, TCoffee>,
      ) || {},
    [coffees],
  );

  const onChangeQuantity = (item: TCartItem) => (value: number | null) => {
    if (value === null) return;

    if (value > item.quantity) {
      dispatch(
        addToCart({
          id: item.id,
          quantity: value - item.quantity,
        }),
      );
    } else if (value < item.quantity) {
      dispatch(
        removeFromCart({
          id: item.id,
          quantity: item.quantity - value,
        }),
      );
    }
  };

  const { setItemsDb, localItemsMatchDb } = useOrderedItems();

  const onOrderSuccess = useCallback(() => {
    setItemsDb(items);
    onClose?.();
  }, [onClose]);

  const { onOrder, isOrdering } = useOrderItems(onOrderSuccess);

  const canOrder =
    items.length > 0 &&
    (!isOrderPlaced || (isOrderPlaced && !localItemsMatchDb));

  return (
    <Modal
      centered
      closable={!isOrdering}
      maskClosable={!isOrdering}
      onCancel={onClose}
      open={open}
      title="Cart"
      width={300}
      footer={
        <Button
          block
          disabled={!canOrder || isOrdering}
          loading={isOrdering}
          onClick={onOrder}
          type="primary"
        >
          Order
        </Button>
      }
    >
      {items.length ? (
        <div className="cart-modal-items">
          {items.map((item) => (
            <div key={item.id} className="cart-modal-item">
              <div className="cart-modal-item__img-wrapper">
                <img
                  alt={cartItemMap[item.id]?.name}
                  className="cart-modal-item__img"
                  src={cartItemMap[item.id]?.imageUrl}
                />
              </div>
              <Typography.Text className="cart-modal-item__title">
                {cartItemMap[item.id]?.name}
              </Typography.Text>
              <InputNumber
                className="cart-modal-item__quantity"
                disabled={isOrdering}
                min={0}
                onChange={onChangeQuantity(item)}
                value={item.quantity}
              />
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </Modal>
  );
};

export { CartModal };
