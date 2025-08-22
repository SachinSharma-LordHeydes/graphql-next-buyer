"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Home } from "lucide-react";

interface AddressFormProps {
  onSubmit: (address: any) => void;
}

export function AddressForm({ onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState({
    type: "SHIPPING",
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "NP",
    phone: "",
    isDefault: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.line1.trim()) newErrors.line1 = "Line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "Province is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    // Validate phone number format (Nepal format, e.g., 10 digits starting with 98)
    const phoneRegex = /^98\d{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Nepal phone number (e.g., 9812345678)";
    }

    // Validate postal code format (Nepal format, 5 digits)
    const postalRegex = /^\d{5}$/;
    if (formData.postalCode && !postalRegex.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid 5-digit postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Address Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Address Details
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Label (Optional)
            </label>
            <Input
              type="text"
              value={formData.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              placeholder="e.g. Home, Office"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Line 1 *
            </label>
            <Input
              type="text"
              value={formData.line1}
              onChange={(e) => handleInputChange("line1", e.target.value)}
              placeholder="House number, street name, area"
              className={errors.line1 ? "border-red-500" : ""}
            />
            {errors.line1 && (
              <p className="text-red-500 text-sm mt-1">{errors.line1}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Line 2 (Optional)
            </label>
            <Input
              type="text"
              value={formData.line2}
              onChange={(e) => handleInputChange("line2", e.target.value)}
              placeholder="Apartment, suite, landmark"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                City *
              </label>
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="City"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Province *
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.state ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Province</option>
                <option value="Koshi Province">Koshi Province</option>
                <option value="Madhesh Province">Madhesh Province</option>
                <option value="Bagmati Province">Bagmati Province</option>
                <option value="Gandaki Province">Gandaki Province</option>
                <option value="Lumbini Province">Lumbini Province</option>
                <option value="Karnali Province">Karnali Province</option>
                <option value="Sudurpashchim Province">Sudurpashchim Province</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Postal Code *
              </label>
              <Input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="44600"
                className={errors.postalCode ? "border-red-500" : ""}
                maxLength={5}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Country *
            </label>
            <Input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="NP"
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                +977
              </span>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="9812345678"
                className={`rounded-l-none ${errors.phone ? "border-red-500" : ""}`}
                maxLength={10}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Type */}
      {/* <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Address Type
        </h3>

        <div className="flex gap-4 flex-wrap">
          {["SHIPPING", "BILLING", "BUSINESS", "WAREHOUSE"].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={formData.type === type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="mr-2"
              />
              <span className="text-sm font-medium">
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div> */}

      {/* Set as Default */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm font-medium">Set as default address</span>
        </label>
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full">
        Save Address
      </Button>
    </form>
  );
}