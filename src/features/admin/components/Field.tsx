import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
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

export default Field;
