import {Todo} from "@/app/types/types";
import {EditTodo} from "@/app/todos/[todo]/components/edlit-todo";
import {getTodo} from "@/app/todos/api";

export default async function Todo(props: { params: { todo: string } }) {
  console.log("START FETCH");
  const todoData = await getTodo(props.params.todo);
  console.log("FETCHED ", todoData);
  return (
    <EditTodo todo={todoData} />
  );
}
