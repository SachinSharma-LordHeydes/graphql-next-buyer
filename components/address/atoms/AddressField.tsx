import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface AddressFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const AddressField = React.memo<AddressFieldProps>(({
  name,
  label,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  placeholder,
  type = "text",
  minLength,
  maxLength,
  className,
  labelClassName,
  errorClassName
}) => {
  const fieldId = `address-${name}`;
  
  return (
    <div className={cn("space-y-1", className)}>
      <Label 
        htmlFor={fieldId} 
        className={cn("text-sm font-medium", labelClassName)}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(
          "transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500"
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      
      {error && (
        <p 
          id={`${fieldId}-error`}
          className={cn("text-sm text-red-500", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
});

AddressField.displayName = "AddressField";
