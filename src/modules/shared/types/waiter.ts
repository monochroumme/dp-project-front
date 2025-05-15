export type TWaiter = {
  id: string;
  username: string;
  orderCount?: number;
};

export type TWaiterCreatePayload = {
  username: string;
  password: string;
};
