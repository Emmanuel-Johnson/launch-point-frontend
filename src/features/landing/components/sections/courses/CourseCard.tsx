import { Star, Users, Clock } from "lucide-react";
import type { Course } from "../../../types/landing";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const {
    title,
    imageUrl,
    level,
    rating,
    instructor,
    students,
    duration,
    priceTag,
  } = course;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Level + rating */}
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
            {level}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-slate-700">
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900">
          {title}
        </h3>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <img
            src={instructor.avatarUrl}
            alt={instructor.name}
            loading="lazy"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-sm text-slate-600">{instructor.name}</span>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            {students} Students
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {duration}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-semibold text-indigo-600">
            {priceTag}
          </span>
          <button
            type="button"
            className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
