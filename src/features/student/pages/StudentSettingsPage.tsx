import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Save,
  LockKeyhole,
  LoaderCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { changePassword } from "../../student/api/StudentSettingsApi";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmPasswordModal from "../../student/components/ConfirmPasswordModal";
import { clearCredentials } from "../../auth/slices/authSlice";
import { persistor } from "../../../app/store/store";
import { useAppDispatch } from "../../../app/store/hooks";

type SettingsSection = "security" | "notifications";

type PasswordValidationErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

type NotificationSettings = {
  emailUpdates: boolean;
  courseAnnouncements: boolean;
  learningReminders: boolean;
  securityAlerts: boolean;
};

/* ------------------------------------------------------------------ tokens */

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const validateCurrentPassword = (password: string): string | undefined => {
  if (!password) return "Current password is required";
  return undefined;
};

const validateNewPassword = (
  password: string,
  currentPassword: string,
): string | undefined => {
  if (!password) return "Password is required";
  if (password === currentPassword) {
    return "New password must be different from your current password";
  }
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 128) return "Password is too long";
  if (password !== password.trim()) {
    return "Password cannot start or end with spaces";
  }
  if (!/[A-Z]/.test(password)) {
    return "Must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Must contain at least one number";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Must contain at least one special character";
  }
  return undefined;
};

const validateConfirmPassword = (
  confirmPassword: string,
  newPassword: string,
): string | undefined => {
  if (!confirmPassword) return "Confirm password is required";
  if (confirmPassword !== confirmPassword.trim()) {
    return "Password cannot start or end with spaces";
  }
  if (confirmPassword !== newPassword) return "Passwords do not match";
  return undefined;
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;

    if (data) {
      for (const key of [
        "current_password",
        "new_password",
        "confirm_new_password",
        "detail",
      ]) {
        const value = data[key];

        if (typeof value === "string") {
          return value;
        }

        if (Array.isArray(value) && value.length > 0) {
          return String(value[0]);
        }
      }

      const firstValue = Object.values(data)[0];

      if (typeof firstValue === "string") {
        return firstValue;
      }

      if (Array.isArray(firstValue) && firstValue.length > 0) {
        return String(firstValue[0]);
      }
    }
  }

  return "Something went wrong. Please try again.";
};

/* ---------------------------------------------------------- section header */

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/20">
        <Icon className="h-[23px] w-[23px]" strokeWidth={1.8} />
      </div>

      <div>
        <h2
          className="text-xl font-semibold tracking-tight text-white"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/45">{description}</p>
      </div>
    </div>
  );
};

