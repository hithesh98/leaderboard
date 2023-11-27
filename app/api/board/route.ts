import { NextResponse } from "next/server";
import data from "@/db/board.json";
import fs from "fs/promises";
import path from "path";
import { Board } from "@/db/types";

export async function GET(request: Request) {
  const response = new Response(JSON.stringify({ data }));
  return response;
}

export async function POST(request: Request) {
  const filePath = path.join(process.cwd(), "db", "board.json");
  const { board_name, data } = await request.json();
  try {
    const jsonData = JSON.parse(await fs.readFile(filePath, "utf8"));
    const board = jsonData.find(
      (board: Board) => board.board_name === board_name
    );
    if (board) {
      board.columns.push({ key: data.key, header: data.header });
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
      return NextResponse.json({ message: "Column added successfully" });
    } else {
      return NextResponse.json({ message: "Board not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding column" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const filePath = path.join(process.cwd(), "db", "board.json");
  const { board_name, data } = await request.json();
  try {
    const jsonData = JSON.parse(await fs.readFile(filePath, "utf8"));
    const board = jsonData.find(
      (board: Board) => board.board_name === board_name
    );
    if (board) {
      board.columns = board.columns.map((column: any) => {
        if (column.key === data.key) {
          return { key: data.key, header: data.header };
        }
        return column;
      });
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
      return NextResponse.json({ message: "Column updated successfully" });
    } else {
      return NextResponse.json({ message: "Board not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating column" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const filePath = path.join(process.cwd(), "db", "board.json");
  const { board_name, column_key } = await request.json();
  try {
    const jsonData = JSON.parse(await fs.readFile(filePath, "utf8"));
    const board = jsonData.find(
      (board: Board) => board.board_name === board_name
    );
    if (board) {
      board.columns = board.columns.filter(
        (column: any) => column.key !== column_key
      );
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
      return NextResponse.json({ message: "Column deleted successfully" });
    } else {
      return NextResponse.json({ message: "Board not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting column" },
      { status: 500 }
    );
  }
}
