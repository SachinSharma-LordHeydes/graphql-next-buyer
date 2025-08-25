import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

export interface AddressCheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const AddressCheckboxField = React.memo<AddressCheckboxFieldProps>(
  ({
    name,
    label,
    checked,
    onCheckedChange,
    error,
    disabled = false,
    required = false,
    description,
    className,
    labelClassName,
    errorClassName,
  }) => {
    const fieldId = `address-checkbox-${name}`;

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-start space-x-2">
          <Checkbox
            id={fieldId}
            name={name}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            className={cn(
              "mt-1",
              error && "border-red-500 data-[state=checked]:bg-red-500"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />

          <div className="space-y-1">
            <Label
              htmlFor={fieldId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                labelClassName
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

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
  }
);

AddressCheckboxField.displayName = "AddressCheckboxField";
