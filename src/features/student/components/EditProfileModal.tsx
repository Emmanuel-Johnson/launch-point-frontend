import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Briefcase,
  Camera,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  User,
  X,
} from "lucide-react";
import {
  useForm,
  useWatch,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { StudentProfile } from "../types/studentProfile";
import { updateStudentProfile } from "../api/studentProfileApi";

const MEDIA_BASE_URL = "http://localhost:8000";
const DEFAULT_PROFILE_IMAGE = `${MEDIA_BASE_URL}/media/profile_images/default_profile.png`;

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

/* ==========================================================================
   TYPES
========================================================================== */

interface EditProfileModalProps {
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (profile: StudentProfile) => void;
}

interface EditProfileFormProps {
  profile: StudentProfile;
  onClose: () => void;
  onSaved: (profile: StudentProfile) => void;
}

/* ==========================================================================
   VALIDATION HELPERS
========================================================================== */

const hasRepeatedSpecialCharacter = (value: string): boolean => {
  for (let index = 0; index < value.length - 1; index += 1) {
    const current = value[index];
    const next = value[index + 1];

    if (
      current === next &&
      !/[\p{L}\p{N}]/u.test(current) &&
      !/\s/.test(current)
    ) {
      return true;
    }
  }

  return false;
};

/* ==========================================================================
   VALIDATION SCHEMA
========================================================================== */

const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name is too long")
    .regex(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u, "Please enter a valid full name"),

  bio: z
    .string()
    .trim()
    .min(1, "Bio is required")
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio cannot exceed 500 characters")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated consecutively",
    ),

  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated consecutively",
    ),

  education: z
    .string()
    .trim()
    .min(1, "Education is required")
    .min(3, "Education must be at least 3 characters")
    .max(150, "Education is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated consecutively",
    ),

  occupation: z
    .string()
    .trim()
    .min(1, "Occupation is required")
    .min(3, "Occupation must be at least 3 characters")
    .max(100, "Occupation is too long")
    .refine(
      (value) => !hasRepeatedSpecialCharacter(value),
      "The same special character cannot be repeated consecutively",
    ),

  github_url: z
    .string()
    .trim()
    .min(1, "GitHub URL is required")
    .url("Enter a valid GitHub URL"),

  linkedin_url: z
    .string()
    .trim()
    .min(1, "LinkedIn URL is required")
    .url("Enter a valid LinkedIn URL"),

  portfolio_url: z
    .string()
    .trim()
    .min(1, "Portfolio URL is required")
    .url("Enter a valid portfolio URL"),
});

type FormData = z.infer<typeof profileSchema>;

/* ==========================================================================
   IMAGE HELPERS
========================================================================== */

