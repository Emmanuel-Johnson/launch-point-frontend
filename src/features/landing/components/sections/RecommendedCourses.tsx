import CourseCard from "../ui/CourseCard";
import { courses } from "../../data/landingData";

const RecommendedCourses = () => {
  return (
    <section id="courses" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Recommended For You
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Handpicked high-quality courses to jumpstart your career in tech.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedCourses;
