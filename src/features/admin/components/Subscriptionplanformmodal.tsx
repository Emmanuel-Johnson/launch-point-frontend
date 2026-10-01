import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2, CreditCard, Crown, ChevronDown } from "lucide-react";
import { z } from "zod";

import Field from "./Field";

/* -------------------------------- */
/* Types (local — no API for now)   */
/* -------------------------------- */

export interface PlanFormValues {
  name: string;
  plan_type: "free" | "premium";
  description: string;
  benefits: string[];
  price: string;
  billing_interval: "" | "weekly" | "monthly" | "yearly";
  is_active: boolean;
}

interface SubscriptionPlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: Partial<PlanFormValues>;
  onSubmit?: (values: PlanFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

const DEFAULTS: PlanFormValues = {
  name: "",
  plan_type: "premium",
  description: "",
  benefits: [""],
  price: "",
  billing_interval: "monthly",
  is_active: true,
};

const PLAN_TYPES = ["free", "premium"] as const;

/* -------------------------------- */
/* Validation Helpers               */
/* -------------------------------- */

const hasRepeatedSpecialCharacter = (value: string) => {
  return /([^\p{L}\p{N}\s])\1{2,}/u.test(value);
};

const hasConsecutiveSpecialCharacters = (value: string) => {
  return /[^\p{L}\p{N}\s]{3,}/u.test(value);
};

const hasRepeatedCharacter = (value: string) => {
  return /(.)\1{3,}/su.test(value);
};

const hasRepeatedPattern = (value: string) => {
  const normalized = value.replace(/\s/g, "").toLowerCase();

  for (let size = 2; size <= 6; size++) {
    const pattern = new RegExp(`^(.{${size}})\\1{2,}$`, "u");

    if (pattern.test(normalized)) {
      return true;
    }
  }

  return false;
};

/* -------------------------------- */
/* Validation Schema                */
/* -------------------------------- */

const hasLetter = (value: string) => /\p{L}/u.test(value);

const countLetters = (value: string) => (value.match(/\p{L}/gu) || []).length;

const subscriptionPlanSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Plan name must be at least 3 characters.")
      .max(100, "Plan name must not exceed 100 characters.")
      .refine(
        (value) => hasLetter(value),
        "Plan name must contain at least one letter.",
      )
      .refine(
        (value) => !hasRepeatedSpecialCharacter(value),
        "Plan name cannot contain the same special character 3 or more times consecutively.",
      )
      .refine(
        (value) => !hasConsecutiveSpecialCharacters(value),
        "Plan name cannot contain 3 or more consecutive special characters.",
      )
      .refine(
        (value) => !hasRepeatedCharacter(value),
        "Plan name cannot contain the same character 4 or more times consecutively.",
      )
      .refine(
        (value) => !hasRepeatedPattern(value),
        "Plan name contains a repeated pattern.",
      )
      .refine(
        (value) => /^[\p{L}\p{N} _-]+$/u.test(value),
        "Plan name contains special characters.",
      ),

    plan_type: z.enum(["free", "premium"]),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description cannot exceed 500 characters")
      .refine(
        (value) => !hasRepeatedSpecialCharacter(value),
        "Description cannot contain the same special character 3 times consecutively",
      )
      .refine(
        (value) => !hasConsecutiveSpecialCharacters(value),
        "Description cannot contain 3 or more consecutive special characters",
      )
      .refine(
        (value) => !hasRepeatedCharacter(value),
        "Description contains too many repeated characters",
      )
      .refine(
        (value) => !hasRepeatedPattern(value),
        "Description contains a repeated pattern",
      ),

    benefits: z
      .array(
        z
          .string()
          .trim()
          .min(3, "Each benefit must be at least 3 characters.")
          .max(200, "Each benefit must not exceed 200 characters.")
          .refine(
            (value) => countLetters(value) >= 3,
            "Each benefit must contain at least 3 letters.",
          )
          .refine(
            (value) => !hasRepeatedSpecialCharacter(value),
            "Benefit cannot contain the same special character 3 or more times consecutively.",
          )
          .refine(
            (value) => !hasConsecutiveSpecialCharacters(value),
            "Benefit cannot contain 3 or more consecutive special characters.",
          )
          .refine(
            (value) => !hasRepeatedCharacter(value),
            "Benefit cannot contain the same character 4 or more times consecutively.",
          )
          .refine(
            (value) => !hasRepeatedPattern(value),
            "Benefit contains a repeated pattern.",
          ),
      )
      .min(3, "At least 3 benefits are required.")
      .max(25, "You can add a maximum of 25 benefits.")
      .refine((benefits) => {
        const normalized = benefits.map((benefit) =>
          benefit.trim().toLowerCase(),
        );

        return new Set(normalized).size === normalized.length;
      }, "Benefits must be unique."),

    price: z
      .string()
      .trim()
      .min(1, "Price is required")
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value),
        "Price must contain only numbers with up to 2 decimal places",
      )
      .refine((value) => Number(value) >= 0, "Price cannot be negative")
      .refine(
        (value) => Number(value) <= 999999.99,
        "Price cannot exceed ₹999999.99",
      ),

    billing_interval: z.enum(["", "weekly", "monthly", "yearly"]),

    is_active: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.plan_type === "premium" && !data.billing_interval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["billing_interval"],
        message: "Billing interval is required for premium plans",
      });
    }

    if (data.plan_type === "free" && data.billing_interval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["billing_interval"],
        message: "Free plans cannot have a billing interval",
      });
    }
  });

