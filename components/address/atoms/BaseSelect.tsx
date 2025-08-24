import React, { useMemo } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface BaseSelectProps {
  label?: string;
  error?: string | null;
  required?: boolean;
  description?: string;
  labelClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  showLabel?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  options: SelectOption[];
  emptyMessage?: string;
}

export const BaseSelect = React.memo<BaseSelectProps>(({
  label,
  error,
  required = false,
  description,
  labelClassName,
  errorClassName,
  containerClassName,
  showLabel = true,
  value,
  onValueChange,
  placeholder = "Select an option",
  disabled = false,
  className,
  name,
  options,
  emptyMessage = "No options available",
}) => {
  const selectId = useMemo(() => 
    name || `select-${Math.random().toString(36).substr(2, 9)}`, 
    [name]
  );

  return (
    <div className={cn("space-y-1", containerClassName)}>
      {showLabel && label && (
        <Label 
          htmlFor={selectId} 
          className={cn("text-sm font-medium", labelClassName)}
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled || options.length === 0}
        name={name}
      >
        <SelectTrigger 
          id={selectId}
          className={cn(
            error ? "border-red-500 focus:border-red-500" : "",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <div className="px-2 py-1 text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            options.map(({ value: optionValue, label: optionLabel, disabled: optionDisabled, icon, description: optionDescription }) => (
              <SelectItem 
                key={optionValue} 
                value={optionValue}
                disabled={optionDisabled}
              >
                <div className="flex items-center gap-2 w-full">
                  {icon && <span className="flex-shrink-0">{icon}</span>}
                  <div className="flex-1">
                    <span>{optionLabel}</span>
                    {optionDescription && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {optionDescription}
                      </p>
                    )}
                  </div>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      
      {error && (
        <p 
          id={`${selectId}-error`} 
          className={cn("text-sm text-red-500", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
});

BaseSelect.displayName = "BaseSelect";
