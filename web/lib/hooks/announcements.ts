"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { Announcement } from "../types";

export function useAnnouncements(classroomId: string) {
  const [data, setData] = useState<Announcement[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Announcement[]>(`/classrooms/${classroomId}/announcements`);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [classroomId]);
  useEffect(() => {
    fetcher();
  }, [fetcher]);
  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}