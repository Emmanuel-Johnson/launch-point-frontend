import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  User,
  X,
} from "lucide-react";

import type { StudentProfile } from "../types/studentProfile";
import { updateStudentProfile } from "../api/studentProfileApi";

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

const EditProfileModal = ({
  profile,
  isOpen,
  onClose,
  onSaved,
}: EditProfileModalProps) => {
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
      });

      onSaved(updatedProfile);
    } catch (error) {
      console.error("Failed to update student profile:", error);

      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  /*
   * --------------------------------------------------------------
   * Modal
   * --------------------------------------------------------------
   *
   * Render directly into document.body so the modal is completely
   * outside StudentLayout, StudentHeader and StudentSidebar.
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
      {/* ==========================================================
          MODAL
      ========================================================== */}

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
              style={{ fontFamily: DISPLAY_FONT }}
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
                {/* Full Name */}

                <FormField
                  label="Full Name"
                  value={formData.full_name}
                  onChange={(value) => handleChange("full_name", value)}
                  placeholder="Enter your full name"
                />

                {/* Location */}

                <FormField
                  label="Location"
                  icon={MapPin}
                  value={formData.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Kerala, India"
                />

                {/* Education */}

                <FormField
                  label="Education"
                  icon={GraduationCap}
                  value={formData.education}
                  onChange={(value) => handleChange("education", value)}
                  placeholder="B.Tech Computer Science"
                />

                {/* Occupation */}

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
                {/* GitHub */}

                <FormField
                  label="GitHub"
                  value={formData.github_url}
                  onChange={(value) => handleChange("github_url", value)}
                  placeholder="https://github.com/username"
                />

                {/* LinkedIn */}

                <FormField
                  label="LinkedIn"
                  value={formData.linkedin_url}
                  onChange={(value) => handleChange("linkedin_url", value)}
                  placeholder="https://linkedin.com/in/username"
                />

                {/* Portfolio */}

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
