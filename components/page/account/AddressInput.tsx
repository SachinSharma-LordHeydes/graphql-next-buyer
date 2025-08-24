import { Input } from "@/components/ui/input";
import React from "react";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  type?:string;
  minLength?:number;
  maxLength?:number;
}

export const AddressInput = React.memo<AddressInputProps>(
  ({ value, onChange, placeholder, error, required = false,type="string" ,minLength,maxLength }) => (
    <div className="space-y-1">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? "border-red-500" : ""}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${placeholder}-error` : undefined}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
      />
      {error && (
        <p id={`${placeholder}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
);

AddressInput.displayName = "AddressInput";
