'use client'

import {Todo} from "@/app/types/types";
import Link from "next/link";
import {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, removeTodo } from "../api";

type Props = {
  todos: Todo[];
}

export const TodosList = ({ todos }: Props) => {
  const router = useRouter();
  const [todoLabel, setTodoLabel] = useState("");
  const queryClient = useQueryClient();

  const { data, isRefetching, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData: todos,
    staleTime: 1000,
    onError: () => {
      alert("Could not load todos :{");
    }
  });

  const { mutate: addOne, isLoading: isCreating } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutate: removeOne, isLoading: isRemoving } = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const onSubmit = async () => {
    await addOne(todoLabel);
  }

  const handleRemove = async (id: string) => {
    await removeOne(id);
  };

  return (
    <>
      {isCreating && <div style={{ fontWeight: 'bold' }}>Mutate...</div>}
      {isRemoving && <div style={{ fontWeight: 'bold' }}>Remove...</div>}
      {!isLoading && isRefetching && <div style={{ fontWeight: 'bold' }}>Refetch...</div>}
      <ul>
        {data.map(todo => (
          <li key={todo.id}>
            <pre style={{ display: "inline-block", marginRight: 12 }}>{todo.id}</pre>
            <Link href={`/todos/${todo.id}`}>{todo.label}</Link>{" "}
            <button onClick={() => handleRemove(todo.id)}>remove</button>
          </li>
        ))}
      </ul>
      <br/>
      <div>Add todo:</div>
      <p>
        <input
          type="text"
          value={todoLabel}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoLabel(e.target.value)}
        />
      </p>
      <p>
        <button onClick={onSubmit}>Submit</button>
      </p>
    </>
  );
};
