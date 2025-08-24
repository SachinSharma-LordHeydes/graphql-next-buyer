"use client";

import { DELETE_ADDRESS_BY_ID } from "@/client/address/address.mutations";
import UpdateAddressForm from "@/components/address/UpdateAddressForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BaseAddress,
  formatAddress,
  formatPhoneNumber,
  getAddressTypeColor,
} from "@/types/address";
import { useMutation } from "@apollo/client";
import { Edit2, MapPin, Phone, Star, Trash2 } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

interface AddressItemProps {
  address: BaseAddress;
  onSave?: (updatedAddress: BaseAddress) => void;
  onDelete?: (addressId: string) => void;
  disabled?: boolean;
}

const AddressItem = React.memo<AddressItemProps>(function AddressItem({
  address,
  onSave,
  onDelete,
  disabled = false,
}) {
  const [deleteAddressById] = useMutation(DELETE_ADDRESS_BY_ID, {
    update(cache, { data }) {
      if (!data?.deleteAddressById) return;

      cache.modify({
        fields: {
          getAddresses(existingAddresses = []) {
            return existingAddresses.filter(
              (addr: any) => addr.id !== data.deleteAddressById.id
            );
          },
        },
      });
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleSave = useCallback(
    (updatedAddress: BaseAddress) => {
      setIsEditing(false);
      onSave?.(updatedAddress);
    },
    [onSave]
  );

  const handleDeleteClick = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!address.id) return;
    try {
      setLoading(true);
      await deleteAddressById({
        variables: {
          id: address.id,
        },
      });
      setShowConfirm(false);
      setLoading(false);
      onDelete?.(address.id); // notify parent
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage("Something went wrong!");
      setTimeout(() => setErrorMessage(null), 2500);
    }
  }, [address.id, deleteAddressById, onDelete]);

  // Memoized computed values
  const displayAddress = useMemo(() => formatAddress(address), [address]);
  const displayPhone = useMemo(
    () => (address.phone ? formatPhoneNumber(address.phone) : null),
    [address.phone]
  );
  const typeColorClass = useMemo(
    () => getAddressTypeColor(address.type),
    [address.type]
  );

  if (isEditing) {
    return (
      <UpdateAddressForm
        address={address}
        onSave={handleSave}
        onCancel={handleCancelEdit}
        showHeader={false}
        compact={true}
        disabled={disabled}
      />
    );
  }

  return (
    <>
      <Card className="border-2 transition-all duration-200 hover:shadow-md group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              {/* Header with label, type, and default badge */}
              <div className="flex items-center gap-2 flex-wrap">
                {address.label && (
                  <h3 className="font-semibold text-lg">{address.label}</h3>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${typeColorClass}`}
                >
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Default
                  </span>
                )}
              </div>

              {/* Address details */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground/60" />
                  <div className="flex-1">
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    {address.country !== "NP" && <p>{address.country}</p>}
                  </div>
                </div>

                {displayPhone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-muted-foreground/60" />
                    <span>{displayPhone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                disabled={disabled}
                className="h-8 w-8 p-0"
                title="Edit address"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteClick}
                disabled={disabled || address.isDefault}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                title={
                  address.isDefault
                    ? "Cannot delete default address"
                    : "Delete address"
                }
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

AddressItem.displayName = "AddressItem";
export default AddressItem;
