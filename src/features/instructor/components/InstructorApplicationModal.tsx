import { useEffect, useState } from "react";

import {
  getInstructorApplicationFormData,
  type InstructorApplicationFormData,
} from "../api/instructorApplicationApi";

import {
  X,
  BriefcaseBusiness,
  UserRound,
  Link2,
  FileText,
  UploadCloud,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const experienceOptions = [
  { value: "less_than_one", label: "Less than 1 year" },
  { value: "one_to_three", label: "1–3 years" },
  { value: "three_to_five", label: "3–5 years" },
  { value: "five_to_ten", label: "5–10 years" },
  { value: "ten_plus", label: "10+ years" },
];

const CategoryOptions = [
  "Python",
  "Web Development",
  "JavaScript",
  "React",
  "Django",
  "Data Structures & Algorithms",
  "Database Design",
  "UI/UX Design",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
];

type ApplicationForm = {
  full_name: string;
  email: string;
  profile_image: string | null;

  occupation: string;
  education: string;
  years_of_experience: string;
  categories_to_teach: string[];
  short_bio: string;
  phone_number: string;
  location: string;

  linkedin_url: string;
  github_url: string;
  portfolio_url: string;

  motivation: string;
  terms_accepted: boolean;
};

const initialApplicationForm: ApplicationForm = {
  full_name: "",
  email: "",
  profile_image: null,

  occupation: "",
  education: "",
  years_of_experience: "",
  categories_to_teach: [],
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

  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [supportingFilesError, setSupportingFilesError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const loadApplicationFormData = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const data: InstructorApplicationFormData =
          await getInstructorApplicationFormData();

        setForm((previous) => ({
          ...previous,

          full_name: data.full_name ?? "",
          email: data.email ?? "",
          profile_image: data.profile_image ?? null,

          occupation: data.occupation ?? "",
          education: data.education ?? "",
          location: data.location ?? "",

          github_url: data.github_url ?? "",
          linkedin_url: data.linkedin_url ?? "",
          portfolio_url: data.portfolio_url ?? "",
        }));
      } catch (error) {
        console.error(
          "Failed to load instructor application form data:",
          error,
        );

        setLoadError(
          "Unable to load your profile information. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadApplicationFormData();

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
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
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

  const handleSupportingFilesChange = (files: FileList | null) => {
    setSupportingFilesError("");

    if (!files) return;

    const selectedFiles = Array.from(files);

    const allowedExtensions = /\.(pdf|doc|docx|png|jpe?g)$/i;

    const maxFileSize = 5 * 1024 * 1024;

    if (selectedFiles.length > 5) {
      setSupportingFilesError("You can upload up to 5 supporting files.");
      return;
    }

    const invalidFile = selectedFiles.find(
      (file) => !allowedExtensions.test(file.name) || file.size > maxFileSize,
    );

    if (invalidFile) {
      setSupportingFilesError(
        "Each file must be PDF, DOC, DOCX, PNG, or JPG and 5 MB or smaller.",
      );
      return;
    }

    setSupportingFiles(selectedFiles);
  };

  const removeSupportingFile = (fileName: string) => {
    setSupportingFiles((previous) =>
      previous.filter((file) => file.name !== fileName),
    );

    setSupportingFilesError("");
  };

  const resetForm = () => {
    setForm(initialApplicationForm);
    setResume(null);
    setResumeError("");
    setSupportingFiles([]);
    setSupportingFilesError("");
    setLoadError("");
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101116] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/10";

  const labelClass = "block text-sm font-medium text-zinc-300";

  const sectionClass =
    "rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6";

  const profileImageUrl = form.profile_image
    ? `http://localhost:8000${form.profile_image}`
    : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-0 backdrop-blur-md sm:p-5"
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

        <header className="relative flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
          <div>
            <h2
              id="application-modal-title"
              className="text-base font-semibold text-white"
            >
              Application to become an instructor
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Tell us about your experience and teaching expertise.
            </p>
          </div>

          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close application form"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />

              <p className="mt-4 text-sm font-medium text-white">
                Loading your profile...
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Fetching your saved information.
              </p>
            </div>
          </div>
        ) : loadError ? (
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="max-w-md text-center">
              <p className="text-sm text-rose-300">{loadError}</p>

              <button
                type="button"
                onClick={() => {
                  setLoadError("");
                  setIsLoading(true);

                  void getInstructorApplicationFormData()
                    .then((data) => {
                      setForm((previous) => ({
                        ...previous,
                        full_name: data.full_name ?? "",
                        email: data.email ?? "",
                        profile_image: data.profile_image ?? null,
                        occupation: data.occupation ?? "",
                        education: data.education ?? "",
                        location: data.location ?? "",
                        github_url: data.github_url ?? "",
                        linkedin_url: data.linkedin_url ?? "",
                        portfolio_url: data.portfolio_url ?? "",
                      }));
                    })
                    .catch(() => {
                      setLoadError(
                        "Unable to load your profile information. Please try again.",
                      );
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
                className="mt-5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
              {/* PERSONAL INFORMATION */}
              <div className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <UserRound className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Personal information
                    </h3>

                    <p className="mt-0.5 text-xs text-zinc-500">
                      Update your full name and picture.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  {/* Profile Picture */}
                  <div className="flex w-full flex-col items-center gap-3 sm:w-28">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt={form.full_name || "Profile"}
                        className="h-24 w-24 rounded-2xl border border-white/10 object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-blue-500/10 text-2xl font-semibold text-blue-300">
                        {form.full_name
                          ? form.full_name
                              .split(" ")
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((name) => name[0])
                              .join("")
                              .toUpperCase()
                          : "U"}
                      </div>
                    )}

                    <button
                      type="button"
                      className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                    >
                      Change photo
                    </button>
                  </div>

                  {/* Personal Details */}
                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Full name
                      <input
                        className={inputClass}
                        value={form.full_name}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            full_name: e.target.value,
                          }))
                        }
                        placeholder="Enter your full name"
                      />
                    </label>

                    <label className={labelClass}>
                      Email
                      <input
                        className={`${inputClass} cursor-not-allowed opacity-60`}
                        value={form.email}
                        readOnly
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* PROFESSIONAL INFORMATION */}
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
                    Occupation
                    <input
                      className={inputClass}
                      value={form.occupation}
                      onChange={(e) =>
                        updateField("occupation", e.target.value)
                      }
                      placeholder="e.g. Full-stack developer"
                      maxLength={150}
                    />
                  </label>

                  <label className={labelClass}>
                    Education
                    <input
                      className={inputClass}
                      value={form.education}
                      onChange={(e) => updateField("education", e.target.value)}
                      placeholder="e.g. B.Sc. Computer Science"
                      maxLength={200}
                    />
                  </label>

                  <label className={labelClass}>
                    Years of experience
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10`}
                        value={form.years_of_experience}
                        onChange={(e) =>
                          updateField("years_of_experience", e.target.value)
                        }
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
                    Phone number
                    <input
                      className={inputClass}
                      type="tel"
                      value={form.phone_number}
                      onChange={(e) =>
                        updateField("phone_number", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      maxLength={20}
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

                {/* CATEGORIES */}

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <label className={labelClass}>
                      Categories you want to teach
                    </label>

                    <span className="text-xs text-zinc-500">
                      {form.categories_to_teach.length}/10 selected
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-500">
                    Choose up to 10 Categories.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {CategoryOptions.map((category) => {
                      const selected =
                        form.categories_to_teach.includes(category);

                      return (
                        <button
                          type="button"
                          aria-pressed={selected}
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                            selected
                              ? "border-blue-400/50 bg-blue-500/15 text-blue-200"
                              : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {selected ? "✓ " : "+ "}
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* ABOUT YOU */}
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
                  Short professional bio
                  <textarea
                    className={`${inputClass} min-h-28 resize-none`}
                    value={form.short_bio}
                    onChange={(e) => updateField("short_bio", e.target.value)}
                    placeholder="Share your background, skills, and what makes your teaching approach unique..."
                    maxLength={1000}
                  />
                  <span className="mt-1 block text-right text-xs text-zinc-600">
                    {form.short_bio.length}/1000
                  </span>
                </label>
              </div>
              {/* PROFESSIONAL LINKS */}
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
                      Add links to showcase your professional work.
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
                    Portfolio
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
              {/* APPLICATION */}

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
                  Why do you want to become an instructor?
                  <textarea
                    className={`${inputClass} min-h-32 resize-none`}
                    value={form.motivation}
                    onChange={(e) => updateField("motivation", e.target.value)}
                    placeholder="What motivates you to teach, and how would you help learners succeed?"
                    maxLength={2000}
                  />
                  <span className="mt-1 block text-right text-xs text-zinc-600">
                    {form.motivation.length}/2000
                  </span>
                </label>

                {/* RESUME / CV */}
                <div className="mt-5">
                  <label className={labelClass}>Resume / CV</label>

                  <label
                    className={`mt-2 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed ${
                      resumeError
                        ? "border-rose-400/50 bg-rose-400/[0.03]"
                        : "border-white/15 bg-[#101116] hover:border-blue-400/50 hover:bg-blue-500/[0.03]"
                    } px-5 py-7 text-center transition`}
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
                        ? `${(resume.size / (1024 * 1024)).toFixed(2)} MB · Ready`
                        : "PDF, DOC, or DOCX · Max 5 MB"}
                    </span>
                  </label>

                  {resumeError && (
                    <p className="mt-2 text-xs text-rose-300">{resumeError}</p>
                  )}
                </div>

                {/* SUPPORTING FILES */}
                <div className="mt-6">
                  <label className={labelClass}>Supporting files</label>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Add certificates or other relevant documents.
                  </p>

                  <label
                    className={`mt-3 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed ${
                      supportingFilesError
                        ? "border-rose-400/50 bg-rose-400/[0.03]"
                        : "border-white/15 bg-[#101116] hover:border-blue-400/50 hover:bg-blue-500/[0.03]"
                    } px-5 py-7 text-center transition`}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className="sr-only"
                      onChange={(event) => {
                        handleSupportingFilesChange(event.target.files);
                        event.target.value = "";
                      }}
                    />

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-300">
                      <UploadCloud className="h-5 w-5" />
                    </div>

                    <span className="mt-3 text-sm font-medium text-white">
                      Choose supporting files
                    </span>

                    <span className="mt-1 text-xs text-zinc-500">
                      PDF, DOC, DOCX, PNG, or JPG · Up to 5 files · 5 MB each
                    </span>
                  </label>

                  {supportingFilesError && (
                    <p className="mt-2 text-xs text-rose-300">
                      {supportingFilesError}
                    </p>
                  )}

                  {supportingFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {supportingFiles.map((file) => (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
                        >
                          <FileText className="h-4 w-4 shrink-0 text-blue-300" />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-zinc-200">
                              {file.name}
                            </p>

                            <p className="text-xs text-zinc-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeSupportingFile(file.name)}
                            aria-label={`Remove ${file.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* TERMS */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <input
                  type="checkbox"
                  checked={form.terms_accepted}
                  onChange={(e) =>
                    updateField("terms_accepted", e.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-blue-500"
                />

                <span className="text-xs leading-6 text-zinc-400">
                  I confirm that the information provided is accurate and agree
                  to the instructor application review process and platform
                  terms.
                </span>
              </label>
            </div>

            {/* FOOTER */}

            <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/10 bg-[#0B0C11]/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-center text-[11px] text-zinc-500 sm:text-left">
                Shared information will be updated in your student profile after
                your application is approved.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="flex-1 cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 sm:flex-none"
                >
                  Submit application
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </footer>
          </div>
        )}
      </section>
    </div>
  );
};

export default InstructorApplicationModal;
