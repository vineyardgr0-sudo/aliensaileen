import { notFound } from "next/navigation";
import { getLesson } from "@/lib/lessons";
import { CATEGORIES } from "@/data/categories";
import LessonClient from "@/components/lesson/LessonClient";

interface Props {
  params: { category: string; lessonId: string };
}

export function generateStaticParams() {
  return CATEGORIES.flatMap((cat) =>
    cat.lessons
      .filter((l) => l.status === "live")
      .map((l) => ({ category: cat.id, lessonId: l.id }))
  );
}

export default function LessonPage({ params }: Props) {
  const lesson = getLesson(params.lessonId);

  // Fix C: validate that the lesson actually belongs to the URL category
  // Prevents /learn/fan_meeting/BM_001 from showing a Workplace lesson
  if (!lesson || lesson.meta.category !== params.category) {
    notFound();
  }

  return <LessonClient lesson={lesson} />;
}
