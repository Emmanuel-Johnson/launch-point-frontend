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

import type { StudentProfile } from "../types/studentProfile";
import { updateStudentProfile } from "../api/studentProfileApi";

const MEDIA_BASE_URL = "http://localhost:8000";

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

interface EditProfileModalProps {
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (profile: StudentProfile) => void;
}

interface FormData {
  full_name: string;
  bio: string;
  location: string;
  education: string;
  occupation: string;
  github_url: string;
  linkedin_url: string;
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

const EditProfileModal = ({
  profile,
  isOpen,
  onClose,
  onSaved,
}: EditProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    full_name: profile.full_name || "",
    bio: profile.bio || "",
    location: profile.location || "",
    education: profile.education || "",
    occupation: profile.occupation || "",
    github_url: profile.github_url || "",
    linkedin_url: profile.linkedin_url || "",
    portfolio_url: profile.portfolio_url || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    resolveImage(profile.profile_image),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * --------------------------------------------------------------
   * Escape key
   * --------------------------------------------------------------
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSaving, onClose]);

  /*
   * --------------------------------------------------------------
   * Don't render when closed
   * --------------------------------------------------------------
   */

  if (!isOpen) {
    return null;
  }

  /*
   * --------------------------------------------------------------
   * Form change
   * --------------------------------------------------------------
   */

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  /*
   * --------------------------------------------------------------
   * Profile image
   * --------------------------------------------------------------
   */

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Profile image must be smaller than 5 MB.");
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setError(null);

    event.target.value = "";
  };

  /*
   * --------------------------------------------------------------
   * Remove selected image
   * --------------------------------------------------------------
   */

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setError(null);
  };

  /*
   * --------------------------------------------------------------
   * Save profile
   * --------------------------------------------------------------
   */

  const handleSave = async () => {
    setError(null);

    if (!formData.full_name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (formData.bio.length > 500) {
      setError("Bio cannot exceed 500 characters.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedProfile = await updateStudentProfile({
        full_name: formData.full_name.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        education: formData.education.trim(),
        occupation: formData.occupation.trim(),
        github_url: formData.github_url.trim(),
        linkedin_url: formData.linkedin_url.trim(),
        portfolio_url: formData.portfolio_url.trim(),
        profile_image: selectedImage,
      });

      onSaved(updatedProfile);
    } catch (error: unknown) {
      console.error("UPDATE PROFILE ERROR:", error);

      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as {
            response?: {
              status?: number;
              data?: unknown;
            };
          }
        ).response;

        console.error("STATUS:", response?.status);

        console.error("BACKEND RESPONSE:", response?.data);

        const backendError = response?.data;

        if (typeof backendError === "string") {
          setError(backendError);
        } else if (backendError && typeof backendError === "object") {
          const messages = Object.entries(backendError).map(
            ([field, value]) => {
              const message = Array.isArray(value)
                ? value.join(", ")
                : String(value);

              return `${field}: ${message}`;
            },
          );

          setError(
            messages.length > 0
              ? messages.join(" | ")
              : "Failed to update profile.",
          );
        } else {
          setError("Failed to update profile. Please try again.");
        }
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  /*
   * --------------------------------------------------------------
   * Profile image display
   * --------------------------------------------------------------
   */

  const initials = getInitials(formData.full_name);

  /*
   * --------------------------------------------------------------
   * Modal
   * --------------------------------------------------------------
   */

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
                  value={formData.full_name}
                  onChange={(value) => handleChange("full_name", value)}
                  placeholder="Enter your full name"
                />

                <FormField
                  label="Location"
                  icon={MapPin}
                  value={formData.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Kerala, India"
                />

                <FormField
                  label="Education"
                  icon={GraduationCap}
                  value={formData.education}
                  onChange={(value) => handleChange("education", value)}
                  placeholder="B.Tech Computer Science"
                />

                <FormField
                  label="Occupation"
                  icon={Briefcase}
                  value={formData.occupation}
                  onChange={(value) => handleChange("occupation", value)}
                  placeholder="Software Developer"
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
                value={formData.bio}
                onChange={(event) => handleChange("bio", event.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell something about yourself..."
                className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-[#7C5CFF]/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#7C5CFF]/20"
              />

              <div className="mt-1 flex justify-end">
                <span className="text-[11px] text-white/25">
                  {formData.bio.length}/500
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
                  value={formData.github_url}
                  onChange={(value) => handleChange("github_url", value)}
                  placeholder="https://github.com/username"
                />

                <FormField
                  label="LinkedIn"
                  value={formData.linkedin_url}
                  onChange={(value) => handleChange("linkedin_url", value)}
                  placeholder="https://linkedin.com/in/username"
                />

                <FormField
                  label="Portfolio"
                  value={formData.portfolio_url}
                  onChange={(value) => handleChange("portfolio_url", value)}
                  placeholder="https://yourportfolio.com"
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
                ERROR
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
            type="button"
            onClick={handleSave}
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
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: typeof User;
}

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
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
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20 focus:border-[#7C5CFF]/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#7C5CFF]/20 ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
};

export default EditProfileModal;
