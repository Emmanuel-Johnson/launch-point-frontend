import { useEffect, useState, type FormEvent } from "react";
import {
  X,
  GraduationCap,
  BriefcaseBusiness,
  UserRound,
  Link2,
  FileText,
  UploadCloud,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

type ApplicationForm = {
  job_title: string;
  education: string;
  years_of_experience: string;
  topics_to_teach: string[];
  short_bio: string;
  phone_number: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  motivation: string;
  terms_accepted: boolean;
};

const experienceOptions = [
  { value: "less_than_one", label: "Less than 1 year" },
  { value: "one_to_three", label: "1–3 years" },
  { value: "three_to_five", label: "3–5 years" },
  { value: "five_to_ten", label: "5–10 years" },
  { value: "ten_plus", label: "10+ years" },
];

const categoryOptions = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Artificial Intelligence & Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Database Management",
  "Software Engineering",
  "DevOps",
  "UI/UX Design",
  "Game Development",
  "Other",
];

const initialApplicationForm: ApplicationForm = {
  job_title: "",
  education: "",
  years_of_experience: "",
  topics_to_teach: [],
  short_bio: "",
  phone_number: "",
  location: "",
  linkedin_url: "",
  github_url: "",
  portfolio_url: "",
  motivation: "",
  terms_accepted: false,
};

type InstructorApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InstructorApplicationModal = ({
  isOpen,
  onClose,
}: InstructorApplicationModalProps) => {
  const [form, setForm] = useState<ApplicationForm>(initialApplicationForm);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = <K extends keyof ApplicationForm>(
    field: K,
    value: ApplicationForm[K],
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const toggleTopic = (topic: string) => {
    setForm((previous) => {
      const exists = previous.topics_to_teach.includes(topic);
      if (exists) {
        return {
          ...previous,
          topics_to_teach: previous.topics_to_teach.filter(
            (item) => item !== topic,
          ),
        };
      }
      if (previous.topics_to_teach.length >= 10) return previous;
      return {
        ...previous,
        topics_to_teach: [...previous.topics_to_teach, topic],
      };
    });
  };

  const addCustomTopic = () => {
    const topic = topicInput.trim();
    if (
      !topic ||
      form.topics_to_teach.includes(topic) ||
      form.topics_to_teach.length >= 10
    ) {
      return;
    }
    updateField("topics_to_teach", [...form.topics_to_teach, topic]);
    setTopicInput("");
  };

  const handleResumeChange = (file?: File) => {
    setResumeError("");
    if (!file) {
      setResume(null);
      return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;
    if (!allowedExtensions.test(file.name)) {
      setResumeError("Please choose a PDF, DOC, or DOCX file.");
      setResume(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("Your resume must be 5 MB or smaller.");
      setResume(null);
      return;
    }
    setResume(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) {
      setResumeError("Please upload your resume to continue.");
      return;
    }
    setSubmitted(true);
  };

  const closeAndReset = () => {
    setForm(initialApplicationForm);
    setResume(null);
    setResumeError("");
    setTopicInput("");
    setSubmitted(false);
    onClose();
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101116] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/10";
  const labelClass = "block text-sm font-medium text-zinc-300";
  const sectionClass =
    "rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-0 backdrop-blur-md sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeAndReset();
      }}
      role="presentation"
    >
      <section
        aria-labelledby="application-modal-title"
        aria-modal="true"
        role="dialog"
        className="relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#0B0C11] shadow-2xl shadow-black/60 sm:h-[min(92vh,900px)] sm:max-w-4xl sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <header className="relative flex shrink-0 items-start justify-between border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-400">
                Launch Point · Instructor Program
              </p>
              <h2
                id="application-modal-title"
                className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                {submitted
                  ? "Application preview complete"
                  : "Become an instructor"}
              </h2>
              <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-400 sm:text-sm">
                {submitted
                  ? "This is a UI demo. Your application has not been sent anywhere."
                  : "Tell us about your experience and what you’d love to teach."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close application form"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {submitted ? (
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white">Looks good!</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
              Your form passed the basic UI checks. API integration and actual
              submission will be added later.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-left text-sm">
              <p className="text-zinc-500">Teaching role</p>
              <p className="mt-1 font-medium text-white">{form.job_title}</p>
              <p className="mt-3 text-zinc-500">Topics selected</p>
              <p className="mt-1 font-medium text-white">
                {form.topics_to_teach.join(", ")}
              </p>
              <p className="mt-3 text-zinc-500">Resume</p>
              <p className="mt-1 font-medium text-white">{resume?.name}</p>
            </div>
            <button
              type="button"
              onClick={closeAndReset}
              className="mt-8 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
              <div className={sectionClass}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Professional information
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Your role, education, and teaching expertise.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Current job title <span className="text-blue-400">*</span>
                    <input
                      className={inputClass}
                      value={form.job_title}
                      onChange={(e) => updateField("job_title", e.target.value)}
                      placeholder="e.g. Full-stack developer"
                      maxLength={150}
                      required
                    />
                  </label>
                  <label className={labelClass}>
                    Education / qualification
                    <input
                      className={inputClass}
                      value={form.education}
                      onChange={(e) => updateField("education", e.target.value)}
                      placeholder="e.g. B.Sc. Computer Science"
                      maxLength={200}
                    />
                  </label>
                  <label className={labelClass}>
                    Years of experience <span className="text-blue-400">*</span>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10`}
                        value={form.years_of_experience}
                        onChange={(e) =>
                          updateField("years_of_experience", e.target.value)
                        }
                        required
                      >
                        <option value="" disabled>
                          Select your experience
                        </option>
                        {experienceOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#101116]"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                  </label>
                  <label className={labelClass}>
                    Phone number <span className="text-blue-400">*</span>
                    <input
                      className={inputClass}
                      type="tel"
                      value={form.phone_number}
                      onChange={(e) =>
                        updateField("phone_number", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      maxLength={20}
                      required
                    />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Location
                    <input
                      className={inputClass}
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="City, country"
                      maxLength={150}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <label className={labelClass}>
                      Categories you want to teach{" "}
                      <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                      {form.topics_to_teach.length}/10 selected
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    Choose up to 10 topics.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categoryOptions.map((category) => {
                      const selected = form.topics_to_teach.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => toggleTopic(category)}
                          aria-pressed={selected}
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${selected ? "border-blue-400/50 bg-blue-500/15 text-blue-200" : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"}`}
                        >
                          {selected ? "✓ " : "+ "}
                          {category}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      className={`${inputClass} mt-0`}
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomTopic();
                        }
                      }}
                      placeholder="Add another topic"
                      maxLength={60}
                    />
                    <button
                      type="button"
                      onClick={addCustomTopic}
                      disabled={
                        !topicInput.trim() || form.topics_to_teach.length >= 10
                      }
                      className="shrink-0 rounded-xl border border-white/10 px-4 text-sm font-medium text-zinc-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Add
                    </button>
                  </div>
                  {form.topics_to_teach.length === 0 && (
                    <p className="mt-2 text-xs text-amber-300/80">
                      Select at least one topic to teach.
                    </p>
                  )}
                </div>
              </div>

              <div className={sectionClass}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <UserRound className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      About you
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Help learners and our team get to know you.
                    </p>
                  </div>
                </div>
                <label className={labelClass}>
                  Short professional bio{" "}
                  <span className="text-blue-400">*</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y`}
                    value={form.short_bio}
                    onChange={(e) => updateField("short_bio", e.target.value)}
                    placeholder="Share your background, skills, and what makes your teaching approach unique..."
                    maxLength={1000}
                    required
                  />
                  <span className="mt-1 block text-right text-xs text-zinc-600">
                    {form.short_bio.length}/1000
                  </span>
                </label>
              </div>

              <div className={sectionClass}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Professional links
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Optional links that help us review your work.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    LinkedIn URL
                    <input
                      className={inputClass}
                      type="url"
                      value={form.linkedin_url}
                      onChange={(e) =>
                        updateField("linkedin_url", e.target.value)
                      }
                      placeholder="https://linkedin.com/in/you"
                      maxLength={255}
                    />
                  </label>
                  <label className={labelClass}>
                    GitHub URL
                    <input
                      className={inputClass}
                      type="url"
                      value={form.github_url}
                      onChange={(e) =>
                        updateField("github_url", e.target.value)
                      }
                      placeholder="https://github.com/you"
                      maxLength={255}
                    />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Portfolio / personal website
                    <input
                      className={inputClass}
                      type="url"
                      value={form.portfolio_url}
                      onChange={(e) =>
                        updateField("portfolio_url", e.target.value)
                      }
                      placeholder="https://yourportfolio.com"
                      maxLength={255}
                    />
                  </label>
                </div>
              </div>

              <div className={sectionClass}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Your application
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Tell us why you want to teach on Launch Point.
                    </p>
                  </div>
                </div>
                <label className={labelClass}>
                  Why do you want to become an instructor?{" "}
                  <span className="text-blue-400">*</span>
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    value={form.motivation}
                    onChange={(e) => updateField("motivation", e.target.value)}
                    placeholder="What motivates you to teach, and how would you help learners succeed?"
                    maxLength={2000}
                    required
                  />
                  <span className="mt-1 block text-right text-xs text-zinc-600">
                    {form.motivation.length}/2000
                  </span>
                </label>

                <div className="mt-5">
                  <label className={labelClass}>
                    Resume / CV <span className="text-blue-400">*</span>
                  </label>
                  <label
                    className={`mt-2 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed ${resumeError ? "border-rose-400/50 bg-rose-400/[0.03]" : "border-white/15 bg-[#101116] hover:border-blue-400/50 hover:bg-blue-500/[0.03]"} px-5 py-7 text-center transition`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => handleResumeChange(e.target.files?.[0])}
                    />
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-300">
                      {resume ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <UploadCloud className="h-5 w-5" />
                      )}
                    </div>
                    <span className="mt-3 text-sm font-medium text-white">
                      {resume ? resume.name : "Click to upload your resume"}
                    </span>
                    <span className="mt-1 text-xs text-zinc-500">
                      {resume
                        ? `${(resume.size / (1024 * 1024)).toFixed(2)} MB · Ready to preview`
                        : "PDF, DOC, or DOCX · Max 5 MB"}
                    </span>
                  </label>
                  {resumeError && (
                    <p className="mt-2 text-xs text-rose-300">{resumeError}</p>
                  )}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <input
                  type="checkbox"
                  checked={form.terms_accepted}
                  onChange={(e) =>
                    updateField("terms_accepted", e.target.checked)
                  }
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-blue-500"
                />
                <span className="text-xs leading-6 text-zinc-400">
                  I confirm that the information provided is accurate and agree
                  to the instructor application review process and platform
                  terms. <span className="text-blue-400">*</span>
                </span>
              </label>
            </div>

            <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/10 bg-[#0B0C11]/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-center text-[11px] text-zinc-500 sm:text-left">
                <span className="text-blue-400">*</span> Required fields · UI
                demo only
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 sm:flex-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={form.topics_to_teach.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                >
                  Preview application <span aria-hidden="true">→</span>
                </button>
              </div>
            </footer>
          </form>
        )}
      </section>
    </div>
  );
};

export default InstructorApplicationModal;
