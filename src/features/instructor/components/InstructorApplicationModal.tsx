import { useEffect, useState } from "react";
import { z } from "zod";

import {
  createInstructorApplication,
  getInstructorApplicationFormData,
  type InstructorApplicationCategory,
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
  Plus,
  Check,
} from "lucide-react";

const DEFAULT_PROFILE_IMAGE = "/media/profile_images/default_profile.png";

const hasRepeatedSpecialCharacter = (value: string): boolean => {
  return /[^\p{L}\p{N}\s]{3,}/u.test(value);
};

const applicationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .refine(
      (value) => !/\s{2,}/.test(value),
      "Please don't enter multiple spaces between names",
    )
    .regex(
      /^[\p{L}]+(?:\s[\p{L}]+)*$/u,
      "Full name can contain only letters and spaces",
    ),

  profile_image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .refine((value) => value !== null && value !== "", {
      message: "Please upload your profile picture.",
    })
    .refine(
      (value) =>
        !(value instanceof File) ||
        ["image/jpeg", "image/png", "image/webp"].includes(value.type),
      {
        message: "Please choose a JPG, PNG, or WebP image.",
      },
    )
    .refine(
      (value) => !(value instanceof File) || value.size <= 5 * 1024 * 1024,
      {
        message: "Profile image must be 5 MB or smaller.",
      },
    ),

  occupation: z
    .string()
    .trim()
    .min(1, "Occupation is required")
    .min(3, "Occupation must be at least 3 characters")
    .max(100, "Occupation is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated 3 or more times consecutively",
    ),

  education: z
    .string()
    .trim()
    .min(1, "Education is required")
    .min(3, "Education must be at least 3 characters")
    .max(150, "Education is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated 3 or more times consecutively",
    ),

  years_of_experience: z
    .string()
    .min(1, "Please select your years of experience"),

  short_bio: z
    .string()
    .trim()
    .min(1, "Short bio is required")
    .min(10, "Short bio must be at least 10 characters")
    .max(500, "Short bio cannot exceed 500 characters")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated consecutively",
    ),

  phone_number: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "You cannot use 3 or more special characters consecutively",
    ),

  linkedin_url: z
    .string()
    .trim()
    .min(1, "LinkedIn URL is required")
    .url("Enter a valid LinkedIn URL")
    .refine((value) => {
      try {
        const url = new URL(value);
        return (
          url.protocol === "https:" &&
          (url.hostname === "linkedin.com" ||
            url.hostname === "www.linkedin.com")
        );
      } catch {
        return false;
      }
    }, "LinkedIn URL must be from linkedin.com"),

  github_url: z
    .string()
    .trim()
    .min(1, "GitHub URL is required")
    .url("Enter a valid GitHub URL")
    .refine((value) => {
      try {
        const url = new URL(value);
        return (
          url.protocol === "https:" &&
          (url.hostname === "github.com" || url.hostname === "www.github.com")
        );
      } catch {
        return false;
      }
    }, "GitHub URL must be from github.com"),

  portfolio_url: z
    .string()
    .trim()
    .min(1, "Portfolio URL is required")
    .url("Enter a valid portfolio URL")
    .refine((value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    }, "Portfolio URL must use HTTPS"),

  motivation: z
    .string()
    .trim()
    .min(1, "Motivation is required")
    .min(10, "Motivation must be at least 10 characters")
    .max(1000, "Motivation cannot exceed 1000 characters")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated 3 or more times consecutively",
    ),

  terms_accepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms before submitting.",
  }),
});

type ValidationField = keyof z.infer<typeof applicationSchema>;
type ValidationErrors = Partial<
  Record<
    | ValidationField
    | "categories"
    | "resume"
    | "terms_accepted"
    | "supporting_files",
    string
  >
>;

const experienceOptions = [
  { value: "less_than_one", label: "Less than 1 year" },
  { value: "one_to_three", label: "1–3 years" },
  { value: "three_to_five", label: "3–5 years" },
  { value: "five_to_ten", label: "5–10 years" },
  { value: "ten_plus", label: "10+ years" },
];

