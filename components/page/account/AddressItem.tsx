// ./AddressItem.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export default function AddressItem({ address, onSave }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedAddress, setEditedAddress] = useState(address);
console.log("address-->",address)
  const handleSave = () => {
    console.log("editedAddress",editedAddress)
    onSave(editedAddress);
    setIsEditing(false);
  };

  return (
    <Card className="border-2">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{address?.label}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  address?.type === "SHIPPING"
                    ? "bg-blue-100 text-blue-800"
                    : address?.type === "BILLING"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {address?.type}
              </span>
              {address?.isDefault && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  Default
                </span>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Address Line 1"
                    defaultValue={address?.line1}
                  />
                  <Input
                    placeholder="Address Line 2"
                    defaultValue={address?.line2 || ""}
                  />
                  <Input placeholder="City" defaultValue={address?.city} />
                  <Input placeholder="State" defaultValue={address?.state} />
                  <Input placeholder="Country" defaultValue={address?.country} />
                  <Input
                    placeholder="Postal Code"
                    defaultValue={address?.postalCode}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSave()}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditedAddress(false);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>{address?.line1}</p>
                {address?.line2 && <p>{address?.line2}</p>}
                <p>
                  {address?.city}, {address?.state} {address?.postalCode}
                </p>
                <p>{address?.country}</p>
                {address?.phone && <p>Phone: {address?.phone}</p>}
              </div>
            )}
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={14} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
