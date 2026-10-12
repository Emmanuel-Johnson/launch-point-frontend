import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import {
  Briefcase,
  Camera,
  Check,
  GraduationCap,
  Link as LinkIcon,
  LoaderCircle,
  MapPin,
  Plus,
  User,
  X,
} from "lucide-react";

import {
  updateInstructorProfile,
  type InstructorProfile,
} from "../api/instructorProfileApi";
import {
  getInstructorApplicationFormData,
  type InstructorApplicationCategory,
} from "../api/instructorApplicationApi";

const MEDIA_BASE_URL = "http://localhost:8000";
const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

const EXPERIENCE_OPTIONS = [
  { value: "less_than_one", label: "Less than 1 year" },
  { value: "one_to_three", label: "1–3 years" },
  { value: "three_to_five", label: "3–5 years" },
  { value: "five_to_ten", label: "5–10 years" },
  { value: "ten_plus", label: "10+ years" },
] as const;

interface EditInstructorProfileModalProps {
  profile: InstructorProfile;
  onClose: () => void;
  onSaved: (profile: InstructorProfile) => void;
}

interface FormValues {
  full_name: string;
  occupation: string;
  professional_bio: string;
  education: string;
  location: string;
  years_of_experience: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
}

const resolveImage = (path: string | null): string | null => {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${MEDIA_BASE_URL}${path}`;
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getExperienceValue = (experience: string): string => {
  const matchingOption = EXPERIENCE_OPTIONS.find(
    (option) => option.value === experience || option.label === experience,
  );

  return matchingOption?.value ?? "";
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#4D8DFF]/60 focus:ring-2 focus:ring-[#4D8DFF]/10";

const labelClassName = "text-sm font-medium text-white/70";

const EditInstructorProfileModal = ({
  profile,
  onClose,
  onSaved,
}: EditInstructorProfileModalProps) => {
  const [form, setForm] = useState<FormValues>({
    full_name: profile.full_name ?? "",
    occupation: profile.occupation ?? "",
    professional_bio: profile.professional_bio ?? "",
    education: profile.education ?? "",
    location: profile.location ?? "",
    years_of_experience: getExperienceValue(profile.years_of_experience ?? ""),
    linkedin_url: profile.linkedin_url ?? "",
    github_url: profile.github_url ?? "",
    portfolio_url: profile.portfolio_url ?? "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    resolveImage(profile.profile_image),
  );
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Teaching categories
  const [categories, setCategories] = useState<InstructorApplicationCategory[]>(
    [],
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = useRef<string | null>(null);

  // Preserve Escape-key behavior and object-URL cleanup.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);

      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, [isSaving, onClose]);

  // Load categories and preselect the profile's current ones.
  // The profile API returns category names; the update API needs IDs.
  useEffect(() => {
    let isCancelled = false;

    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);

        const data = await getInstructorApplicationFormData();

        if (isCancelled) {
          return;
        }

        setCategories(data.categories);

        const currentCategoryIds = data.categories
          .filter((category) => profile.categories.includes(category.name))
          .map((category) => category.id);

        setSelectedCategoryIds(currentCategoryIds);
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load teaching categories:", error);
          toast.error("Failed to load teaching categories.", {
            containerId: "instructor",
          });
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingCategories(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isCancelled = true;
    };
  }, [profile.categories]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Profile image cannot exceed 5 MB.");
      event.target.value = "";
      return;
    }

    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlRef.current = objectUrl;

    setSelectedImage(file);
    setPreviewImage(objectUrl);
    setRemoveProfileImage(false);
    setImageError(null);

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }

    setSelectedImage(null);
    setPreviewImage(null);
    setRemoveProfileImage(true);
    setImageError(null);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((previous) => {
      const isSelected = previous.includes(categoryId);

      if (isSelected) {
        return previous.filter((id) => id !== categoryId);
      }

      if (previous.length >= 10) {
        toast.error("You can select up to 10 categories.", {
          containerId: "instructor",
        });
        return previous;
      }

      return [...previous, categoryId];
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.full_name.trim()) {
      toast.error("Full name is required.", {
        containerId: "instructor",
      });
      return;
    }

    if (form.professional_bio.trim().length > 1000) {
      toast.error("Professional bio cannot exceed 1000 characters.", {
        containerId: "instructor",
      });
      return;
    }

    if (!form.years_of_experience) {
      toast.error("Please select your years of experience.", {
        containerId: "instructor",
      });
      return;
    }

    if (imageError) {
      toast.error(imageError, {
        containerId: "instructor",
      });
      return;
    }

    try {
      setIsSaving(true);

      const updatedProfile = await updateInstructorProfile({
        full_name: form.full_name.trim(),
        occupation: form.occupation.trim(),
        professional_bio: form.professional_bio.trim(),
        education: form.education.trim(),
        location: form.location.trim(),
        years_of_experience: form.years_of_experience,
        linkedin_url: form.linkedin_url.trim(),
        github_url: form.github_url.trim(),
        portfolio_url: form.portfolio_url.trim(),
        profile_image: selectedImage,
        remove_profile_image: removeProfileImage,
        categories: selectedCategoryIds,
      });

      onSaved(updatedProfile);
    } catch (error) {
      console.error("Failed to update instructor profile:", error);
      toast.error(
        "Failed to update profile. Please check your details and try again.",
        {
          containerId: "instructor",
        },
      );
    } finally {
      setIsSaving(false);
    }
  };

  const initials = getInitials(form.full_name);

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex h-[100dvh] w-screen items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md">
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_100px_rgba(0,0,0,0.75)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-instructor-profile-title"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#4D8DFF]/15 blur-3xl"
        />

        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-[#4D8DFF]">
              Instructor Account
            </p>

            <h2
              id="edit-instructor-profile-title"
              className="text-xl font-semibold text-white"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Update your professional information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit instructor profile"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative flex min-h-0 flex-1 flex-col"
        >
          <div className="relative space-y-7 overflow-y-auto px-6 py-6 sm:px-7">
            {/* Profile photo */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4D8DFF]/10 text-[#6FA3FF] ring-1 ring-inset ring-[#4D8DFF]/20">
                  <Camera className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Profile Photo
                  </h3>
                  <p className="text-xs text-white/35">
                    JPG, PNG or WebP. Maximum size 5 MB.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="shrink-0 rounded-full bg-gradient-to-br from-[#4D8DFF] to-[#38BDF8] p-[2px]">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#0A0A0A]">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4D8DFF] to-[#1D4ED8] text-xl font-semibold text-white">
                      {initials}
                    </div>

                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Instructor profile preview"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    Profile picture
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSaving}
                      className="cursor-pointer rounded-xl border border-[#4D8DFF]/25 bg-[#4D8DFF]/10 px-4 py-2 text-xs font-medium text-[#6FA3FF] transition hover:border-[#4D8DFF]/45 hover:bg-[#4D8DFF]/15 hover:text-white disabled:opacity-40"
                    >
                      {selectedImage ? "Change Photo" : "Choose Photo"}
                    </button>

                    {previewImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={isSaving}
                        className="cursor-pointer rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/50 transition hover:border-red-500/30 hover:text-red-400 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {imageError && (
                    <p className="mt-2 text-xs text-red-400">{imageError}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Personal information */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4D8DFF]/10 text-[#6FA3FF] ring-1 ring-inset ring-[#4D8DFF]/20">
                  <User className="h-4 w-4" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Personal Information
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClassName}>
                  Full Name *
                  <input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    maxLength={150}
                    required
                    disabled={isSaving}
                    className={inputClassName}
                    placeholder="Your full name"
                  />
                </label>

                <label className={labelClassName}>
                  Occupation
                  <span className="relative block">
                    <Briefcase className="absolute left-3 top-5 h-4 w-4 text-white/30" />
                    <input
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      maxLength={150}
                      disabled={isSaving}
                      className={`${inputClassName} pl-10`}
                      placeholder="e.g. Full Stack Developer"
                    />
                  </span>
                </label>

                <label className={labelClassName}>
                  Education
                  <span className="relative block">
                    <GraduationCap className="absolute left-3 top-5 h-4 w-4 text-white/30" />
                    <input
                      name="education"
                      value={form.education}
                      onChange={handleChange}
                      maxLength={200}
                      disabled={isSaving}
                      className={`${inputClassName} pl-10`}
                      placeholder="Your education"
                    />
                  </span>
                </label>

                <label className={labelClassName}>
                  Location
                  <span className="relative block">
                    <MapPin className="absolute left-3 top-5 h-4 w-4 text-white/30" />
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      maxLength={150}
                      disabled={isSaving}
                      className={`${inputClassName} pl-10`}
                      placeholder="Your location"
                    />
                  </span>
                </label>

                <label className={labelClassName}>
                  Years of Experience *
                  <select
                    name="years_of_experience"
                    value={form.years_of_experience}
                    onChange={handleChange}
                    required
                    disabled={isSaving}
                    className={inputClassName}
                  >
                    <option value="" className="bg-[#0A0A0A]">
                      Select experience
                    </option>

                    {EXPERIENCE_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#0A0A0A]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={labelClassName}>
                  Email Address
                  <input
                    value={profile.email}
                    readOnly
                    className={`${inputClassName} cursor-not-allowed text-white/40`}
                  />
                </label>
              </div>
            </section>

            {/* Professional bio */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4D8DFF]/10 text-[#6FA3FF] ring-1 ring-inset ring-[#4D8DFF]/20">
                  <Briefcase className="h-4 w-4" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Professional Bio
                </h3>
              </div>

              <label className={labelClassName}>
                Tell learners about your experience
                <textarea
                  name="professional_bio"
                  value={form.professional_bio}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={5}
                  disabled={isSaving}
                  className={`${inputClassName} resize-none overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20`}
                  placeholder="Introduce yourself and describe your expertise..."
                />
                <span className="mt-1 block text-right text-xs text-white/30">
                  {form.professional_bio.length}/1000
                </span>
              </label>
            </section>

            {/* Social links */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4D8DFF]/10 text-[#6FA3FF] ring-1 ring-inset ring-[#4D8DFF]/20">
                  <LinkIcon className="h-4 w-4" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Professional Links
                </h3>
              </div>

              <div className="space-y-4">
                <label className={labelClassName}>
                  GitHub URL
                  <input
                    type="url"
                    name="github_url"
                    value={form.github_url}
                    onChange={handleChange}
                    maxLength={255}
                    disabled={isSaving}
                    className={inputClassName}
                    placeholder="https://github.com/username"
                  />
                </label>

                <label className={labelClassName}>
                  LinkedIn URL
                  <input
                    type="url"
                    name="linkedin_url"
                    value={form.linkedin_url}
                    onChange={handleChange}
                    maxLength={255}
                    disabled={isSaving}
                    className={inputClassName}
                    placeholder="https://linkedin.com/in/username"
                  />
                </label>

                <label className={labelClassName}>
                  Portfolio URL
                  <input
                    type="url"
                    name="portfolio_url"
                    value={form.portfolio_url}
                    onChange={handleChange}
                    maxLength={255}
                    disabled={isSaving}
                    className={inputClassName}
                    placeholder="https://your-portfolio.com"
                  />
                </label>
              </div>
            </section>

            {/* Editable teaching categories */}
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white/70">
                    Teaching Categories
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-white/40">
                    Select the categories you want to teach. You can select up
                    to 10 categories.
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-[#4D8DFF]/20 bg-[#4D8DFF]/10 px-2.5 py-1 text-xs font-medium text-[#8FBAFF]">
                  {selectedCategoryIds.length}/10
                </span>
              </div>

              {isLoadingCategories ? (
                <p className="mt-4 text-xs text-white/40">
                  Loading teaching categories...
                </p>
              ) : categories.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {categories.map((category) => {
                    const selected = selectedCategoryIds.includes(category.id);

                    return (
                      <button
                        key={category.id}
                        type="button"
                        aria-pressed={selected}
                        disabled={isSaving}
                        onClick={() => toggleCategory(category.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
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
                </div>
              ) : (
                <p className="mt-4 text-xs text-white/35">
                  No teaching categories are available.
                </p>
              )}
            </section>
          </div>

          {/* Footer */}
          <div className="relative flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.06] bg-[#0A0A0A] px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              aria-label={isSaving ? "Saving changes" : "Save changes"}
              className="inline-flex h-[46px] w-[150px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#4D8DFF]/30 bg-[#4D8DFF]/15 px-5 py-3 text-sm font-semibold text-[#8FBAFF] transition hover:border-[#4D8DFF]/50 hover:bg-[#4D8DFF]/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <LoaderCircle
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EditInstructorProfileModal;
