"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { Classroom } from "../types";

export function useClassrooms() {
  const [data, setData] = useState<Classroom[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Classroom[]>("/classrooms");
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}

export function useClassroom(id: string) {
  const [data, setData] = useState<Classroom | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Classroom>(`/classrooms/${id}`);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}

export function useJoinClassroom(id: string) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mutate = async () => {
    setIsPending(true);
    setError(null);
    try {
      await api.post(`/classrooms/${id}/join`);
    } catch (e: any) {
      setError(e);
      throw e;
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending, error };
}

export function useJoinWithInviteCode() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mutate = async (invite_code: string) => {
    setIsPending(true);
    setError(null);
    try {
      await api.post(`/classrooms/join-with-code`, { invite_code });
    } catch (e: any) {
      setError(e);
      throw e;
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending, error };
}