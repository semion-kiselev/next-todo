import {sleep} from "@/utils/sleep";
import {NextRequest, NextResponse} from "next/server";
import { randomUUID } from "crypto";
import {Todo} from "@/app/types/types";

let todos: Todo[] = [
  { id: randomUUID(), label: "one", isDone: false }
];

export const GET = async (request: NextRequest) => {
  console.log("GET ", todos);
  const todoId = request.nextUrl.searchParams.get("id");
  await sleep();
  if (todoId) {
    const todo = todos.find(t => t.id === todoId) || todos[0];
    return NextResponse.json(todo);
  }
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newTodo: Todo = { id: randomUUID(), label: data.label, isDone: false };
  todos = [...todos, newTodo];
  await sleep();
  return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
  const id = await request.nextUrl.searchParams.get("id");
  if (!id) return;
  todos = todos.filter(todo => todo.id !== id)

  await sleep();
  return NextResponse.json({});
}

export async function PUT(request: NextRequest) {
  const id = await request.nextUrl.searchParams.get("id");
  if (!id) return;

  const data: { label: string } = await request.json();

  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex < 0) return;

  const foundTodo = todos[todoIndex];

  todos = [
    ...todos.slice(0, todoIndex),
    {...foundTodo, label: data.label},
    ...todos.slice(todoIndex + 1),
  ];

  await sleep();
  return NextResponse.json({});
}
