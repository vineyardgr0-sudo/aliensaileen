import { NextResponse } from "next/server";
import { getLesson } from "@/lib/lessons";
export async function GET(_req: Request, { params }: { params: { lessonId: string } }) {
  const lesson = getLesson(params.lessonId);
  if (!lesson) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lesson);
}
