import {Todo} from "@/app/types/types";
import {TodosList} from "@/app/todos/components/todos-list";
import { getTodos } from "./api";

export default async function Todos() {
  const data: Todo[] = await getTodos();

  return (
    <TodosList todos={data} />
  );
}
