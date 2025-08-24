import React, { useMemo } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ADDRESS_TYPES, 
  NEPAL_PROVINCES, 
  AddressType, 
  NepalProvince,
  getAddressTypeColor,
  getAddressTypeIcon
} from '@/types/address';

interface BaseSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  className?: string;
  name?: string;
}

interface AddressTypeSelectProps extends BaseSelectProps {
  showIcons?: boolean;
}

interface ProvinceSelectProps extends BaseSelectProps {}

interface CountrySelectProps extends BaseSelectProps {}

// Memoized AddressType Select Component
export const AddressTypeSelect = React.memo<AddressTypeSelectProps>(({
  value,
  onValueChange,
  placeholder = "Select Address Type",
  error,
  disabled = false,
  className = "",
  name,
  showIcons = true,
}) => {
  // Memoize address type options to prevent re-creation
  const addressTypeOptions = useMemo(() => {
    return ADDRESS_TYPES.map((type) => ({
      value: type,
      label: type.charAt(0) + type.slice(1).toLowerCase(),
      icon: showIcons ? getAddressTypeIcon(type) : null,
      colorClass: getAddressTypeColor(type),
    }));
  }, [showIcons]);

  return (
    <div className="space-y-1">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger 
          className={`${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {addressTypeOptions.map(({ value: optionValue, label, icon, colorClass }) => (
            <SelectItem key={optionValue} value={optionValue}>
              <div className="flex items-center gap-2">
                {icon && <span className="text-sm">{icon}</span>}
                <span>{label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${colorClass}`}>
                  {optionValue}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

AddressTypeSelect.displayName = "AddressTypeSelect";

// Memoized Province Select Component
export const ProvinceSelect = React.memo<ProvinceSelectProps>(({
  value,
  onValueChange,
  placeholder = "Select Province",
  error,
  disabled = false,
  className = "",
  name,
}) => {
  // Memoize province options
  const provinceOptions = useMemo(() => {
    return NEPAL_PROVINCES.map((province) => ({
      value: province,
      label: province,
    }));
  }, []);

  return (
    <div className="space-y-1">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger 
          className={`${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {provinceOptions.map(({ value: optionValue, label }) => (
            <SelectItem key={optionValue} value={optionValue}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

ProvinceSelect.displayName = "ProvinceSelect";

// Memoized Country Select Component (focused on Nepal)
export const CountrySelect = React.memo<CountrySelectProps>(({
  value,
  onValueChange,
  placeholder = "Select Country",
  error,
  disabled = false,
  className = "",
  name,
}) => {
  // Memoize country options (can be extended later)
  const countryOptions = useMemo(() => [
    { value: "NP", label: "Nepal 🇳🇵" },
    { value: "IN", label: "India 🇮🇳" },
    { value: "CN", label: "China 🇨🇳" },
    { value: "BD", label: "Bangladesh 🇧🇩" },
    { value: "BT", label: "Bhutan 🇧🇹" },
  ], []);

  return (
    <div className="space-y-1">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger 
          className={`${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {countryOptions.map(({ value: optionValue, label }) => (
            <SelectItem key={optionValue} value={optionValue}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

CountrySelect.displayName = "CountrySelect";

// Generic Select Component for extensibility
interface GenericSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface GenericSelectProps extends BaseSelectProps {
  options: GenericSelectOption[];
  emptyMessage?: string;
}

export const GenericSelect = React.memo<GenericSelectProps>(({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  error,
  disabled = false,
  className = "",
  name,
  emptyMessage = "No options available",
}) => {
  return (
    <div className="space-y-1">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled || options.length === 0}
        name={name}
      >
        <SelectTrigger 
          className={`${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <div className="px-2 py-1 text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            options.map(({ value: optionValue, label, disabled: optionDisabled, icon }) => (
              <SelectItem 
                key={optionValue} 
                value={optionValue}
                disabled={optionDisabled}
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{label}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

GenericSelect.displayName = "GenericSelect";

// Export all components
export {
  type AddressTypeSelectProps,
  type ProvinceSelectProps,
  type CountrySelectProps,
  type GenericSelectProps,
  type GenericSelectOption,
};
