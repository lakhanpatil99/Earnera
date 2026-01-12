import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useWallet() {
  return useQuery({
    queryKey: [api.wallet.get.path],
    queryFn: async () => {
      const res = await fetch(api.wallet.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch wallet");
      return api.wallet.get.responses[200].parse(await res.json());
    },
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (amount: number) => {
      const res = await fetch(api.wallet.withdraw.path, {
        method: api.wallet.withdraw.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Withdrawal failed");
      }
      return api.wallet.withdraw.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.wallet.get.path] });
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] });
      toast({
        title: "Withdrawal Successful! 💸",
        description: data.message,
        className: "bg-amber-50 border-amber-200",
      });
    },
    onError: (err) => {
      toast({
        title: "Withdrawal Failed",
        description: err.message,
        variant: "destructive",
      });
    }
  });
}
