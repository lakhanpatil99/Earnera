import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useTasks() {
  return useQuery({
    queryKey: [api.tasks.list.path],
    queryFn: async () => {
      const res = await fetch(api.tasks.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return api.tasks.list.responses[200].parse(await res.json());
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (taskId: number) => {
      const url = buildUrl(api.tasks.complete.path, { id: taskId });
      const res = await fetch(url, {
        method: api.tasks.complete.method,
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Task not found");
        throw new Error("Failed to complete task");
      }
      return api.tasks.complete.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.wallet.get.path] });
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] });
      toast({
        title: "Task Completed! 🎉",
        description: data.message,
        className: "bg-green-50 border-green-200",
      });
    },
    onError: (err) => {
       toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  });
}
