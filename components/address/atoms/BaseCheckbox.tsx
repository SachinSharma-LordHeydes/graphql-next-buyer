import React, { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface BaseCheckboxProps {
  label?: string;
  description?: string;
  error?: string | null;
  labelClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
}

export const BaseCheckbox = React.memo<BaseCheckboxProps>(({
  label,
  description,
  error,
  labelClassName,
  errorClassName,
  containerClassName,
  checkboxClassName,
  checked = false,
  onCheckedChange,
  disabled = false,
  name,
  required = false,
  id,
}) => {
  // Generate stable ID
  const checkboxId = useMemo(() => 
    id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`, 
    [id, name]
  );

  return (
    <div className={cn("space-y-1", containerClassName)}>
      <div className="flex items-start space-x-2">
        <Checkbox
          id={checkboxId}
          name={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          className={cn(checkboxClassName)}
          aria-invalid={!!error}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
        />
        <div className="space-y-1 flex-1">
          {label && (
            <Label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                labelClassName
              )}
            >
              {label} {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {error && (
        <p 
          id={`${checkboxId}-error`} 
          className={cn("text-sm text-red-500", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
});

BaseCheckbox.displayName = "BaseCheckbox";
