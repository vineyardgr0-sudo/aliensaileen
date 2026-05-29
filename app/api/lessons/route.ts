import { NextResponse } from "next/server";
import { CATEGORIES } from "@/data/categories";
export async function GET() {
  const lessons = CATEGORIES.flatMap((cat) =>
    cat.lessons.map((l) => ({ id: l.id, title: l.title, category: cat.id, categoryName: cat.name, level: l.level, status: l.status, estimated_minutes: l.estimated_minutes }))
  );
  return NextResponse.json(lessons);
}
