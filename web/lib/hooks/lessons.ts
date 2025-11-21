"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { Lesson } from "../types";

export function useLessons(classroomId: string) {
  const [data, setData] = useState<Lesson[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Lesson[]>(`/classrooms/${classroomId}/lessons`);
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

export function useLesson(lessonId: string) {
  const [data, setData] = useState<Lesson | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Lesson>(`/lessons/${lessonId}`);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}