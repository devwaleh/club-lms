"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { DiscussionThread, DiscussionThreadWithComments } from "../types";

export function useDiscussionThreads(classroomId: string) {
  const [data, setData] = useState<DiscussionThread[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<DiscussionThread[]>(`/classrooms/${classroomId}/threads`);
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

export function useDiscussionThread(threadId: string) {
  const [data, setData] = useState<DiscussionThreadWithComments | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<DiscussionThreadWithComments>(`/threads/${threadId}`);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [threadId]);
  useEffect(() => {
    fetcher();
  }, [fetcher]);
  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}

export function useCreateThread(classroomId: string) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mutate = async (payload: { title: string; body: string }) => {
    setIsPending(true);
    setError(null);
    try {
      const { data } = await api.post<DiscussionThread>(`/classrooms/${classroomId}/threads`, payload);
      return data;
    } catch (e: any) {
      setError(e);
      throw e;
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending, error };
}

export function useCreateComment(threadId: string) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mutate = async (payload: { body: string }) => {
    setIsPending(true);
    setError(null);
    try {
      await api.post(`/threads/${threadId}/comments`, payload);
    } catch (e: any) {
      setError(e);
      throw e;
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending, error };
}