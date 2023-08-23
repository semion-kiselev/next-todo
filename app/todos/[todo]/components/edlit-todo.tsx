'use client'

import {Todo} from "@/app/types/types";
import Link from "next/link";
import {editTodo, getTodo} from "@/app/todos/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export const EditTodo = ({ todo }: { todo: Todo }) => {
  const router = useRouter();

  const { data, isRefetching, isLoading } = useQuery({
    queryKey: ['todo', todo.id],
    queryFn: () => getTodo(todo.id),
    initialData: todo,
    staleTime: 1000,
    onError: () => {
      alert("Could not load todo :{");
    }
  });

  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setLabel(data.label);
  }, [data]);

  const { mutate: editOne, isLoading: isUpdating } = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      router.push("/todos");
    },
  });

  const handleEdit = async () => {
    await editOne({ id: data.id, label });
  }

  return (
    <div>
      {!isLoading && isRefetching && <div style={{ fontWeight: 'bold' }}>Refetch...</div>}
      {isUpdating && <div style={{ fontWeight: 'bold' }}>Update...</div>}
      <div>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
      </div>
      {JSON.stringify(data)}
      <div>
        <Link href="/todos">Go Back</Link>
      </div>
    </div>
  )
}
