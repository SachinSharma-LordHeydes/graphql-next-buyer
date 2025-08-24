import { useCallback, useRef, useState, useMemo } from 'react';
import { 
  AddressFormData, 
  UpdateAddressFormData, 
  AddressValidationErrors, 
  getDefaultAddressForm 
} from '@/types/address';
import { useAddressValidation } from './useAddressValidation';

type FormMode = 'create' | 'update';

interface UseUnifiedAddressFormOptions {
  mode?: FormMode;
  initialData?: Partial<AddressFormData> | UpdateAddressFormData;
  validateOnChange?: boolean;
  onFieldChange?: (field: keyof AddressFormData, value: any) => void;
  onValidationChange?: (errors: AddressValidationErrors, isValid: boolean) => void;
}

export const useUnifiedAddressForm = (options: UseUnifiedAddressFormOptions = {}) => {
  const {
    mode = 'create',
    initialData = {},
    validateOnChange = true,
    onFieldChange,
    onValidationChange,
  } = options;

  // Validation hook
  const { 
    validateForm, 
    validateSingleField, 
    checkIsValid, 
    focusFirstError 
  } = useAddressValidation();

  // Memoize initial form state to prevent unnecessary resets
  const initialFormState = useMemo(() => {
    if (mode === 'update' && 'id' in initialData) {
      return { ...getDefaultAddressForm(), ...initialData };
    }
    return { ...getDefaultAddressForm(), ...initialData };
  }, [mode, initialData]);

  // Form state
  const [formData, setFormData] = useState<AddressFormData>(initialFormState);
  const [errors, setErrors] = useState<AddressValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof AddressFormData>>(new Set());

  // Ref to track if form is dirty
  const isDirtyRef = useRef(false);

  // Memoized computed values
  const computedValues = useMemo(() => {
    const isValid = checkIsValid(errors);
    const hasErrors = Object.keys(errors).length > 0;
    const touchedFieldsArray = Array.from(touchedFields);
    const hasUntouchedErrors = Object.keys(errors).some(
      field => !touchedFields.has(field as keyof AddressFormData)
    );

    return {
      isValid,
      hasErrors,
      touchedFieldsArray,
      hasUntouchedErrors,
      isDirty: isDirtyRef.current,
    };
  }, [errors, touchedFields, checkIsValid]);

  // Memoized change handler
  const handleFieldChange = useCallback((
    field: keyof AddressFormData,
    value: any,
    shouldValidate: boolean = validateOnChange
  ) => {
    // Update form data
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Mark as dirty
      isDirtyRef.current = true;
      
      // Call external change handler
      onFieldChange?.(field, value);
      
      return newData;
    });

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(field));

    // Validate field if needed
    if (shouldValidate) {
      const fieldError = validateSingleField(field, value);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (fieldError) {
          newErrors[field] = fieldError;
        } else {
          delete newErrors[field];
        }
        
        // Call validation change handler
        onValidationChange?.(newErrors, checkIsValid(newErrors));
        
        return newErrors;
      });
    }
  }, [validateOnChange, validateSingleField, checkIsValid, onFieldChange, onValidationChange]);

  // Batch update multiple fields
  const handleBatchChange = useCallback((updates: Partial<AddressFormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      isDirtyRef.current = true;
      return newData;
    });

    // Mark all updated fields as touched
    setTouchedFields(prev => {
      const newTouched = new Set(prev);
      Object.keys(updates).forEach(key => {
        newTouched.add(key as keyof AddressFormData);
      });
      return newTouched;
    });

    // Validate updated fields if enabled
    if (validateOnChange) {
      const newErrors: AddressValidationErrors = { ...errors };
      let hasChanges = false;

      Object.entries(updates).forEach(([field, value]) => {
        const fieldError = validateSingleField(field as keyof AddressFormData, value);
        if (fieldError) {
          newErrors[field as keyof AddressFormData] = fieldError;
          hasChanges = true;
        } else if (newErrors[field as keyof AddressFormData]) {
          delete newErrors[field as keyof AddressFormData];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setErrors(newErrors);
        onValidationChange?.(newErrors, checkIsValid(newErrors));
      }
    }
  }, [errors, validateOnChange, validateSingleField, checkIsValid, onValidationChange]);

  // Full form validation
  const validateFullForm = useCallback((data: AddressFormData = formData) => {
    const newErrors = validateForm(data);
    setErrors(newErrors);
    
    const isValid = checkIsValid(newErrors);
    onValidationChange?.(newErrors, isValid);
    
    return { errors: newErrors, isValid };
  }, [formData, validateForm, checkIsValid, onValidationChange]);

  // Reset form
  const reset = useCallback((newData?: Partial<AddressFormData>) => {
    const resetData = newData ? { ...initialFormState, ...newData } : initialFormState;
    setFormData(resetData);
    setErrors({});
    setTouchedFields(new Set());
    isDirtyRef.current = false;
  }, [initialFormState]);

  // Get form data for submission
  const getSubmissionData = useCallback(() => {
    if (mode === 'update' && 'id' in initialData) {
      return {
        id: (initialData as UpdateAddressFormData).id,
        ...formData,
      } as UpdateAddressFormData;
    }
    return formData;
  }, [mode, initialData, formData]);

  // Focus first error
  const focusError = useCallback(() => {
    return focusFirstError(errors);
  }, [focusFirstError, errors]);

  // Field-specific helpers
  const getFieldError = useCallback((field: keyof AddressFormData) => {
    return errors[field] || null;
  }, [errors]);

  const getFieldValue = useCallback((field: keyof AddressFormData) => {
    return formData[field];
  }, [formData]);

  const isFieldTouched = useCallback((field: keyof AddressFormData) => {
    return touchedFields.has(field);
  }, [touchedFields]);

  const markFieldTouched = useCallback((field: keyof AddressFormData) => {
    setTouchedFields(prev => new Set(prev).add(field));
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((field: keyof AddressFormData) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    // Form data
    formData,
    errors,
    touchedFields: computedValues.touchedFieldsArray,
    
    // Computed state
    isValid: computedValues.isValid,
    hasErrors: computedValues.hasErrors,
    hasUntouchedErrors: computedValues.hasUntouchedErrors,
    isDirty: computedValues.isDirty,
    
    // Actions
    handleFieldChange,
    handleBatchChange,
    validateFullForm,
    reset,
    focusError,
    
    // Field helpers
    getFieldError,
    getFieldValue,
    isFieldTouched,
    markFieldTouched,
    clearFieldError,
    
    // Submission
    getSubmissionData,
    
    // Form mode
    mode,
  };
};

// Specialized hooks for create and update
export const useCreateAddressForm = (
  initialData?: Partial<AddressFormData>,
  options?: Omit<UseUnifiedAddressFormOptions, 'mode' | 'initialData'>
) => {
  return useUnifiedAddressForm({
    ...options,
    mode: 'create',
    initialData,
  });
};

export const useUpdateAddressForm = (
  initialData: UpdateAddressFormData,
  options?: Omit<UseUnifiedAddressFormOptions, 'mode' | 'initialData'>
) => {
  return useUnifiedAddressForm({
    ...options,
    mode: 'update',
    initialData,
  });
};
