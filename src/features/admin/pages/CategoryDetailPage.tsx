import { useNavigate, useParams } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Web Development",
    description:
      "Courses related to frontend, backend, and full-stack development.",
    courseCount: 12,
    is_active: true,
    created_at: "2026-09-01",
    updated_at: "2026-09-20",
  },
  {
    id: 2,
    name: "Python",
    description: "Learn Python programming from beginner to advanced level.",
    courseCount: 8,
    is_active: true,
    created_at: "2026-09-03",
    updated_at: "2026-09-18",
  },
];

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find((item) => item.id === Number(categoryId));

  if (!category) {
    return (
      <div className="min-h-screen bg-[#06110d] p-6 text-white">
        <button
          onClick={() => navigate("/admin/categories")}
          className="mb-6 text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Categories
        </button>

        <div className="rounded-xl border border-red-900/40 bg-[#0a1913] p-8">
          <h1 className="text-xl font-semibold">Category Not Found</h1>
          <p className="mt-2 text-sm text-gray-400">
            The category you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06110d] p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/categories")}
          className="mb-5 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          ← Back to Categories
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{category.name}</h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  category.is_active
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {category.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Category ID: #{category.id}
            </p>
          </div>

          <button
            onClick={() => console.log("Edit category")}
            className="rounded-lg border border-emerald-800/50 px-5 py-2.5 text-sm text-emerald-400 transition hover:bg-emerald-500/10"
          >
            Edit Category
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Information */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-emerald-900/40 bg-[#0a1913] p-6">
            <h2 className="mb-5 text-lg font-medium">Category Information</h2>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Name
                </p>
                <p className="mt-1 text-sm text-gray-200">{category.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Description
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-300">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="rounded-xl border border-emerald-900/40 bg-[#0a1913] p-6">
            <h2 className="mb-5 text-lg font-medium">Overview</h2>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Courses
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-400">
                  {category.courseCount}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Created
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {category.created_at}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Last Updated
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {category.updated_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="mt-6 rounded-xl border border-emerald-900/40 bg-[#0a1913] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Courses</h2>
            <p className="mt-1 text-sm text-gray-400">
              Courses belonging to this category
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {category.courseCount} courses
          </span>
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-emerald-900/40 p-8 text-center">
          <p className="text-sm text-gray-500">
            Course list will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
