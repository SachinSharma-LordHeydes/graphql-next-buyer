"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Same AddressType enum from Prisma
const ADDRESS_TYPES = ["SHIPPING", "BILLING", "BUSINESS", "WAREHOUSE"];

export default function AddAddressForm({ onCancel, onSave }) {
  const [form, setForm] = useState({
    type: "SHIPPING",
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "NP", // default from schema
    postalCode: "",
    phone: "",
    isDefault: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newAddress = {
      id: Date.now().toString(), // replace with backend ID after mutation
      ...form,
    };
    onSave(newAddress);
  };

  return (
    <Card className="border-2 mb-4">
      <CardContent className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Label (Home, Office)"
            value={form.label}
            onChange={(e) => handleChange("label", e.target.value)}
          />

          <Select
            value={form.type}
            onValueChange={(val) => handleChange("type", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {ADDRESS_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Address Line 1"
            value={form.line1}
            onChange={(e) => handleChange("line1", e.target.value)}
          />
          <Input
            placeholder="Address Line 2"
            value={form.line2}
            onChange={(e) => handleChange("line2", e.target.value)}
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
          <Input
            placeholder="Country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
          <Input
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={form.isDefault}
            onCheckedChange={(val) => handleChange("isDefault", !!val)}
          />
          <span>Set as default address</span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleSubmit}>
            Save Address
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
