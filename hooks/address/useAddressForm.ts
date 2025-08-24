import { useState } from "react";

export interface AddressForm {
  id?: string;
  type: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

const initialFormState: AddressForm = {
  type: "SHIPPING",
  label: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  country: "NP",
  postalCode: "",
  phone: "",
  isDefault: false,
};

export const useAddressForm = (initial: Partial<AddressForm> = {}) => {
  const [form, setForm] = useState<AddressForm>({
    ...initialFormState,
    ...initial,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressForm, string>>
  >({});

  const handleChange = (field: keyof AddressForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressForm, string>> = {};

    if (!form.label.trim()) newErrors.label = "Address label is required";
    if (!form.line1.trim()) newErrors.line1 = "Address line 1 is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      newErrors.phone = "Phone number is required";
    if (form.phone && !/^\+?[\d\s-()]{10,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setForm({ ...initialFormState, ...initial });
    setErrors({});
  };

  return {
    form,
    handleChange,
    setForm,
    errors,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
};
