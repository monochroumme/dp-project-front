import type { TClient } from "@/modules/shared/types/client";
import type { TOwner } from "@/modules/shared/types/owner";
import type { TWaiter } from "@/modules/shared/types/waiter";

export type TAuthState = {
  user: TClient | TOwner | TWaiter | null;
  initialUserFetch: boolean;
};
