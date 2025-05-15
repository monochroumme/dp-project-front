import { useQuery } from "@tanstack/react-query";

import { sharedApi } from "@/modules/shared/api";

import type { TCoffee } from "@/modules/shared/types/coffee";

const useCoffees = () => {
  const { data: coffees, isPending: isLoadingCoffees } = useQuery({
    queryKey: ["coffees"],
    queryFn: sharedApi.getCoffees,
    select: (res) => res.data as TCoffee[],
  });

  return {
    coffees,
    isLoadingCoffees,
  };
};

export { useCoffees };
