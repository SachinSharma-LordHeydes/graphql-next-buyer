import React, { useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AddressTypeSelect, 
  ProvinceSelect, 
  CountrySelect 
} from '@/components/ui/AddressSelect';
import { AddressFormData } from '@/types/address';
import { formatPhoneNumber, cleanPhoneNumber } from '@/types/address';

// Base Field Props
interface BaseFieldProps {
  name: keyof AddressFormData;
  value: any;
  onChange: (value: any) => void;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// Individual Field Components (Memoized)
const LabelField = React.memo<BaseFieldProps & { placeholder?: string }>(({
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  className,
  placeholder = "e.g., Home, Office",
}) => (
  <div className={`space-y-1 ${className}`}>
    <Label htmlFor={name} className="text-sm font-medium">
      Label {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={error ? "border-red-500 focus:border-red-500" : ""}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
));

LabelField.displayName = "LabelField";

const AddressLineField = React.memo<BaseFieldProps & { 
  placeholder: string; 
  label: string;
}>(({
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  className,
  placeholder,
  label,
}) => (
  <div className={`space-y-1 ${className}`}>
    <Label htmlFor={name} className="text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={error ? "border-red-500 focus:border-red-500" : ""}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      maxLength={100}
    />
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
));

AddressLineField.displayName = "AddressLineField";

const CityField = React.memo<BaseFieldProps>(({
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  className,
}) => (
  <div className={`space-y-1 ${className}`}>
    <Label htmlFor={name} className="text-sm font-medium">
      City {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter city"
      disabled={disabled}
      required={required}
      className={error ? "border-red-500 focus:border-red-500" : ""}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      maxLength={50}
    />
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
));

CityField.displayName = "CityField";

const PostalCodeField = React.memo<BaseFieldProps>(({
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  className,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    if (numericValue.length <= 5) {
      onChange(numericValue);
    }
  }, [onChange]);

  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium">
        Postal Code {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value || ''}
        onChange={handleChange}
        placeholder="44600"
        disabled={disabled}
        required={required}
        className={error ? "border-red-500 focus:border-red-500" : ""}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        maxLength={5}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

PostalCodeField.displayName = "PostalCodeField";

const PhoneField = React.memo<BaseFieldProps>(({
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  className,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = cleanPhoneNumber(e.target.value);
    if (cleanedValue.length <= 10) {
      onChange(cleanedValue);
    }
  }, [onChange]);

  const displayValue = useMemo(() => {
    return value ? formatPhoneNumber(value) : '';
  }, [value]);

  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium">
        Phone {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          +977
        </span>
        <Input
          id={name}
          name={name}
          type="tel"
          inputMode="tel"
          value={value || ''}
          onChange={handleChange}
          placeholder="9812345678"
          disabled={disabled}
          required={required}
          className={`rounded-l-none ${error ? "border-red-500 focus:border-red-500" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          maxLength={10}
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

PhoneField.displayName = "PhoneField";

const DefaultCheckboxField = React.memo<BaseFieldProps>(({
  name,
  value,
  onChange,
  disabled,
  className,
}) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <Checkbox
      id={name}
      name={name}
      checked={!!value}
      onCheckedChange={(checked) => onChange(!!checked)}
      disabled={disabled}
    />
    <Label
      htmlFor={name}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Set as default address
    </Label>
  </div>
));

DefaultCheckboxField.displayName = "DefaultCheckboxField";

// Main AddressFieldGroup Component
interface AddressFieldGroupProps {
  formData: AddressFormData;
  errors: Record<keyof AddressFormData, string | null>;
  onFieldChange: (field: keyof AddressFormData, value: any) => void;
  disabled?: boolean;
  layout?: 'grid' | 'stack';
  showTypeField?: boolean;
  showDefaultCheckbox?: boolean;
  className?: string;
}

export const AddressFieldGroup = React.memo<AddressFieldGroupProps>(({
  formData,
  errors,
  onFieldChange,
  disabled = false,
  layout = 'grid',
  showTypeField = true,
  showDefaultCheckbox = true,
  className = "",
}) => {
  // Memoize grid layout class
  const layoutClass = useMemo(() => {
    return layout === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
      : 'space-y-4';
  }, [layout]);

  // Memoize field props to prevent unnecessary re-renders
  const fieldProps = useMemo(() => {
    return Object.keys(formData).reduce((acc, field) => {
      const fieldName = field as keyof AddressFormData;
      acc[fieldName] = {
        name: fieldName,
        value: formData[fieldName],
        onChange: (value: any) => onFieldChange(fieldName, value),
        error: errors[fieldName],
        disabled,
      };
      return acc;
    }, {} as Record<keyof AddressFormData, BaseFieldProps>);
  }, [formData, errors, onFieldChange, disabled]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Type and Label Row */}
      {showTypeField && (
        <div className={layoutClass}>
          <LabelField {...fieldProps.label} className="" />
          <div className="space-y-1">
            <Label htmlFor="type" className="text-sm font-medium">
              Address Type <span className="text-red-500">*</span>
            </Label>
            <AddressTypeSelect
              name="type"
              value={formData.type}
              onValueChange={(value) => onFieldChange('type', value)}
              error={errors.type}
              disabled={disabled}
              showIcons={true}
            />
          </div>
        </div>
      )}

      {/* Address Lines */}
      <div className={layoutClass}>
        <AddressLineField
          {...fieldProps.line1}
          label="Address Line 1"
          placeholder="House number, street name, area"
          required
        />
        <AddressLineField
          {...fieldProps.line2}
          label="Address Line 2"
          placeholder="Apartment, suite, landmark (optional)"
          required={false}
        />
      </div>

      {/* Location Fields */}
      <div className={layoutClass}>
        <CityField {...fieldProps.city} required />
        <div className="space-y-1">
          <Label htmlFor="state" className="text-sm font-medium">
            Province <span className="text-red-500">*</span>
          </Label>
          <ProvinceSelect
            name="state"
            value={formData.state}
            onValueChange={(value) => onFieldChange('state', value)}
            error={errors.state}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Postal Code and Country */}
      <div className={layoutClass}>
        <PostalCodeField {...fieldProps.postalCode} required />
        <div className="space-y-1">
          <Label htmlFor="country" className="text-sm font-medium">
            Country <span className="text-red-500">*</span>
          </Label>
          <CountrySelect
            name="country"
            value={formData.country}
            onValueChange={(value) => onFieldChange('country', value)}
            error={errors.country}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Phone Field */}
      <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
        <PhoneField {...fieldProps.phone} />
      </div>

      {/* Default Checkbox */}
      {showDefaultCheckbox && (
        <DefaultCheckboxField {...fieldProps.isDefault} />
      )}
    </div>
  );
});

AddressFieldGroup.displayName = "AddressFieldGroup";

// Specialized field group variants
export const AddressFieldGroupStacked = React.memo<Omit<AddressFieldGroupProps, 'layout'>>(
  (props) => <AddressFieldGroup {...props} layout="stack" />
);

AddressFieldGroupStacked.displayName = "AddressFieldGroupStacked";

export const AddressFieldGroupCompact = React.memo<AddressFieldGroupProps>(({
  showTypeField = false,
  showDefaultCheckbox = false,
  ...props
}) => (
  <AddressFieldGroup
    {...props}
    showTypeField={showTypeField}
    showDefaultCheckbox={showDefaultCheckbox}
  />
));

AddressFieldGroupCompact.displayName = "AddressFieldGroupCompact";

// Export individual field components for custom layouts
export {
  LabelField,
  AddressLineField,
  CityField,
  PostalCodeField,
  PhoneField,
  DefaultCheckboxField,
};
