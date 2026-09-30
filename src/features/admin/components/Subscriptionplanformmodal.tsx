import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2, CreditCard, Crown, ChevronDown } from "lucide-react";

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
  onSubmit?: (values: PlanFormValues) => void;
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

const SubscriptionPlanFormModal = ({
  isOpen,
  onClose,
  mode = "create",
  initialData,
  onSubmit,
}: SubscriptionPlanFormModalProps) => {
  /*
   * Local form state. Initialised from initialData on mount — mount the modal
   * conditionally (or pass a `key`) when switching records so edit prefills fresh.
   */
  const [form, setForm] = useState<PlanFormValues>({
    ...DEFAULTS,
    ...initialData,
    benefits:
      initialData?.benefits && initialData.benefits.length > 0
        ? initialData.benefits
        : DEFAULTS.benefits,
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

  const setField = <K extends keyof PlanFormValues>(
    key: K,
    value: PlanFormValues[K],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const updateBenefit = (index: number, value: string) => {
    setForm((previous) => ({
      ...previous,
      benefits: previous.benefits.map((benefit, benefitIndex) =>
        benefitIndex === index ? value : benefit,
      ),
    }));
  };

  const addBenefit = () => {
    setForm((previous) => ({
      ...previous,
      benefits: [...previous.benefits, ""],
    }));
  };

  const removeBenefit = (index: number) => {
    setForm((previous) => ({
      ...previous,
      benefits: previous.benefits.filter(
        (_, benefitIndex) => benefitIndex !== index,
      ),
    }));
  };

  const typeIndex = PLAN_TYPES.indexOf(form.plan_type);

  const canSubmit = form.name.trim().length > 0 && form.price.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    const cleaned: PlanFormValues = {
      ...form,
      benefits: form.benefits.map((b) => b.trim()).filter(Boolean),
    };

    onSubmit?.(cleaned);
    onClose();
  };

  return createPortal(
    <>
      {/* Scoped entrance keyframes */}
      <style>{`
        @keyframes spModalOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spModalPanel {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .sp-overlay { animation: spModalOverlay 0.2s ease-out both; }
        .sp-panel { animation: spModalPanel 0.28s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sp-overlay, .sp-panel { animation: none; }
        }
      `}</style>

      {/* Overlay (clicking outside does NOT close the modal) */}
      <div className="sp-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          className="sp-panel relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0B0B0B] to-[#080808] text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* faint gold hairline */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C67A]/25 to-transparent" />

          {/* ===================== Header ===================== */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/25 shadow-[0_0_22px_-8px_rgba(52,211,153,0.6)]">
                <CreditCard size={20} className="text-[#34D399]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight">
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

          {/* ===================== Body ===================== */}
          <div className="admin-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {/* Name */}
            <Field label="Plan Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="e.g. Premium Monthly"
                className={inputClass}
              />
            </Field>

            {/* Plan Type (segmented) */}
            <Field label="Plan Type">
              <div className="relative flex w-full max-w-xs rounded-xl border border-white/[0.08] bg-black/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-lg ring-1 ring-inset transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    form.plan_type === "premium"
                      ? "bg-gradient-to-br from-[#E8C67A]/25 to-[#E8C67A]/5 shadow-[0_0_18px_-6px_rgba(232,198,122,0.6)] ring-[#E8C67A]/30"
                      : "bg-gradient-to-br from-[#34D399]/25 to-[#34D399]/5 shadow-[0_0_18px_-6px_rgba(52,211,153,0.6)] ring-[#34D399]/30"
                  }`}
                  style={{ transform: `translateX(${typeIndex * 100}%)` }}
                />

                {PLAN_TYPES.map((type) => {
                  const active = form.plan_type === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setField("plan_type", type)}
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
              <Field label="Price (₹)" required>
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
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </Field>

              <Field label="Billing Interval">
                <div className="relative">
                  <select
                    value={form.billing_interval}
                    onChange={(event) =>
                      setField(
                        "billing_interval",
                        event.target
                          .value as PlanFormValues["billing_interval"],
                      )
                    }
                    className={`${inputClass} cursor-pointer appearance-none pr-10 [&>option]:bg-[#0B0B0B]`}
                  >
                    <option value="">Not applicable</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40"
                  />
                </div>
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
                className={`${inputClass} min-h-[88px] resize-y`}
              />
            </Field>

            {/* Benefits (dynamic list) */}
            <Field label="Benefits">
              <div className="space-y-2.5">
                {form.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-xs font-medium text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      {index + 1}
                    </div>

                    <input
                      type="text"
                      value={benefit}
                      onChange={(event) =>
                        updateBenefit(index, event.target.value)
                      }
                      placeholder="e.g. Unlimited access to all courses"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      aria-label="Remove benefit"
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}

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

            {/* Active toggle */}
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
          </div>

          {/* ===================== Footer ===================== */}
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
              disabled={!canSubmit}
              className="group relative inline-flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#34D399]/30 bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 px-5 text-sm font-medium text-[#34D399] shadow-[0_0_20px_-8px_rgba(52,211,153,0.6)] transition-all duration-300 hover:border-[#34D399]/50 hover:from-[#34D399]/25 hover:shadow-[0_12px_30px_-12px_rgba(52,211,153,0.7)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">
                {mode === "edit" ? "Save Changes" : "Create Plan"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

/* -------------------------------- */
/* Field wrapper                    */
/* -------------------------------- */

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field = ({ label, required, children }: FieldProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/55">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
};

/* -------------------------------- */
/* Shared input class               */
/* -------------------------------- */

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 hover:border-white/[0.14] focus:border-[#34D399]/40 focus:bg-black/40 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]";

export default SubscriptionPlanFormModal;
