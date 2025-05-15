export type TOrderItem = {
  id: string;
  name: string;
  quantity: number;
};

export type TOrder = {
  clientName: string;
  served: boolean;
  items: TOrderItem[];
};