const resolveImage = (path: string | null): string => {
  if (!path) {
    return DEFAULT_PROFILE_IMAGE;
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

/* ==========================================================================
   MAIN COMPONENT
========================================================================== */

const EditProfileModal = ({
  profile,
  isOpen,
  onClose,
  onSaved,
}: EditProfileModalProps) => {
  if (!isOpen) {
    return null;
  }

  /*
   * The key causes EditProfileForm to remount when the profile's
   * updated_at changes. This replaces the previous reset() useEffect.
   *
   * No synchronous setState inside an effect is needed.
   */
  const profileKey = `${profile.id}-${profile.updated_at}`;

  return (
    <EditProfileForm
      key={profileKey}
      profile={profile}
      onClose={onClose}
      onSaved={onSaved}
    />
  );
};

/* ==========================================================================
   FORM COMPONENT
========================================================================== */

const EditProfileForm = ({
  profile,
  onClose,
  onSaved,
}: EditProfileFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [removeProfileImage, setRemoveProfileImage] = useState(false);

  const [previewImage, setPreviewImage] = useState<string>(
    resolveImage(profile.profile_image),
  );

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ==========================================================================
     REACT HOOK FORM
  ========================================================================== */

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),

    mode: "onChange",

    defaultValues: {
      full_name: profile.full_name || "",
      bio: profile.bio || "",
      location: profile.location || "",
      education: profile.education || "",
      occupation: profile.occupation || "",
      github_url: profile.github_url || "",
      linkedin_url: profile.linkedin_url || "",
      portfolio_url: profile.portfolio_url || "",
    },
  });

  /* ==========================================================================
     WATCH VALUES

     useWatch() instead of watch() to avoid React Compiler warning.
  ========================================================================== */

  const fullName = useWatch({
    control,
    name: "full_name",
  });

  const bio = useWatch({
    control,
    name: "bio",
  });

  /* ==========================================================================
     ESCAPE KEY

     This effect is valid because it subscribes to the browser's
     document event system.
  ========================================================================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSaving, onClose]);

  /* ==========================================================================
     IMAGE CHANGE
  ========================================================================== */

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setImageError("Profile image cannot exceed 5 MB.");

      event.target.value = "";

      return;
    }

    setSelectedImage(file);

    setRemoveProfileImage(false);

    setImageError(null);

    setError(null);

    setPreviewImage(URL.createObjectURL(file));

    event.target.value = "";
  };

  /* ==========================================================================
     REMOVE IMAGE
  ========================================================================== */

  const handleRemoveImage = () => {
    setSelectedImage(null);

    setRemoveProfileImage(true);

    setPreviewImage(DEFAULT_PROFILE_IMAGE);

    setImageError(null);

    setError(null);
  };

  /* ==========================================================================
     SUBMIT
  ========================================================================== */

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);

    if (imageError) {
      return;
    }

    try {
      setIsSaving(true);

      const updatedProfile = await updateStudentProfile({
        full_name: data.full_name.trim(),
        bio: data.bio.trim(),
        location: data.location.trim(),
        education: data.education.trim(),
        occupation: data.occupation.trim(),
        github_url: data.github_url.trim(),
        linkedin_url: data.linkedin_url.trim(),
        portfolio_url: data.portfolio_url.trim(),
        profile_image: selectedImage,
        remove_profile_image: removeProfileImage,
      });

      onSaved(updatedProfile);
    } catch (error) {
      console.error("Failed to update student profile:", error);

      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ==========================================================================
     INITIALS
  ========================================================================== */

  const initials = getInitials(fullName || "");

  /* ==========================================================================
     MODAL
  ========================================================================== */

  return createPortal(
    <div
      className="fixed inset-0 flex h-[100dvh] w-screen items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_100px_rgba(0,0,0,0.75)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* ========================================================
            TOP GLOW
        ======================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#7C5CFF]/15 blur-3xl"
        />

        {/* ========================================================
            HEADER
        ======================================================== */}

        <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-[#7C5CFF]">
              Account
            </p>

            <h2
              id="edit-profile-title"
              className="text-xl font-semibold text-white"
              style={{
                fontFamily: DISPLAY_FONT,
              }}
            >
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Update your profile information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Close edit profile"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* ========================================================
            FORM
        ======================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex min-h-0 flex-1 flex-col"
        >
          <div className="relative overflow-y-auto px-6 py-6 sm:px-7">
            <div className="space-y-6">
              {/* ====================================================
                  PROFILE PHOTO
              ==================================================== */}

              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/20">
                    <Camera className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-white"
                      style={{
                        fontFamily: DISPLAY_FONT,
                      }}
                    >
                      Profile Photo
                    </h3>

                    <p className="text-xs text-white/35">
                      Choose a photo for your profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {/* Avatar */}

                  <div className="relative shrink-0">
                    <div className="rounded-full bg-gradient-to-br from-[#7C5CFF] via-[#8E72FF] to-[#E8C67A] p-[2px]">
                      <div className="rounded-full bg-[#0A0A0A] p-[3px]">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full">
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7C5CFF] to-[#4D32C8] text-xl font-semibold text-white"
                            style={{
                              fontFamily: DISPLAY_FONT,
                            }}
                          >
                            {initials}
                          </div>

                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Profile preview"
                              className="absolute inset-0 h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">
                      Profile picture
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-white/35">
                      JPG, PNG or WEBP. Maximum size 5 MB.
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
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
                        className="cursor-pointer rounded-xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-4 py-2 text-xs font-medium text-[#9D82FF] transition-all duration-200 hover:border-[#7C5CFF]/45 hover:bg-[#7C5CFF]/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {selectedImage ? "Change Photo" : "Choose Photo"}
                      </button>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          disabled={isSaving}
                          className="cursor-pointer rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/45 transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/[0.06] hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
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

              {/* ====================================================
                  PERSONAL INFORMATION
              ==================================================== */}

              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/20">
                    <User className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-white"
                      style={{
                        fontFamily: DISPLAY_FONT,
                      }}
                    >
                      Personal Information
                    </h3>

                    <p className="text-xs text-white/35">
                      Basic information about you.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    registration={register("full_name")}
                    placeholder="Enter your full name"
                    error={errors.full_name?.message}
                  />

                  <FormField
                    label="Location"
                    icon={MapPin}
                    registration={register("location")}
                    placeholder="Kerala, India"
                    error={errors.location?.message}
                  />

                  <FormField
                    label="Education"
                    icon={GraduationCap}
                    registration={register("education")}
                    placeholder="B.Tech Computer Science"
                    error={errors.education?.message}
                  />

                  <FormField
                    label="Occupation"
                    icon={Briefcase}
                    registration={register("occupation")}
                    placeholder="Software Developer"
                    error={errors.occupation?.message}
                  />
                </div>
              </section>

              {/* ====================================================
                  BIO
              ==================================================== */}

              <section>
                <label
                  htmlFor="profile-bio"
                  className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-white/35"
                >
                  Bio
                </label>

                <textarea
                  id="profile-bio"
                  {...register("bio")}
                  maxLength={500}
                  rows={4}
                  placeholder="Tell something about yourself..."
                  className={`w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.04] focus:ring-1 ${
                    errors.bio
                      ? "border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20"
                      : "border-white/[0.07] focus:border-[#7C5CFF]/40 focus:ring-[#7C5CFF]/20"
                  }`}
                />

                <div className="mt-1 flex items-start justify-between gap-3">
                  <div>
                    {errors.bio && (
                      <p className="text-xs text-red-400">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 text-[11px] ${
                      bio.length >= 500 ? "text-red-400" : "text-white/25"
                    }`}
                  >
                    {bio.length}/500
                  </span>
                </div>
              </section>

              {/* ====================================================
                  SOCIAL LINKS
              ==================================================== */}

              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/20">
                    <LinkIcon className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-white"
                      style={{
                        fontFamily: DISPLAY_FONT,
                      }}
                    >
                      Social Links
                    </h3>

                    <p className="text-xs text-white/35">
                      Connect your online profiles.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField
                    label="GitHub"
                    registration={register("github_url")}
                    placeholder="https://github.com/username"
                    error={errors.github_url?.message}
                  />

                  <FormField
                    label="LinkedIn"
                    registration={register("linkedin_url")}
                    placeholder="https://linkedin.com/in/username"
                    error={errors.linkedin_url?.message}
                  />

                  <FormField
                    label="Portfolio"
                    registration={register("portfolio_url")}
                    placeholder="https://yourportfolio.com"
                    error={errors.portfolio_url?.message}
                  />
                </div>
              </section>

              {/* ====================================================
                  EMAIL
              ==================================================== */}

              <section>
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
                  Email Address
                </label>

                <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3 text-sm text-white/35">
                  {profile.email}
                </div>

                <p className="mt-2 text-[11px] text-white/25">
                  Email address cannot be changed here.
                </p>
              </section>

              {/* ====================================================
                  GENERAL ERROR
              ==================================================== */}

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              FOOTER
          ======================================================== */}

          <div className="relative flex shrink-0 items-center justify-end gap-3 border-t border-white/[0.06] bg-[#0A0A0A] px-6 py-4 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-w-[125px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7C5CFF] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_25px_rgba(124,92,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8B6DFF] hover:shadow-[0_12px_30px_rgba(124,92,255,0.28)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
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

/* ==========================================================================
   FORM FIELD
========================================================================== */

interface FormFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  icon?: typeof User;
  error?: string;
}

const FormField = ({
  label,
  registration,
  placeholder,
  icon: Icon,
  error,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25"
            strokeWidth={1.8}
          />
        )}

        <input
          type="text"
          {...registration}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border bg-white/[0.03] text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.04] focus:ring-1 ${
            Icon ? "pl-11 pr-4" : "px-4"
          } ${
            error
              ? "border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20"
              : "border-white/[0.07] focus:border-[#7C5CFF]/40 focus:ring-[#7C5CFF]/20"
          }`}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default EditProfileModal;
