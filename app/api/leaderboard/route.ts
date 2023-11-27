import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const filePath = path.join(process.cwd(), "db", "board.json");
  const { board_name, label } = await request.json();
  try {
    const jsonData = JSON.parse(await fs.readFile(filePath, "utf8"));
    jsonData.push({
      board_name: board_name,
      label: label,
      columns: [],
    });
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    return NextResponse.json({ message: "Board added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding column" },
      { status: 500 }
    );
  }
}
