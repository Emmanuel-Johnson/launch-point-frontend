import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder for the course creation flow — the form will be built here step by step.
export default function InstructorCreateCoursePage() {
  return (
    <section className="w-full rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 text-white sm:p-8">
      <Link
        to="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#60A5FA] focus:outline-none focus-visible:text-[#60A5FA]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to My Courses
      </Link>

      <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">
        Create New Course
      </h1>
      <p className="mt-2 text-sm text-white/50">
        This is the create course page. The course creation form will go here.
      </p>
    </section>
  );
}