const SubscriptionPlanFormModal = ({
  isOpen,
  onClose,
  mode = "create",
  initialData,
  onSubmit,
  isSubmitting = false,
}: SubscriptionPlanFormModalProps) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof PlanFormValues, string | string[]>>
  >({});

  const [form, setForm] = useState<PlanFormValues>(() => {
    const merged = { ...DEFAULTS, ...initialData };

    const benefits =
      initialData?.benefits && initialData.benefits.length > 0
        ? initialData.benefits
        : DEFAULTS.benefits;

    const billing_interval: PlanFormValues["billing_interval"] =
      merged.plan_type === "free" ? "" : merged.billing_interval || "monthly";

    return {
      ...merged,
      benefits,
      billing_interval,
    };
  });

  /*
   * Close on Escape + lock background scroll while open.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  /*
   * Validate a single field while typing.
   */
  const validateField = <K extends keyof PlanFormValues>(
    key: K,
    value: PlanFormValues[K],
  ) => {
    const nextForm = {
      ...form,
      [key]: value,
    };

    const result = subscriptionPlanSchema.safeParse(nextForm);

    if (result.success) {
      setErrors((previous) => ({
        ...previous,
        [key]: undefined,
      }));

      return;
    }

    const issue = result.error.issues.find(
      (currentIssue) => currentIssue.path[0] === key,
    );

    setErrors((previous) => ({
      ...previous,
      [key]: issue?.message,
    }));
  };

  const setField = <K extends keyof PlanFormValues>(
    key: K,
    value: PlanFormValues[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    validateField(key, value);
  };

  /*
   * Switching plan type also fixes the billing interval:
   * free → none
   * premium → keep existing or default to monthly.
   */
  const handlePlanTypeChange = (type: PlanFormValues["plan_type"]) => {
    const billingInterval =
      type === "free" ? "" : form.billing_interval || "monthly";

    setForm((previous) => ({
      ...previous,
      plan_type: type,
      billing_interval: billingInterval,
    }));

    setErrors((previous) => ({
      ...previous,
      plan_type: undefined,
      billing_interval: undefined,
    }));
  };

  /*
   * Validate each benefit independently while typing.
   */
  const updateBenefit = (index: number, value: string) => {
    const updatedBenefits = form.benefits.map((benefit, benefitIndex) =>
      benefitIndex === index ? value : benefit,
    );

    setForm((previous) => ({
      ...previous,
      benefits: updatedBenefits,
    }));

    /*
     * Validate only the benefit being edited.
     * This makes the error appear directly under
     * the benefit that currently has the problem.
     */
    const benefitResult =
      subscriptionPlanSchema.shape.benefits.element.safeParse(value);

    setErrors((previous) => {
      const previousErrors = Array.isArray(previous.benefits)
        ? [...previous.benefits]
        : [];

      if (benefitResult.success) {
        previousErrors[index] = undefined as never;
      } else {
        previousErrors[index] = benefitResult.error.issues[0]?.message;
      }

      return {
        ...previous,
        benefits: previousErrors,
      };
    });
  };

  const addBenefit = () => {
    if (form.benefits.length >= 25) {
      setErrors((previous) => ({
        ...previous,
        benefits: "A subscription plan can have a maximum of 25 benefits",
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      benefits: [...previous.benefits, ""],
    }));

    setErrors((previous) => ({
      ...previous,
      benefits: undefined,
    }));
  };

  const removeBenefit = (index: number) => {
    if (form.benefits.length <= 3) {
      setErrors((previous) => ({
        ...previous,
        benefits: "A subscription plan must have at least 3 benefits",
      }));

      return;
    }

    const updatedBenefits = form.benefits.filter(
      (_, benefitIndex) => benefitIndex !== index,
    );

    setForm((previous) => ({
      ...previous,
      benefits: updatedBenefits,
    }));

    setErrors((previous) => {
      if (!Array.isArray(previous.benefits)) {
        return {
          ...previous,
          benefits: undefined,
        };
      }

      const updatedErrors = previous.benefits.filter(
        (_, benefitIndex) => benefitIndex !== index,
      );

      return {
        ...previous,
        benefits: updatedErrors,
      };
    });
  };

  const isFree = form.plan_type === "free";
  const typeIndex = PLAN_TYPES.indexOf(form.plan_type);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    const cleaned: PlanFormValues = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      benefits: form.benefits.map((benefit) => benefit.trim()),
      price: form.price.trim(),
    };

    const result = subscriptionPlanSchema.safeParse(cleaned);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof PlanFormValues, string | string[]>
      > = {};

      result.error.issues.forEach((issue) => {
        /*
         * Benefit errors contain the benefit index.
         */
        if (issue.path[0] === "benefits" && typeof issue.path[1] === "number") {
          const index = issue.path[1];

          if (!Array.isArray(fieldErrors.benefits)) {
            fieldErrors.benefits = [];
          }

          if (!fieldErrors.benefits[index]) {
            fieldErrors.benefits[index] = issue.message;
          }

          return;
        }

        const field = issue.path[0] as keyof PlanFormValues;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});

    await onSubmit?.(cleaned);
  };

  return createPortal(
    <>
      {/* Fonts + scoped entrance keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .sp-font-body {
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
        }

        .sp-font-display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif;
          letter-spacing: -0.01em;
        }

        @keyframes spModalOverlay {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes spModalPanel {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sp-overlay {
          animation: spModalOverlay 0.2s ease-out both;
        }

        .sp-panel {
          animation: spModalPanel 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-overlay,
          .sp-panel {
            animation: none;
          }
        }
      `}</style>

      {/* Overlay */}
      <div className="sp-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          className="sp-panel sp-font-body relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0B0B0B] to-[#080808] text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* faint gold hairline */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C67A]/25 to-transparent" />

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/25 shadow-[0_0_22px_-8px_rgba(52,211,153,0.6)]">
                <CreditCard size={20} className="text-[#34D399]" />
              </div>

              <div>
                <h2 className="sp-font-display text-lg font-semibold tracking-tight">
                  {mode === "edit"
                    ? "Edit Subscription Plan"
                    : "Create Subscription Plan"}
                </h2>

                <p className="mt-0.5 text-xs text-white/40">
                  Set the plan details, pricing, and benefits.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <X size={17} />
            </button>
          </div>

          {/* Body */}
          <div className="admin-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {/* Name */}
            <Field label="Plan Name">
              <input
                type="text"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="e.g. Premium Monthly"
                className={`${inputClass} ${
                  typeof errors.name === "string"
                    ? "border-red-400/60 focus:border-red-400/60"
                    : ""
                }`}
              />

              {typeof errors.name === "string" && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </Field>

            {/* Plan Type */}
            <Field label="Plan Type">
              <div className="relative flex w-full max-w-xs rounded-xl border border-white/[0.08] bg-black/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-lg ring-1 ring-inset transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    form.plan_type === "premium"
                      ? "bg-gradient-to-br from-[#E8C67A]/25 to-[#E8C67A]/5 shadow-[0_0_18px_-6px_rgba(232,198,122,0.6)] ring-[#E8C67A]/30"
                      : "bg-gradient-to-br from-[#34D399]/25 to-[#34D399]/5 shadow-[0_0_18px_-6px_rgba(52,211,153,0.6)] ring-[#34D399]/30"
                  }`}
                  style={{
                    transform: `translateX(${typeIndex * 100}%)`,
                  }}
                />

                {PLAN_TYPES.map((type) => {
                  const active = form.plan_type === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handlePlanTypeChange(type)}
                      className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium capitalize transition-colors duration-300 ${
                        active
                          ? type === "premium"
                            ? "text-[#E8C67A]"
                            : "text-[#34D399]"
                          : "text-white/50 hover:text-white/85"
                      }`}
                    >
                      {type === "premium" && <Crown size={13} />}

                      {type}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Price + Billing */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Price (₹)">
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
                    ₹
                  </span>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={form.price}
                    onChange={(event) => setField("price", event.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-8 ${
                      typeof errors.price === "string"
                        ? "border-red-400/60 focus:border-red-400/60"
                        : ""
                    }`}
                  />
                </div>

                {typeof errors.price === "string" && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.price}</p>
                )}
              </Field>

              <Field label="Billing Interval">
                <div className="relative">
                  <select
                    value={form.billing_interval}
                    disabled={isFree}
                    onChange={(event) =>
                      setField(
                        "billing_interval",
                        event.target
                          .value as PlanFormValues["billing_interval"],
                      )
                    }
                    className={`${inputClass} appearance-none pr-10 [&>option]:bg-[#0B0B0B] [&>option]:text-white ${
                      isFree
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    } ${
                      typeof errors.billing_interval === "string"
                        ? "border-red-400/60 focus:border-red-400/60"
                        : ""
                    }`}
                  >
                    {isFree ? (
                      <option value="">Not applicable</option>
                    ) : (
                      <>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </>
                    )}
                  </select>

                  <ChevronDown
                    size={16}
                    className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 ${
                      isFree ? "text-white/25" : "text-white/40"
                    }`}
                  />
                </div>

                {typeof errors.billing_interval === "string" && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.billing_interval}
                  </p>
                )}
              </Field>
            </div>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                placeholder="Describe what this plan offers..."
                rows={3}
                className={`${inputClass} min-h-[88px] resize-y ${
                  typeof errors.description === "string"
                    ? "border-red-400/60 focus:border-red-400/60"
                    : ""
                }`}
              />

              {typeof errors.description === "string" && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.description}
                </p>
              )}
            </Field>

            {/* Benefits */}
            <Field label="Benefits">
              <div className="space-y-2.5">
                {form.benefits.map((benefit, index) => {
                  const benefitError = Array.isArray(errors.benefits)
                    ? errors.benefits[index]
                    : undefined;

                  return (
                    <div key={index} className="flex items-start gap-2">
                      <div className="sp-font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-xs font-medium text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(event) =>
                            updateBenefit(index, event.target.value)
                          }
                          placeholder="e.g. Unlimited access to all courses"
                          className={`${inputClass} ${
                            benefitError
                              ? "border-red-400/60 focus:border-red-400/60"
                              : ""
                          }`}
                        />

                        {/* Error appears immediately while typing */}
                        {benefitError && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {benefitError}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        aria-label="Remove benefit"
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}

                {/* General benefits errors */}
                {typeof errors.benefits === "string" && (
                  <p className="text-xs text-red-400">{errors.benefits}</p>
                )}

                <button
                  type="button"
                  onClick={addBenefit}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[#34D399]/25 bg-[#34D399]/[0.04] px-3.5 py-2 text-xs font-medium text-[#34D399] transition-all duration-300 hover:border-[#34D399]/40 hover:bg-[#34D399]/10"
                >
                  <Plus
                    size={15}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                  Add benefit
                </button>
              </div>
            </Field>

            {/* Active */}
            {mode === "create" && (
              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium text-white">Active</p>

                  <p className="mt-0.5 text-xs text-white/40">
                    Make this plan available to subscribers.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={form.is_active}
                  onClick={() => setField("is_active", !form.is_active)}
                  className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                    form.is_active
                      ? "bg-[#34D399]/30 ring-1 ring-inset ring-[#34D399]/40"
                      : "bg-white/10 ring-1 ring-inset ring-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-all duration-300 ${
                      form.is_active
                        ? "left-0.5 translate-x-5 bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                        : "left-0.5 translate-x-0 bg-white/70"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-white/[0.06] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative inline-flex h-10 min-w-50 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#34D399]/30 bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 px-5 text-sm font-medium text-[#34D399] shadow-[0_0_20px_-8px_rgba(52,211,153,0.6)] transition-all duration-300 hover:border-[#34D399]/50 hover:from-[#34D399]/25 hover:shadow-[0_12px_30px_-12px_rgba(52,211,153,0.7)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M12 3a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V3z"
                    />
                  </svg>
                ) : mode === "edit" ? (
                  "Save Changes"
                ) : (
                  "Create Plan"
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 hover:border-white/[0.14] focus:border-[#34D399]/40 focus:bg-black/40 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]";

export default SubscriptionPlanFormModal;
