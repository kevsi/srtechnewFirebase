import { useQuery } from "@tanstack/react-query";
import { getEvents, getEventById, Event } from "@/lib/events";

/**
 * Hook React Query pour récupérer tous les événements
 */
export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook React Query pour récupérer un événement par son ID
 */
export function useEvent(id: string | undefined) {
  return useQuery<Event | null>({
    queryKey: ["event", id],
    queryFn: () => (id ? getEventById(id) : Promise.resolve(null)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

