import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import type { Lesson } from "@/types/lesson";
import LessonClient from "@/components/lesson/LessonClient";

interface Props {
  params: { id: string };
}

async function getPublicLesson(id: string): Promise<Lesson | null> {
  const filePath = path.join(process.cwd(), "public", "lessons", `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents) as Lesson;
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const lessonsDir = path.join(process.cwd(), "public", "lessons");
  try {
    const files = await fs.readdir(lessonsDir);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({ id: file.replace(/\.json$/, "") }));
  } catch (error) {
    return [];
  }
}

export default async function LessonPage({ params }: Props) {
  const lesson = await getPublicLesson(params.id);
  if (!lesson) {
    notFound();
  }

  return <LessonClient lesson={lesson} />;
}