type ApplicationForm = {
  full_name: string;
  email: string;
  profile_image: string | null;

  occupation: string;
  education: string;
  years_of_experience: string;
  categories_to_teach: number[];
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
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const [profileImageError, setProfileImageError] = useState("");
  const [categories, setCategories] = useState<InstructorApplicationCategory[]>(
    [],
  );
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [isDraggingResume, setIsDraggingResume] = useState(false);

  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [supportingFilesError, setSupportingFilesError] = useState("");
  const [isDraggingSupporting, setIsDraggingSupporting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

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
          full_name: data.user.full_name ?? "",
          email: data.user.email ?? "",
          profile_image:
            data.user.profile_image === DEFAULT_PROFILE_IMAGE
              ? null
              : (data.user.profile_image ?? null),
          occupation: data.user.occupation ?? "",
          education: data.user.education ?? "",
          location: data.user.location ?? "",
          github_url: data.user.github_url ?? "",
          linkedin_url: data.user.linkedin_url ?? "",
          portfolio_url: data.user.portfolio_url ?? "",
        }));

        // This was missing
        setCategories(data.categories);
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

    if (field === "categories_to_teach") {
      return;
    }

    if (field in applicationSchema.shape) {
      const nextForm = { ...form, [field]: value };
      const result = applicationSchema.safeParse(nextForm);
      const issue = result.success
        ? undefined
        : result.error.issues.find((item) => item.path[0] === field);

      setValidationErrors((previous) => {
        const next = { ...previous };

        if (issue) {
          next[field as ValidationField] = issue.message;
        } else {
          delete next[field as ValidationField];
        }

        return next;
      });
    }
  };

  const handleProfileImageChange = (file?: File) => {
    setProfileImageError("");

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setProfileImageError("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxFileSize) {
      setProfileImageError("Profile image must be 5 MB or smaller.");
      return;
    }

    setProfileImageFile(file);
    setValidationErrors((previous) => {
      const next = { ...previous };
      delete next.profile_image;
      return next;
    });

    const previewUrl = URL.createObjectURL(file);
    setProfileImagePreview(previewUrl);
  };

  const handleResumeChange = (file?: File) => {
    setResumeError("");
    setValidationErrors((previous) => {
      const next = { ...previous };
      delete next.resume;
      return next;
    });

    if (!file) {
      setResume(null);
      return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (!allowedExtensions.test(file.name)) {
      setResumeError("Please choose a PDF, DOC, or DOCX file.");
      setValidationErrors((previous) => ({
        ...previous,
        resume: "Please choose a PDF, DOC, or DOCX file.",
      }));
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError("Your resume must be 5 MB or smaller.");
      setValidationErrors((previous) => ({
        ...previous,
        resume: "Your resume must be 5 MB or smaller.",
      }));
      setResume(null);
      return;
    }

    setResume(file);
    setValidationErrors((previous) => {
      const next = { ...previous };
      delete next.resume;
      return next;
    });
  };

  const handleSupportingFilesChange = (files: FileList | null) => {
    setSupportingFilesError("");
    setValidationErrors((previous) => {
      const next = { ...previous };
      delete next.supporting_files;
      return next;
    });

    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    const allowedExtensions = /\.(pdf|doc|docx|png|jpe?g)$/i;
    const maxFileSize = 5 * 1024 * 1024;

    // Check total file count
    if (supportingFiles.length + selectedFiles.length > 5) {
      const message = `You can upload up to 5 supporting files. You already selected ${supportingFiles.length}.`;
      setSupportingFilesError(message);
      setValidationErrors((previous) => ({
        ...previous,
        supporting_files: message,
      }));
      return;
    }

    // Validate each file
    const invalidFile = selectedFiles.find(
      (file) => !allowedExtensions.test(file.name) || file.size > maxFileSize,
    );

    if (invalidFile) {
      const message =
        "Each file must be PDF, DOC, DOCX, PNG, or JPG and 5 MB or smaller.";
      setSupportingFilesError(message);
      setValidationErrors((previous) => ({
        ...previous,
        supporting_files: message,
      }));
      return;
    }

    // Prevent duplicate files
    const newFiles = selectedFiles.filter(
      (newFile) =>
        !supportingFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size,
        ),
    );

    setSupportingFiles((previous) => [...previous, ...newFiles]);
  };

  const removeSupportingFile = (fileName: string) => {
    setSupportingFiles((previous) =>
      previous.filter((file) => file.name !== fileName),
    );

    setSupportingFilesError("");
  };

  const resetForm = () => {
    setForm(initialApplicationForm);

    setProfileImageFile(null);

    if (profileImagePreview) {
      URL.revokeObjectURL(profileImagePreview);
    }

    setProfileImagePreview(null);
    setProfileImageError("");

    setResume(null);
    setResumeError("");

    setSupportingFiles([]);
    setSupportingFilesError("");

    setLoadError("");
    setValidationErrors({});
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const validationData = {
      ...form,
      profile_image: profileImageFile ?? form.profile_image,
    };

    const result = applicationSchema.safeParse(validationData);
    const nextErrors: ValidationErrors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as ValidationField | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
    }

    if (form.categories_to_teach.length === 0) {
      nextErrors.categories = "Select at least one category.";
    } else if (form.categories_to_teach.length > 10) {
      nextErrors.categories = "You can select up to 10 categories.";
    }

    if (!resume) {
      nextErrors.resume = "Please upload your resume.";
    }

    if (supportingFiles.length === 0) {
      nextErrors.supporting_files =
        "Please upload at least one supporting file.";
    } else if (supportingFiles.length > 5) {
      nextErrors.supporting_files = "You can upload up to 5 supporting files.";
    }

    setValidationErrors(nextErrors);

    setResumeError(nextErrors.resume ?? "");
    setSupportingFilesError(nextErrors.supporting_files ?? "");

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoadError("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("full_name", form.full_name.trim());
      formData.append("occupation", form.occupation.trim());
      formData.append("education", form.education.trim());
      formData.append("years_of_experience", form.years_of_experience);

      form.categories_to_teach.forEach((categoryId) => {
        formData.append("categories_to_teach", String(categoryId));
      });

      formData.append("short_bio", form.short_bio.trim());
      formData.append("phone_number", form.phone_number.trim());
      formData.append("location", form.location.trim());
      formData.append("linkedin_url", form.linkedin_url.trim());
      formData.append("github_url", form.github_url.trim());
      formData.append("portfolio_url", form.portfolio_url.trim());
      formData.append("motivation", form.motivation.trim());
      formData.append("terms_accepted", String(form.terms_accepted));

      if (profileImageFile) {
        formData.append("profile_image", profileImageFile);
      }

      formData.append("resume", resume!);

      supportingFiles.forEach((file) => {
        formData.append("supporting_files", file);
      });

      const response = await createInstructorApplication(formData);

      console.log("Application submitted:", response);

      closeAndReset();
    } catch (error) {
      console.error("Failed to submit instructor application:", error);

      setLoadError("Unable to submit your application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (field: ValidationField): string =>
    validationErrors[field]
      ? `${inputClass} border-rose-400/60 focus:border-rose-400 focus:ring-rose-500/15`
      : inputClass;

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#0D0F15] px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-zinc-600 hover:border-white/20 focus:border-blue-500 focus:bg-[#0F1218] focus:ring-4 focus:ring-blue-500/15";

  const labelClass = "block text-sm font-medium text-zinc-300";

  const fieldError = (
    field: ValidationField | "categories" | "terms_accepted",
  ) =>
    validationErrors[field] ? (
      <p className="mt-1 text-xs text-rose-300">{validationErrors[field]}</p>
    ) : null;

  const sectionClass =
    "flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6";

  const iconTileClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-blue-300 shadow-[0_0_20px_-6px_rgba(59,130,246,0.6)]";

  const profileImageUrl =
    form.profile_image && form.profile_image !== DEFAULT_PROFILE_IMAGE
      ? `http://localhost:8000${form.profile_image}`
      : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md sm:p-5"
      role="presentation"
    >
      <section
        aria-labelledby="application-modal-title"
        aria-modal="true"
        role="dialog"
        className="relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#0A0B10] shadow-2xl shadow-blue-950/40 ring-1 ring-blue-500/10 sm:h-[min(92vh,900px)] sm:max-w-5xl sm:rounded-3xl"
      >
        {/* Ambient blue glows */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />

        {/* Top gradient accent line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

        <header className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-b from-blue-500/[0.06] to-transparent px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3.5">
            <div className={iconTileClass}>
              <BriefcaseBusiness className="h-4.5 w-4.5" />
            </div>

            <div>
              <h2
                id="application-modal-title"
                className="text-[15px] font-semibold tracking-tight text-white"
              >
                Application to become an instructor
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Tell us about your experience and teaching expertise.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close application form"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-blue-500/15 border-t-blue-400" />
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
                        full_name: data.user.full_name ?? "",
                        email: data.user.email ?? "",
                        profile_image:
                          data.user.profile_image === DEFAULT_PROFILE_IMAGE
                            ? null
                            : (data.user.profile_image ?? null),
                        occupation: data.user.occupation ?? "",
                        education: data.user.education ?? "",
                        location: data.user.location ?? "",
                        github_url: data.user.github_url ?? "",
                        linkedin_url: data.user.linkedin_url ?? "",
                        portfolio_url: data.user.portfolio_url ?? "",
                      }));

                      setCategories(data.categories);
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
                className="mt-5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:from-blue-400 hover:to-blue-500"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="lp-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
              {/* PERSONAL INFORMATION */}
              <div className={sectionClass}>
                <div className="mb-6 flex items-center gap-3">
                  <div className={iconTileClass}>
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
                    {profileImagePreview || profileImageUrl ? (
                      <img
                        src={profileImagePreview || profileImageUrl || ""}
                        alt={form.full_name || "Profile"}
                        className="h-24 w-24 rounded-2xl border border-blue-400/20 object-cover shadow-lg shadow-blue-950/40 ring-2 ring-blue-500/10"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-2xl font-semibold text-blue-200 shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]">
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

                    <label
                      htmlFor="profile-image-upload"
                      className="cursor-pointer rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition-all hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-300"
                    >
                      Change photo
                    </label>

                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => {
                        handleProfileImageChange(event.target.files?.[0]);

                        // Allows selecting the same image again.
                        event.target.value = "";
                      }}
                    />
                    {(profileImageError || validationErrors.profile_image) && (
                      <p className="text-center text-xs text-rose-300">
                        {profileImageError || validationErrors.profile_image}
                      </p>
                    )}
                  </div>

                  {/* Personal Details */}
                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Full name
                      <input
                        className={getInputClass("full_name")}
                        value={form.full_name}
                        onChange={(e) =>
                          updateField("full_name", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                      {fieldError("full_name")}
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
                  <div className={iconTileClass}>
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

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className={labelClass}>
                    Occupation
                    <input
                      className={getInputClass("occupation")}
                      value={form.occupation}
                      onChange={(e) =>
                        updateField("occupation", e.target.value)
                      }
                      placeholder="e.g. Full-stack developer"
                      maxLength={150}
                    />
                    {fieldError("occupation")}
                  </label>

                  <label className={labelClass}>
                    Education
                    <input
                      className={getInputClass("education")}
                      value={form.education}
                      onChange={(e) => updateField("education", e.target.value)}
                      placeholder="e.g. B.Sc. Computer Science"
                      maxLength={200}
                    />
                    {fieldError("education")}
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
                            className="bg-[#0D0F15]"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300/70" />
                    </div>
                    {fieldError("years_of_experience")}
                  </label>

                  <label className={labelClass}>
                    Phone number
                    <input
                      className={getInputClass("phone_number")}
                      type="tel"
                      value={form.phone_number}
                      onChange={(e) =>
                        updateField("phone_number", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      maxLength={20}
                    />
                    {fieldError("phone_number")}
                  </label>

                  <label
                    className={`${labelClass} sm:col-span-2 lg:col-span-2`}
                  >
                    Location
                    <input
                      className={getInputClass("location")}
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="City, country"
                      maxLength={150}
                    />
                    {fieldError("location")}
                  </label>
                </div>

                {/* CATEGORIES */}

                <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#0D0F15]/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <label className={labelClass}>
                      Categories you want to teach
                    </label>

                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-200">
                      {form.categories_to_teach.length}/{categories.length}{" "}
                      selected
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-500">
                    Pick the categories you specialize in.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {categories.map((category) => {
                      const selected = form.categories_to_teach.includes(
                        category.id,
                      );

                      return (
                        <button
                          key={category.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            setForm((previous) => {
                              const alreadySelected =
                                previous.categories_to_teach.includes(
                                  category.id,
                                );

                              if (
                                !alreadySelected &&
                                previous.categories_to_teach.length >= 10
                              ) {
                                return previous;
                              }

                              return {
                                ...previous,
                                categories_to_teach: alreadySelected
                                  ? previous.categories_to_teach.filter(
                                      (id) => id !== category.id,
                                    )
                                  : [
                                      ...previous.categories_to_teach,
                                      category.id,
                                    ],
                              };
                            });

                            setValidationErrors((previous) => {
                              const next = { ...previous };
                              delete next.categories;
                              return next;
                            });
                          }}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                            selected
                              ? "border-blue-400/60 bg-blue-500/20 text-blue-100 shadow-[0_0_14px_-4px_rgba(59,130,246,0.7)]"
                              : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-blue-400/40 hover:bg-blue-500/[0.06] hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              selected
                                ? "border-blue-300/60 bg-blue-400/20"
                                : "border-zinc-600 bg-white/[0.03]"
                            }`}
                          >
                            {selected ? (
                              <Check className="h-2.5 w-2.5" />
                            ) : (
                              <Plus className="h-2.5 w-2.5" />
                            )}
                          </span>

                          {category.name}
                        </button>
                      );
                    })}
                    {fieldError("categories")}
                  </div>
                </div>
              </div>

              {/* ABOUT YOU + PROFESSIONAL LINKS (side by side on large screens) */}
              <div className="grid gap-5 lg:grid-cols-2">
                {/* ABOUT YOU */}
                <div className={sectionClass}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className={iconTileClass}>
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

                  <label className={`${labelClass} flex flex-1 flex-col`}>
                    Short professional bio
                    <textarea
                      className={`${getInputClass("short_bio")} min-h-28 flex-1 resize-none`}
                      value={form.short_bio}
                      onChange={(e) => updateField("short_bio", e.target.value)}
                      placeholder="Share your background, skills, and what makes your teaching approach unique..."
                      maxLength={1000}
                    />
                    <span className="mt-1 block text-right text-xs text-zinc-600">
                      {form.short_bio.length}/1000
                    </span>
                    {fieldError("short_bio")}
                  </label>
                </div>

                {/* PROFESSIONAL LINKS */}
                <div className={sectionClass}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className={iconTileClass}>
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

                  <div className="grid gap-4">
                    <label className={labelClass}>
                      LinkedIn URL
                      <input
                        className={getInputClass("linkedin_url")}
                        type="url"
                        value={form.linkedin_url}
                        onChange={(e) =>
                          updateField("linkedin_url", e.target.value)
                        }
                        placeholder="https://linkedin.com/in/you"
                        maxLength={255}
                      />
                      {fieldError("linkedin_url")}
                    </label>

                    <label className={labelClass}>
                      GitHub URL
                      <input
                        className={getInputClass("github_url")}
                        type="url"
                        value={form.github_url}
                        onChange={(e) =>
                          updateField("github_url", e.target.value)
                        }
                        placeholder="https://github.com/you"
                        maxLength={255}
                      />
                      {fieldError("github_url")}
                    </label>

                    <label className={labelClass}>
                      Portfolio
                      <input
                        className={getInputClass("portfolio_url")}
                        type="url"
                        value={form.portfolio_url}
                        onChange={(e) =>
                          updateField("portfolio_url", e.target.value)
                        }
                        placeholder="https://yourportfolio.com"
                        maxLength={255}
                      />
                      {fieldError("portfolio_url")}
                    </label>
                  </div>
                </div>
              </div>

              {/* APPLICATION */}

              <div className={sectionClass}>
                <div className="mb-5 flex items-center gap-3">
                  <div className={iconTileClass}>
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
                    className={`${getInputClass("motivation")} min-h-32 resize-none`}
                    value={form.motivation}
                    onChange={(e) => updateField("motivation", e.target.value)}
                    placeholder="What motivates you to teach, and how would you help learners succeed?"
                    maxLength={1000}
                  />
                  <span className="mt-1 block text-right text-xs text-zinc-600">
                    {form.motivation.length}/1000
                  </span>
                  {fieldError("motivation")}
                </label>

                {/* ───────────────────────────────────────────────
                    DOCUMENTS — Resume + Supporting files
                    Stacked full-width so the supporting files lay
                    out as a grid of resume-style "ready" cards.
                   ─────────────────────────────────────────────── */}
                <div className="mt-6 space-y-6">
                  {/* RESUME / CV */}
                  <div className="flex flex-col">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <label className={labelClass}>Resume / CV</label>

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          Upload your latest resume or CV.
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          resume
                            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                            : "border-blue-400/20 bg-blue-500/10 text-blue-200"
                        }`}
                      >
                        {resume ? "Attached" : "Required"}
                      </span>
                    </div>

                    {resume ? (
                      /* Selected resume */
                      <div className="mt-3 rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/[0.08] to-white/[0.02] p-4 shadow-[0_0_25px_-12px_rgba(59,130,246,0.5)]">
                        <div className="flex items-center gap-4">
                          {/* File icon */}
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                            <FileText className="h-6 w-6" />
                          </div>

                          {/* File information */}
                          <div className="min-w-0 flex-1">
                            <p
                              className="truncate text-sm font-medium text-white"
                              title={resume.name}
                            >
                              {resume.name}
                            </p>

                            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                              <span>
                                {resume.name.split(".").pop()?.toUpperCase()}{" "}
                                file
                              </span>

                              <span className="text-zinc-700">•</span>

                              <span>
                                {(resume.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Ready to submit</span>
                            </div>
                          </div>

                          {/* Remove resume */}
                          <button
                            type="button"
                            onClick={() => {
                              setResume(null);
                              setResumeError("Please upload your resume.");
                              setValidationErrors((previous) => ({
                                ...previous,
                                resume: "Please upload your resume.",
                              }));
                            }}
                            aria-label="Remove resume"
                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Change resume */}
                        <label
                          htmlFor="resume-upload"
                          className="mt-4 flex cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
                        >
                          Change resume
                        </label>

                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(event) => {
                            handleResumeChange(event.target.files?.[0]);
                            event.target.value = "";
                          }}
                        />
                      </div>
                    ) : (
                      /* Upload / drag & drop */
                      <div
                        onDragOver={(event) => {
                          event.preventDefault();
                          setIsDraggingResume(true);
                        }}
                        onDragEnter={(event) => {
                          event.preventDefault();
                          setIsDraggingResume(true);
                        }}
                        onDragLeave={(event) => {
                          event.preventDefault();
                          setIsDraggingResume(false);
                        }}
                        onDrop={(event) => {
                          event.preventDefault();
                          setIsDraggingResume(false);

                          const file = event.dataTransfer.files?.[0];

                          if (file) {
                            handleResumeChange(file);
                          }
                        }}
                        className={`group mt-3 flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 text-center transition ${
                          resumeError
                            ? "border-rose-400/50 bg-rose-400/[0.03]"
                            : isDraggingResume
                              ? "border-blue-400 bg-blue-500/[0.08] shadow-[0_0_25px_-8px_rgba(59,130,246,0.8)]"
                              : "border-white/15 bg-[#0D0F15] hover:border-blue-400/60 hover:bg-blue-500/[0.05]"
                        }`}
                      >
                        {/* Upload icon */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                            isDraggingResume
                              ? "border-blue-400/50 bg-blue-500/20 text-blue-200"
                              : "border-white/10 bg-white/[0.04] text-blue-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/10"
                          }`}
                        >
                          <UploadCloud className="h-5 w-5" />
                        </div>

                        {/* Upload text */}
                        <span className="mt-3 text-sm font-medium text-white">
                          {isDraggingResume
                            ? "Drop your resume here"
                            : "Drag & drop your resume here"}
                        </span>

                        <span className="mt-1 text-xs text-zinc-500">
                          PDF, DOC, or DOCX · Max 5 MB
                        </span>

                        {/* Select button */}
                        <label
                          htmlFor="resume-upload"
                          className="mt-4 cursor-pointer rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-300"
                        >
                          Select resume
                        </label>

                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(event) => {
                            handleResumeChange(event.target.files?.[0]);
                            event.target.value = "";
                          }}
                        />
                      </div>
                    )}

                    {/* Resume error */}
                    {resumeError && (
                      <p className="mt-2 text-xs text-rose-300">
                        {resumeError}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* SUPPORTING FILES */}
                  <div className="flex flex-col">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <label className={labelClass}>Supporting files</label>

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          Add certificates or other relevant documents.
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          supportingFiles.length >= 5
                            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                            : "border-blue-400/20 bg-blue-500/10 text-blue-200"
                        }`}
                      >
                        {supportingFiles.length}/5 files
                      </span>
                    </div>

                    {/* Drop zone — hidden once the limit is reached */}
                    {supportingFiles.length < 5 && (
                      <div
                        onDragOver={(event) => {
                          event.preventDefault();
                          setIsDraggingSupporting(true);
                        }}
                        onDragEnter={(event) => {
                          event.preventDefault();
                          setIsDraggingSupporting(true);
                        }}
                        onDragLeave={(event) => {
                          event.preventDefault();
                          setIsDraggingSupporting(false);
                        }}
                        onDrop={(event) => {
                          event.preventDefault();
                          setIsDraggingSupporting(false);

                          handleSupportingFilesChange(event.dataTransfer.files);
                        }}
                        className={`group mt-3 flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-7 text-center transition ${
                          supportingFilesError
                            ? "border-rose-400/50 bg-rose-400/[0.03]"
                            : isDraggingSupporting
                              ? "border-blue-400 bg-blue-500/[0.08] shadow-[0_0_25px_-8px_rgba(59,130,246,0.8)]"
                              : "border-white/15 bg-[#0D0F15] hover:border-blue-400/60 hover:bg-blue-500/[0.05]"
                        }`}
                      >
                        {/* Upload icon */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                            isDraggingSupporting
                              ? "border-blue-400/50 bg-blue-500/20 text-blue-200"
                              : "border-white/10 bg-white/[0.04] text-blue-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/10"
                          }`}
                        >
                          <UploadCloud className="h-5 w-5" />
                        </div>

                        {/* Upload text */}
                        <span className="mt-3 text-sm font-medium text-white">
                          {isDraggingSupporting
                            ? "Drop your files here"
                            : "Drag & drop your files here"}
                        </span>

                        <span className="mt-1 text-xs text-zinc-500">
                          PDF, DOC, DOCX, PNG, or JPG · Up to 5 files · 5 MB
                          each
                        </span>

                        {/* Select files button */}
                        <label
                          htmlFor="supporting-files-upload"
                          className="mt-4 cursor-pointer rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-300"
                        >
                          Select files
                        </label>

                        {/* Hidden file input */}
                        <input
                          id="supporting-files-upload"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(event) => {
                            handleSupportingFilesChange(event.target.files);

                            // Allows selecting the same file again.
                            event.target.value = "";
                          }}
                        />
                      </div>
                    )}

                    {/* Error */}
                    {supportingFilesError && (
                      <p className="mt-2 text-xs text-rose-300">
                        {supportingFilesError}
                      </p>
                    )}

                    {/* Selected files — resume-style cards in a responsive grid */}
                    {supportingFiles.length > 0 && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {supportingFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${file.size}-${index}`}
                            className="group/file flex flex-col rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/[0.08] to-white/[0.02] p-4 shadow-[0_0_25px_-14px_rgba(59,130,246,0.5)] transition hover:border-blue-400/40"
                          >
                            <div className="flex items-start gap-3">
                              {/* File icon */}
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                                <FileText className="h-5 w-5" />
                              </div>

                              {/* File information */}
                              <div className="min-w-0 flex-1">
                                <p
                                  className="truncate text-sm font-medium text-white"
                                  title={file.name}
                                >
                                  {file.name}
                                </p>

                                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                                  <span>
                                    {file.name.split(".").pop()?.toUpperCase()}{" "}
                                    file
                                  </span>

                                  <span className="text-zinc-700">•</span>

                                  <span>
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </span>
                                </div>
                              </div>

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() => removeSupportingFile(file.name)}
                                aria-label={`Remove ${file.name}`}
                                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Ready badge */}
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Ready to submit</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* TERMS */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-gradient-to-b from-blue-500/[0.05] to-white/[0.01] p-4 transition hover:border-blue-400/25">
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
                  {validationErrors.terms_accepted && (
                    <span className="mt-1 block text-xs text-rose-300">
                      {validationErrors.terms_accepted}
                    </span>
                  )}
                </span>
              </label>
            </div>

            {/* FOOTER */}

            <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/10 bg-gradient-to-t from-blue-500/[0.05] to-[#0A0B10]/95 px-5 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-center text-[11px] text-zinc-500 sm:text-left">
                Make sure your details are accurate. Our team will review your
                application and notify you of the outcome.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="flex-1 cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 ring-1 ring-blue-400/30 transition hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-900/50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                >
                  <span className="flex h-5 min-w-[150px] items-center justify-center">
                    {isLoading ? (
                      <span
                        className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-label="Submitting"
                      />
                    ) : (
                      <>
                        <span>Submit application</span>

                        <span
                          aria-hidden="true"
                          className="ml-2 transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </>
                    )}
                  </span>
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
