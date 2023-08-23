import {Todo} from "@/app/types/types";

const baseUrl = "http://localhost:3001";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${baseUrl}/api/todos`, { next: { revalidate: 0 }});
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
};

export const getTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`${baseUrl}/api/todos?id=${id}`, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error("Failed to fetch todo");
  }
  return res.json();
};

export const addTodo = async (label: string) => {
  await fetch(`${baseUrl}/api/todos`, {
    method: "POST",
    body: JSON.stringify({ label: label })
  });
};

export const editTodo = async (params: {id: string, label: string}) => {
  await fetch(`${baseUrl}/api/todos?id=${params.id}`, {
    method: "PUT",
    body: JSON.stringify({ label: params.label })
  });
};

export const removeTodo = async (id: string) => {
  await fetch(`${baseUrl}/api/todos?id=${id}`, {
    method: "DELETE",
  });
};
