"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2, X, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUpdateAddressForm } from "@/hooks/address/useUnifiedAddressForm";
import { useUpdateAddress } from "@/hooks/address/useAddressMutations";
import { AddressFieldGroup } from "@/components/address/AddressFieldGroup";
import { BaseAddress, UpdateAddressFormData } from "@/types/address";

// Error Boundary Component
class UpdateAddressFormErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UpdateAddressForm Error:', error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong with the address form. Please refresh and try again.
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

interface UpdateAddressFormProps {
  address: BaseAddress;
  onCancel?: () => void;
  onSave?: (result: BaseAddress) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  showHeader?: boolean;
  compact?: boolean;
}

const UpdateAddressForm = React.memo<UpdateAddressFormProps>(function UpdateAddressForm({
  address,
  onCancel,
  onSave,
  onError,
  disabled = false,
  showHeader = true,
  compact = false,
}) {
  // Prepare initial data for the form
  const initialData: UpdateAddressFormData = useMemo(() => ({
    id: address.id!,
    type: address.type,
    label: address.label || "",
    line1: address.line1,
    line2: address.line2 || "",
    city: address.city,
    state: address.state,
    country: address.country,
    postalCode: address.postalCode,
    phone: address.phone || "",
    isDefault: address.isDefault,
  }), [address]);

  // Hooks
  const {
    formData,
    errors,
    isValid,
    isDirty,
    hasErrors,
    handleFieldChange,
    validateFullForm,
    reset,
    focusError,
    getSubmissionData,
  } = useUpdateAddressForm(initialData, {
    validateOnChange: true,
    onValidationChange: useCallback((errors, isValid) => {
      // Optional: Handle real-time validation feedback
    }, []),
  });

  const { submit, loading, error: mutationError, reset: resetMutation } = useUpdateAddress();

  // Refs
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Memoized handlers to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Validate form before submission
    const { isValid } = validateFullForm();
    if (!isValid) {
      focusError();
      return;
    }

    try {
      const submissionData = getSubmissionData() as UpdateAddressFormData;
      const result = await submit(submissionData);
      
      // Success feedback
      console.log("Address updated successfully:", result);
      
      if (onSave) {
        onSave(result);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Failed to update address:", error);
      onError?.(error);
    }
  }, [validateFullForm, focusError, getSubmissionData, submit, onSave, onError]);

  const handleCancel = useCallback(() => {
    reset();
    resetMutation();
    onCancel?.();
  }, [reset, resetMutation, onCancel]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  }, [handleSubmit, handleCancel]);

  // Memoized computed values
  const canSubmit = useMemo(() => {
    return isValid && !loading && isDirty;
  }, [isValid, loading, isDirty]);

  const showSuccessState = useMemo(() => {
    return !loading && !mutationError && !hasErrors && !isDirty;
  }, [loading, mutationError, hasErrors, isDirty]);

  const cardTitle = useMemo(() => {
    return `Edit ${address.label ? `"${address.label}"` : 'Address'}`;
  }, [address.label]);

  return (
    <UpdateAddressFormErrorBoundary onError={onError}>
      <Card className={`border-2 transition-all duration-200 hover:shadow-md ${compact ? 'mb-2' : 'mb-4'}`}>
        {showHeader && (
          <CardHeader className={compact ? "pb-2" : "pb-4"}>
            <div className="flex items-center justify-between">
              <CardTitle className={compact ? "text-lg" : "text-xl"}>
                {cardTitle}
              </CardTitle>
              {onCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                  disabled={loading}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
        )}
        
        <CardContent className={compact ? "p-3" : "p-4"}>
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="space-y-4"
            noValidate
          >
            {/* Address Fields */}
            <AddressFieldGroup
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              disabled={disabled || loading}
              layout={compact ? "stack" : "grid"}
              showTypeField={true}
              showDefaultCheckbox={true}
              className="mb-4"
            />

            {/* Success State */}
            {showSuccessState && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Address updated successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Error State */}
            {mutationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to update address: {mutationError.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {isDirty && (
                  <span className="text-orange-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    Unsaved changes
                  </span>
                )}
                {!isDirty && !showSuccessState && (
                  <span>No changes made</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="min-w-[80px]"
                >
                  Cancel
                </Button>
                <Button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={!canSubmit || disabled}
                  className="min-w-[120px] relative"
                >
                  {loading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {loading ? "Updating..." : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Address
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Keyboard Shortcuts Help */}
            {!compact && (
              <div className="text-xs text-muted-foreground text-center pt-2 border-t border-dashed">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Enter</kbd> to save, 
                <kbd className="px-2 py-1 bg-muted rounded text-xs ml-1">Esc</kbd> to cancel
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </UpdateAddressFormErrorBoundary>
  );
});

UpdateAddressForm.displayName = "UpdateAddressForm";

export default UpdateAddressForm;