/* ============================================================ MAIN COMPONENT */

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState<SettingsSection>("security");

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] =
    useState<PasswordValidationErrors>({});

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailUpdates: true,
    courseAnnouncements: true,
    learningReminders: false,
    securityAlerts: true,
  });

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const sections: {
    id: SettingsSection;
    label: string;
    description: string;
    icon: LucideIcon;
  }[] = [
    {
      id: "security",
      label: "Security",
      description: "Password and account security",
      icon: ShieldCheck,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage your notifications",
      icon: Bell,
    },
  ];

  const notificationOptions: {
    key: keyof NotificationSettings;
    title: string;
    description: string;
    icon: LucideIcon;
  }[] = [
    {
      key: "emailUpdates",
      title: "Email updates",
      description: "Receive important updates and announcements through email.",
      icon: Mail,
    },
    {
      key: "courseAnnouncements",
      title: "Course announcements",
      description: "Stay informed about updates to your enrolled courses.",
      icon: BookOpen,
    },
    {
      key: "learningReminders",
      title: "Learning reminders",
      description: "Get reminders to continue your learning journey.",
      icon: Bell,
    },
    {
      key: "securityAlerts",
      title: "Security alerts",
      description:
        "Receive important notifications about your account security.",
      icon: ShieldCheck,
    },
  ];

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPasswords((previous) => {
      const updatedPasswords = {
        ...previous,
        [name]: value,
      };

      if (name === "currentPassword") {
        setPasswordErrors((previousErrors) => ({
          ...previousErrors,
          currentPassword: value ? validateCurrentPassword(value) : undefined,
          newPassword: updatedPasswords.newPassword
            ? validateNewPassword(updatedPasswords.newPassword, value)
            : undefined,
        }));
      } else if (name === "newPassword") {
        setPasswordErrors((previousErrors) => ({
          ...previousErrors,
          newPassword: value
            ? validateNewPassword(value, updatedPasswords.currentPassword)
            : undefined,
          confirmPassword: updatedPasswords.confirmPassword
            ? validateConfirmPassword(updatedPasswords.confirmPassword, value)
            : undefined,
        }));
      } else if (name === "confirmPassword") {
        setPasswordErrors((previousErrors) => ({
          ...previousErrors,
          confirmPassword: value
            ? validateConfirmPassword(value, updatedPasswords.newPassword)
            : undefined,
        }));
      }

      return updatedPasswords;
    });
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentPasswordError = validateCurrentPassword(
      passwords.currentPassword,
    );
    const newPasswordError = validateNewPassword(
      passwords.newPassword,
      passwords.currentPassword,
    );
    const confirmPasswordError = validateConfirmPassword(
      passwords.confirmPassword,
      passwords.newPassword,
    );

    setPasswordErrors({
      currentPassword: currentPasswordError,
      newPassword: newPasswordError,
      confirmPassword: confirmPasswordError,
    });

    // Open the confirmation modal only when every field is valid.
    if (currentPasswordError || newPasswordError || confirmPasswordError) {
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmPasswordChange = async () => {
    if (isSavingPassword) return;

    setIsSavingPassword(true);

    try {
      const response = await changePassword({
        current_password: passwords.currentPassword,
        new_password: passwords.newPassword,
        confirm_new_password: passwords.confirmPassword,
      });

      // Clear password form state after the API confirms the password change.
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
      setShowPasswords({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
      setIsConfirmModalOpen(false);

      // Log the user out locally: remove both JWTs and clear persisted Redux auth.
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      dispatch(clearCredentials());
      await persistor.purge();

      toast.success(
        response.message ||
          "Password updated successfully. Please sign in with your new password.",
      );

      // Replace history so Back does not return to the protected settings page.
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      setIsConfirmModalOpen(false);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleNotificationSave = async () => {
    setIsSavingNotifications(true);

    try {
      // TODO: Send notification preferences to your Django API.
      // These settings currently exist only in React state.
      console.log("Connect notification preferences to the API.");
    } finally {
      setIsSavingNotifications(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-[#0F0F12] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/25 hover:border-white/[0.14] focus:border-[#7C5CFF]/60 focus:bg-[#121216] focus:ring-4 focus:ring-[#7C5CFF]/[0.08]";

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-8">
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "80ms" }}
        >
          <div className="rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
            <div className="relative overflow-hidden rounded-[25px] bg-[#0A0A0A] p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#7C5CFF]/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-[#7C5CFF]/[0.07] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-16 h-52 w-52 rounded-full bg-[#E8C67A]/[0.05] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/50 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("${GRAIN_URL}")` }}
              />

              <div className="cursor-default">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
                  Preferences
                </p>

                <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
                  <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
                    Settings
                  </span>
                </h1>

                <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
                  Manage your account security and choose how you receive
                  updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SETTINGS LAYOUT
        ========================================================= */}
        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* ---------------------------------------------- SIDEBAR */}
          <aside
            className="animate-page-item h-fit rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{ animationDelay: "140ms" }}
          >
            <p className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Settings
            </p>

            <nav aria-label="Settings navigation" className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl p-3 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#7C5CFF]/[0.10] text-white ring-1 ring-inset ring-[#7C5CFF]/20"
                        : "text-white/55 hover:translate-x-0.5 hover:bg-white/[0.035] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-gradient-to-b from-[#7C5CFF] to-[#9D82FF]" />
                    )}

                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-[#7C5CFF]/15 text-[#9D82FF]"
                          : "bg-white/[0.04] text-white/45 group-hover:bg-[#7C5CFF]/10 group-hover:text-[#9D82FF]"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <div className="relative z-10 min-w-0 flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ fontFamily: DISPLAY_FONT }}
                      >
                        {section.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/40">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ---------------------------------------------- MAIN CONTENT */}
          <main
            className="animate-page-item min-w-0"
            style={{ animationDelay: "200ms" }}
          >
            <div className="rounded-3xl bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-transparent p-px shadow-[0_18px_60px_-24px_rgba(0,0,0,0.8)]">
              <div className="relative overflow-hidden rounded-[23px] bg-[#0A0A0A] p-5 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#7C5CFF]/[0.08] blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent"
                />

                <div className="relative">
                  {/* ================================= SECURITY SECTION */}
                  {activeSection === "security" && (
                    <section>
                      <div className="mb-8">
                        <SectionHeader
                          icon={ShieldCheck}
                          title="Security"
                          description="Manage your password and keep your account secure."
                        />
                      </div>

                      {/* Change Password Card */}
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 sm:p-6">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/15">
                            <LockKeyhole size={19} strokeWidth={1.8} />
                          </div>

                          <div>
                            <h3
                              className="text-sm font-semibold text-white"
                              style={{ fontFamily: DISPLAY_FONT }}
                            >
                              Change password
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-white/40">
                              Update your password regularly to protect your
                              account.
                            </p>
                          </div>
                        </div>

                        <form
                          onSubmit={handlePasswordSubmit}
                          noValidate
                          className="space-y-5"
                        >
                          {(
                            [
                              {
                                name: "currentPassword",
                                label: "Current password",
                                placeholder: "Enter your current password",
                              },
                              {
                                name: "newPassword",
                                label: "New password",
                                placeholder: "Enter your new password",
                              },
                              {
                                name: "confirmPassword",
                                label: "Confirm new password",
                                placeholder: "Re-enter your new password",
                              },
                            ] as const
                          ).map((field) => (
                            <div key={field.name}>
                              <label
                                htmlFor={field.name}
                                className="mb-2 block text-sm font-medium text-white/70"
                              >
                                {field.label}
                              </label>

                              <div className="group relative">
                                <input
                                  id={field.name}
                                  name={field.name}
                                  type={
                                    showPasswords[field.name]
                                      ? "text"
                                      : "password"
                                  }
                                  value={passwords[field.name]}
                                  onChange={handlePasswordChange}
                                  placeholder={field.placeholder}
                                  autoComplete={
                                    field.name === "currentPassword"
                                      ? "current-password"
                                      : "new-password"
                                  }
                                  required
                                  minLength={
                                    field.name === "currentPassword"
                                      ? undefined
                                      : 8
                                  }
                                  className={`${inputClass} pr-12 ${
                                    (field.name === "currentPassword" &&
                                      passwordErrors.currentPassword) ||
                                    (field.name === "newPassword" &&
                                      passwordErrors.newPassword) ||
                                    (field.name === "confirmPassword" &&
                                      passwordErrors.confirmPassword)
                                      ? "border-red-400/70 focus:border-red-400/70 focus:ring-red-400/10"
                                      : ""
                                  }`}
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    togglePasswordVisibility(field.name)
                                  }
                                  aria-label={
                                    showPasswords[field.name]
                                      ? `Hide ${field.label.toLowerCase()}`
                                      : `Show ${field.label.toLowerCase()}`
                                  }
                                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-[#9D82FF]"
                                >
                                  {showPasswords[field.name] ? (
                                    <EyeOff size={18} />
                                  ) : (
                                    <Eye size={18} />
                                  )}
                                </button>
                              </div>

                              {field.name === "currentPassword" &&
                                passwordErrors.currentPassword && (
                                  <p
                                    className="mt-1.5 text-xs text-red-400"
                                    role="alert"
                                  >
                                    {passwordErrors.currentPassword}
                                  </p>
                                )}

                              {field.name === "newPassword" &&
                                passwordErrors.newPassword && (
                                  <p
                                    className="mt-1.5 text-xs text-red-400"
                                    role="alert"
                                  >
                                    {passwordErrors.newPassword}
                                  </p>
                                )}

                              {field.name === "confirmPassword" &&
                                passwordErrors.confirmPassword && (
                                  <p
                                    className="mt-1.5 text-xs text-red-400"
                                    role="alert"
                                  >
                                    {passwordErrors.confirmPassword}
                                  </p>
                                )}
                            </div>
                          ))}

                          <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-white/35">
                              You may need to sign in again after changing your
                              password.
                            </p>

                            <button
                              type="submit"
                              disabled={isSavingPassword}
                              className="cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-xl
    bg-[#7C5CFF] px-6 py-3 text-sm font-semibold text-white
    shadow-md shadow-[#7C5CFF]/20
    transition-all duration-200
    hover:bg-[#6B4DE6] hover:shadow-lg hover:shadow-[#7C5CFF]/25
    active:scale-[0.98]
    disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isSavingPassword ? (
                                <>
                                  <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                  />
                                  Updating password...
                                </>
                              ) : (
                                <>
                                  <LockKeyhole size={16} />
                                  Save new password
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </section>
                  )}

                  {/* ============================ NOTIFICATIONS SECTION */}
                  {activeSection === "notifications" && (
                    <section>
                      <div className="mb-8">
                        <SectionHeader
                          icon={Bell}
                          title="Notifications"
                          description="Choose the updates and reminders you want to receive."
                        />
                      </div>

                      <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#7C5CFF]/15 bg-[#7C5CFF]/[0.04] p-4">
                        <div>
                          <p
                            className="text-sm font-medium text-white"
                            style={{ fontFamily: DISPLAY_FONT }}
                          >
                            Notification preferences
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            Customize your learning experience.
                          </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#9D82FF] ring-1 ring-inset ring-[#7C5CFF]/15">
                          <Bell size={19} strokeWidth={1.8} />
                        </div>
                      </div>

                      <div className="divide-y divide-white/[0.07]">
                        {notificationOptions.map((option) => {
                          const Icon = option.icon;
                          const isEnabled = notifications[option.key];

                          return (
                            <div
                              key={option.key}
                              className="group flex items-center justify-between gap-4 py-5"
                            >
                              <div className="flex min-w-0 items-start gap-3">
                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.035] text-white/45 transition-all duration-300 group-hover:bg-[#7C5CFF]/10 group-hover:text-[#9D82FF]">
                                  <Icon size={19} strokeWidth={1.8} />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white/90">
                                    {option.title}
                                  </p>

                                  <p className="mt-1 max-w-lg text-xs leading-5 text-white/40">
                                    {option.description}
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                role="switch"
                                aria-checked={isEnabled}
                                aria-label={option.title}
                                onClick={() => toggleNotification(option.key)}
                                className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#7C5CFF]/20 ${
                                  isEnabled
                                    ? "bg-gradient-to-r from-[#7C5CFF] to-[#9D82FF] shadow-[0_0_14px_rgba(124,92,255,0.25)]"
                                    : "bg-white/15 hover:bg-white/25"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                                    isEnabled ? "left-6" : "left-1"
                                  }`}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-5 text-white/35">
                          Changes need to be saved to persist across sessions.
                        </p>

                        <button
                          type="button"
                          onClick={handleNotificationSave}
                          disabled={isSavingNotifications}
                          className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#8E72FF] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#7C5CFF]/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7C5CFF]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Save size={16} />

                          {isSavingNotifications
                            ? "Saving..."
                            : "Save preferences"}
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>

      <ConfirmPasswordModal
        isOpen={isConfirmModalOpen}
        isLoading={isSavingPassword}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmPasswordChange}
      />
    </div>
  );
};

export default SettingsPage;
