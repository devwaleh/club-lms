"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { Assignment, Submission } from "../types";

export function useAssignments(classroomId: string) {
  const [data, setData] = useState<Assignment[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Assignment[]>(`/classrooms/${classroomId}/assignments`);
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

export function useAssignment(assignmentId: string) {
  const [data, setData] = useState<Assignment | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Assignment>(`/assignments/${assignmentId}`);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [assignmentId]);
  useEffect(() => {
    fetcher();
  }, [fetcher]);
  return { data, isLoading, isError: !!error, error, refetch: fetcher };
}

export function useCreateSubmission(assignmentId: string) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mutate = async (payload: { text_answer?: string; file?: File | null }) => {
    const form = new FormData();
    if (payload.text_answer) form.append("text_answer", payload.text_answer);
    if (payload.file) form.append("file", payload.file);
    setIsPending(true);
    setError(null);
    try {
      const { data } = await api.post<Submission>(`/assignments/${assignmentId}/submissions`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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