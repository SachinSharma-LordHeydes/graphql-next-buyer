import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface AddressSelectFieldProps {
  name: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  showIcons?: boolean;
}

export const AddressSelectField = React.memo<AddressSelectFieldProps>(({
  name,
  label,
  value,
  onValueChange,
  options,
  error,
  disabled = false,
  required = false,
  placeholder = "Select an option",
  className,
  labelClassName,
  errorClassName,
  showIcons = false
}) => {
  const fieldId = `address-select-${name}`;
  
  return (
    <div className={cn("space-y-1", className)}>
      <Label 
        htmlFor={fieldId} 
        className={cn("text-sm font-medium", labelClassName)}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={fieldId}
          className={cn(
            "transition-colors",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="flex items-center gap-2"
            >
              {showIcons && option.icon && (
                <span className="flex-shrink-0">{option.icon}</span>
              )}
              <div className="flex">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
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

AddressSelectField.displayName = "AddressSelectField";
