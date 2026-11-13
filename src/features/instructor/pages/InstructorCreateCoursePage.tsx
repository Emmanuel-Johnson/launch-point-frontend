import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Crown,
  FileText,
  ImagePlus,
  Image as ImageIcon,
  LayoutGrid,
  Lightbulb,
  LoaderCircle,
  Plus,
  RefreshCw,
  Info,
  Trash2,
  Type,
  Upload,
  type LucideIcon,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   INSTRUCTOR "CREATE NEW COURSE" PAGE — UI ONLY
   Course basics form. Category / level / skill options are mock data
   and submit is stubbed; wire both to the real API once it exists.
   ────────────────────────────────────────────────────────────────── */

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

const THUMBNAIL_MAX_SIZE_MB = 5;
const THUMBNAIL_TYPES = ["image/jpeg", "image/png", "image/webp"];

// UI-only options. Replace with categories, levels and skills from the API.
const CATEGORY_OPTIONS = [
  "Frontend Development",
  "Backend Development",
  "Data & Databases",
  "DevOps & Cloud",
  "UI/UX Design",
];
const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];
const SKILL_OPTIONS = [
  "React",
  "TypeScript",
  "Django",
  "REST APIs",
  "PostgreSQL",
  "Docker",
  "Tailwind",
  "CI/CD",
];

const courseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters.")
    .max(500, "Description cannot exceed 500 characters."),
  category: z.string().min(1, "Please select a category."),
  level: z.string().min(1, "Please select a level."),
  skills: z
    .array(z.string())
    .min(1, "Select at least one skill.")
    .max(6, "You can select up to 6 skills."),
  plan: z.enum(["free", "premium"]),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/[0.12] bg-white/[0.045] px-4 py-3 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] outline-none transition-all duration-200 placeholder:text-white/30 hover:border-white/20 hover:bg-white/[0.06] focus:border-[#3B82F6]/70 focus:bg-[#3B82F6]/[0.05] focus:ring-4 focus:ring-[#3B82F6]/10 disabled:opacity-50";
const labelClassName = "block text-sm font-medium text-white/75";

const fieldClassName = () => inputClassName;

function Required() {
  return (
    <span className="ml-0.5 text-[#60A5FA]" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-rose-400" role="alert">
      {message}
    </p>
  );
}

function FormCard({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent"
      />
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#60A5FA] ring-1 ring-inset ring-[#3B82F6]/25">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-white">
            {title}
          </h2>
          {hint && <p className="mt-0.5 text-xs text-white/40">{hint}</p>}
        </div>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

/* Custom listbox dropdown so the menu matches the instructor theme. */
function FormSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  onBlur,
  hasError,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  icon: LucideIcon;
  onBlur: () => void;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onBlur]);

  return (
    <div ref={containerRef} className="relative mt-2">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
        className={`flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 text-left text-sm transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#3B82F6]/10 ${
          open
            ? "border-[#3B82F6]/70 bg-[#3B82F6]/[0.05] ring-4 ring-[#3B82F6]/10"
            : "border-white/[0.12] bg-white/[0.045] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-white/[0.06]"
        }`}
      >
        <Icon
          className={`h-4 w-4 shrink-0 ${value ? "text-[#60A5FA]" : "text-white/30"}`}
          aria-hidden="true"
        />
        <span
          className={`min-w-0 flex-1 truncate ${value ? "text-white" : "text-white/30"}`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
            open ? "rotate-180 text-[#60A5FA]" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={placeholder}
          className="absolute left-0 top-[calc(100%+8px)] z-50 max-h-64 w-full overflow-y-auto rounded-xl border border-white/[0.09] bg-[#0D0D0D] p-1.5 shadow-2xl shadow-black/60"
        >
          <button
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
              !value
                ? "bg-white/[0.05] font-medium text-white/60"
                : "text-white/35 hover:bg-white/[0.05] hover:text-white/70"
            }`}
          >
            {placeholder}
          </button>
          <div aria-hidden="true" className="mx-2 my-1 h-px bg-white/[0.06]" />
          {options.map((option) => {
            const isActive = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                  isActive
                    ? "bg-[#3B82F6]/[0.12] font-medium text-[#8FBAFF]"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {option}
                {isActive && (
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-[#60A5FA]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function InstructorCreateCoursePage() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState("");
  const [submitAction, setSubmitAction] = useState<"draft" | "builder">(
    "draft",
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      skills: [],
      plan: "free",
    },
  });

  const plan = useWatch({ control, name: "plan" });
  const description = useWatch({ control, name: "description" });

  // Object URLs are created in the handlers and revoked here on unmount.
  const previewUrlRef = useRef<string | null>(null);
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const clearPreviewUrl = () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!THUMBNAIL_TYPES.includes(file.type)) {
      setThumbnailError("Thumbnail must be a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > THUMBNAIL_MAX_SIZE_MB * 1024 * 1024) {
      setThumbnailError(
        `Thumbnail must be smaller than ${THUMBNAIL_MAX_SIZE_MB} MB.`,
      );
      return;
    }
    clearPreviewUrl();
    previewUrlRef.current = URL.createObjectURL(file);
    setThumbnailError("");
    setThumbnail(file);
    setThumbnailPreview(previewUrlRef.current);
  };

  const removeThumbnail = () => {
    clearPreviewUrl();
    setThumbnail(null);
    setThumbnailPreview(null);
    setThumbnailError("");
  };

  const handleCancel = () => {
    if (isDirty || thumbnail) {
      const discard = window.confirm(
        "Discard this course? Changes will be lost.",
      );
      if (!discard) return;
    }
    navigate("/instructor/courses");
  };

  // Stubbed submit — replace with the create-course API call. "builder" should
  // navigate to the course builder with the new course id.
  const saveCourse = async (
    values: CourseFormValues,
    action: "draft" | "builder",
  ) => {
    setSubmitAction(action);
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Create course (UI only)", action, values, thumbnail);
    if (action === "builder") {
      toast.success("Course details saved (UI only).");
      // TODO: include the new course id in the route once the API returns one.
      navigate("/instructor/courses/course-builder");
      return;
    }
    toast.success("Course saved as draft (UI only).");
  };

  // The thumbnail lives outside React Hook Form, so it is validated here and
  // also when other fields are invalid, so every error shows at once.
  const validateThumbnail = (): boolean => {
    if (thumbnail) return true;
    setThumbnailError("Please upload a course thumbnail.");
    return false;
  };

  const submitWith = (action: "draft" | "builder") =>
    handleSubmit(
      (values) => {
        if (validateThumbnail()) return saveCourse(values, action);
      },
      () => {
        validateThumbnail();
      },
    );

  const onSaveDraft = submitWith("draft");
  const onContinue = submitWith("builder");

  return (
    <section className="relative w-full text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#3B82F6]/10 blur-3xl"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Top bar — circular glass back button + breadcrumb */}
        <div className="mb-6 flex min-w-0 flex-wrap items-center gap-3.5">
          <Link
            to="/instructor/courses"
            aria-label="Back to My Courses"
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_22px_-4px_rgba(96,165,250,0.9)] transition-opacity duration-300 group-hover:opacity-100"
            />
            <ArrowLeft
              className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-2 text-[11px] tracking-[-0.01em] sm:text-xs"
          >
            <Link
              to="/instructor/courses"
              className="hidden shrink-0 font-semibold text-white/45 transition-colors hover:text-white/80 sm:inline"
            >
              My Courses
            </Link>
            <ChevronRight
              aria-hidden="true"
              className="hidden h-3.5 w-3.5 shrink-0 text-blue-300/50 sm:block"
            />
            <span
              aria-current="page"
              className="min-w-0 truncate bg-gradient-to-r from-blue-100 via-sky-200 to-blue-300 bg-clip-text font-bold text-transparent"
            >
              Create New Course
            </span>
          </nav>
        </div>

        <header className="mb-8 cursor-default">
          <h1
            className="text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            <span className="bg-gradient-to-r from-white via-[#DBEAFE] to-[#60A5FA] bg-clip-text text-transparent">
              Create New Course
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            Start with the basics. You can add sections and lessons after
            saving.
          </p>
        </header>

        <form
          onSubmit={onSaveDraft}
          noValidate
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <div className="space-y-6">
            <FormCard
              icon={FileText}
              title="Course details"
              hint="Tell students what this course is about."
            >
              <div>
                <label htmlFor="title" className={labelClassName}>
                  Course title
                  <Required />
                </label>
                <div className="relative">
                  <Type
                    className="pointer-events-none absolute left-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-white/35"
                    aria-hidden="true"
                  />
                  <input
                    id="title"
                    maxLength={100}
                    placeholder="e.g. Modern React & TypeScript"
                    aria-invalid={Boolean(errors.title)}
                    className={`${fieldClassName()} h-12 pl-11`}
                    {...register("title")}
                  />
                </div>
                <FieldError message={errors.title?.message} />
              </div>

              <div>
                <label htmlFor="description" className={labelClassName}>
                  Short description
                  <Required />
                </label>
                <textarea
                  id="description"
                  rows={5}
                  maxLength={500}
                  placeholder="What will students learn in this course?"
                  aria-invalid={Boolean(errors.description)}
                  className={`${fieldClassName()} resize-none`}
                  {...register("description")}
                />
                <div className="mt-1.5 flex items-start justify-between gap-3">
                  <FieldError message={errors.description?.message} />
                  <span className="ml-auto text-xs text-white/30">
                    {description.length}/500
                  </span>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className={labelClassName}>
                    Category
                    <Required />
                  </label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormSelect
                        id="category"
                        value={field.value}
                        onChange={field.onChange}
                        options={CATEGORY_OPTIONS}
                        placeholder="Select category"
                        icon={LayoutGrid}
                        onBlur={field.onBlur}
                        hasError={Boolean(errors.category)}
                      />
                    )}
                  />
                  <FieldError message={errors.category?.message} />
                </div>

                <div>
                  <label htmlFor="level" className={labelClassName}>
                    Level
                    <Required />
                  </label>
                  <Controller
                    control={control}
                    name="level"
                    render={({ field }) => (
                      <FormSelect
                        id="level"
                        value={field.value}
                        onChange={field.onChange}
                        options={LEVEL_OPTIONS}
                        placeholder="Select level"
                        icon={BarChart3}
                        onBlur={field.onBlur}
                        hasError={Boolean(errors.level)}
                      />
                    )}
                  />
                  <FieldError message={errors.level?.message} />
                </div>
              </div>
            </FormCard>

            <FormCard
              icon={Lightbulb}
              title="Skills"
              hint="Click + to add up to 6 skills students will gain."
            >
              <Controller
                control={control}
                name="skills"
                render={({ field }) => (
                  <div
                    role="group"
                    aria-label="Skills"
                    className="flex flex-wrap gap-2"
                  >
                    {SKILL_OPTIONS.map((skill) => {
                      const selected = field.value.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            field.onChange(
                              selected
                                ? field.value.filter((item) => item !== skill)
                                : [...field.value, skill],
                            )
                          }
                          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 ${
                            selected
                              ? "border-[#3B82F6]/60 bg-[#3B82F6]/20 text-blue-100 shadow-[0_0_14px_-4px_rgba(59,130,246,0.7)]"
                              : "border-white/[0.12] bg-white/[0.045] text-white/60 hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/[0.06] hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              selected
                                ? "border-blue-300/60 bg-[#3B82F6]/20"
                                : "border-white/25 bg-white/[0.03]"
                            }`}
                          >
                            {selected ? (
                              <Check
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                              />
                            ) : (
                              <Plus
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              <FieldError message={errors.skills?.message} />
            </FormCard>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6">
            <FormCard
              icon={ImageIcon}
              title="Thumbnail"
              hint={`JPG, PNG or WebP, up to ${THUMBNAIL_MAX_SIZE_MB} MB.`}
            >
              <div className="flex flex-col items-center gap-3">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Course thumbnail preview"
                    className="aspect-video w-full rounded-2xl border border-blue-400/20 object-cover shadow-lg shadow-blue-950/40 ring-2 ring-blue-500/10"
                  />
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-blue-200 shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]">
                    <ImagePlus className="h-8 w-8" aria-hidden="true" />
                    <span className="text-xs text-blue-200/70">
                      No thumbnail selected
                    </span>
                  </div>
                )}

                <div
                  className={`grid w-full gap-2 ${thumbnailPreview ? "grid-cols-2" : "grid-cols-1"}`}
                >
                  <label
                    htmlFor="thumbnail"
                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 text-xs font-semibold text-[#93C5FD] transition-all hover:border-[#3B82F6]/55 hover:bg-[#3B82F6]/20 hover:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#3B82F6]/40"
                  >
                    {thumbnailPreview ? (
                      <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {thumbnailPreview ? "Change" : "Upload"}
                  </label>
                  {thumbnailPreview && (
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/[0.06] px-4 text-xs font-semibold text-red-300/90 transition-all hover:border-red-400/45 hover:bg-red-500/[0.12] hover:text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  )}
                </div>

                <input
                  id="thumbnail"
                  type="file"
                  accept={THUMBNAIL_TYPES.join(",")}
                  onChange={handleThumbnailChange}
                  className="sr-only"
                />
              </div>
              <div className="text-center">
                <FieldError message={thumbnailError} />
              </div>
            </FormCard>

            <FormCard icon={Crown} title="Access">
              <fieldset>
                <legend className={labelClassName}>Course access</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["free", "premium"] as const).map((option) => {
                    const isPremium = option === "premium";
                    const selected = plan === option;
                    return (
                      <label
                        key={option}
                        className={`relative flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 h-12 text-[13px] font-semibold transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#3B82F6]/40 ${
                          selected
                            ? isPremium
                              ? "border-amber-300/40 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95 text-amber-200 shadow-[0_4px_18px_rgba(245,158,11,0.18)]"
                              : "border-emerald-400/35 bg-[#06251D]/90 text-emerald-300 shadow-lg"
                            : "border-white/[0.12] bg-white/[0.045] text-white/50 hover:border-white/20 hover:text-white/80"
                        }`}
                      >
                        <input
                          type="radio"
                          value={option}
                          className="sr-only"
                          {...register("plan")}
                        />
                        {isPremium ? (
                          <Crown
                            className={`h-4 w-4 ${selected ? "text-amber-300" : ""}`}
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckCircle2
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                        {isPremium ? "Premium" : "Free"}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div
                className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                  plan === "premium"
                    ? "border-amber-300/20 bg-amber-400/[0.05]"
                    : "border-emerald-400/20 bg-emerald-400/[0.05]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${
                    plan === "premium"
                      ? "bg-amber-400/10 text-amber-300 ring-amber-300/25"
                      : "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25"
                  }`}
                >
                  <Info className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-xs leading-5 text-white/55">
                  <span
                    className={`block text-[13px] font-semibold ${
                      plan === "premium" ? "text-amber-200" : "text-emerald-300"
                    }`}
                  >
                    {plan === "premium" ? "Premium course" : "Free course"}
                  </span>
                  {plan === "premium"
                    ? "Premium courses are available to students with an active subscription."
                    : "Free courses are available to all students."}
                </p>
              </div>
            </FormCard>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onContinue}
                disabled={isSubmitting}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#0EA5E9] bg-[length:200%_100%] bg-left px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(37,99,235,0.8)] transition-all duration-300 hover:bg-right hover:shadow-[0_10px_30px_-8px_rgba(14,165,233,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && submitAction === "builder" ? (
                  <LoaderCircle
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : null}
                {isSubmitting && submitAction === "builder"
                  ? "Saving..."
                  : "Continue to Course Builder"}
                {!isSubmitting && (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="cursor-pointer h-12 rounded-xl border border-red-400/25 bg-red-500/[0.06] px-5 text-sm font-semibold text-red-300/90 transition hover:border-red-400/45 hover:bg-red-500/[0.12] hover:text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 h-12 rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-5 text-sm font-semibold text-[#93C5FD] transition hover:bg-[#3B82F6]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting && submitAction === "draft" && (
                    <LoaderCircle
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {isSubmitting && submitAction === "draft"
                    ? "Saving..."
                    : "Save as draft"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
