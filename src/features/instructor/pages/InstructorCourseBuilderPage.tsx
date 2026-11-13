import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder for the course builder — sections and lessons will be built here.
export default function InstructorCourseBuilderPage() {
  return (
    <section className="w-full rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 text-white sm:p-8">
      <Link
        to="/instructor/courses/create-new-course"
        className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#60A5FA] focus:outline-none focus-visible:text-[#60A5FA]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Course Details
      </Link>

      <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">
        Course Builder
      </h1>
      <p className="mt-2 text-sm text-white/50">
        This is the course builder page. Sections and lessons will be added
        here.
      </p>
    </section>
  );
}
