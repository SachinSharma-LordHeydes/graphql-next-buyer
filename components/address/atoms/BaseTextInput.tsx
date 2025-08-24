import React, { forwardRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface BaseTextInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  label?: string;
  error?: string | null;
  required?: boolean;
  description?: string;
  labelClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  showLabel?: boolean;
  onChange?: (value: string) => void;
}

export const BaseTextInput = forwardRef<HTMLInputElement, BaseTextInputProps>(({
  label,
  error,
  required = false,
  description,
  labelClassName,
  errorClassName,
  containerClassName,
  showLabel = true,
  onChange,
  className,
  id,
  name,
  ...props
}, ref) => {
  // Generate stable ID if not provided
  const inputId = useMemo(() => id || name || `input-${Math.random().toString(36).substr(2, 9)}`, [id, name]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cn("space-y-1", containerClassName)}>
      {showLabel && label && (
        <Label 
          htmlFor={inputId} 
          className={cn("text-sm font-medium", labelClassName)}
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      <Input
        ref={ref}
        id={inputId}
        name={name}
        onChange={handleChange}
        className={cn(
          error ? "border-red-500 focus:border-red-500" : "",
          className
        )}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`} 
          className={cn("text-sm text-red-500", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
});

BaseTextInput.displayName = "BaseTextInput";
