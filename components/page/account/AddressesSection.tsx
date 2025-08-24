import { GET_ADDRESS_OF_USER } from "@/client/address/address.queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BaseAddress } from "@/types/address";
import { useQuery } from "@apollo/client";
import { AlertCircle, MapPin, Plus } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import AddressItem from "./AddressItem";

const AddressItemSkeleton = React.memo(() => (
  <Card className="border-2">
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </CardContent>
  </Card>
));

AddressItemSkeleton.displayName = "AddressItemSkeleton";

interface AddressesSectionProps {
  setAddresses?: (addresses: BaseAddress[]) => void;
}

const AddressesSection = React.memo<AddressesSectionProps>(
  function AddressesSection({ setAddresses }) {
    const {
      data: addressOfUser,
      loading: addressOfUserLoading,
      error: addressOfUserError,
      refetch,
    } = useQuery(GET_ADDRESS_OF_USER, {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    });

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const addresses = useMemo(() => {
      return (addressOfUser?.getAddressOfUser || []) as BaseAddress[];
    }, [addressOfUser]);
    const handleAddNew = useCallback(() => {
      setIsAdding(true);
      setError(null);
    }, []);

    const handleCancelAdd = useCallback(() => {
      setIsAdding(false);
      setError(null);
    }, []);

    const handleAddressSaved = useCallback(
      (newAddress: BaseAddress) => {
        setIsAdding(false);
        setError(null);
        const updatedAddresses = [...addresses, newAddress];
        setAddresses?.(updatedAddresses);
        refetch();
      },
      [addresses, setAddresses, refetch]
    );

    const handleAddressUpdated = useCallback(
      (updatedAddress: BaseAddress) => {
        setError(null);
        const updatedAddresses = addresses.map((a) =>
          a.id === updatedAddress.id ? updatedAddress : a
        );
        setAddresses?.(updatedAddresses);
        refetch();
      },
      [addresses, setAddresses, refetch]
    );

    // const handleAddressDeleted = useCallback((addressId: string) => {
    //   console.log("Delete address:", addressId);
    //   setError(new Error("Delete functionality not implemented yet"));
    // }, []);

    const handleAddressDeleted = useCallback(
      (addressId: string) => {
        const updatedAddresses = addresses.filter((a) => a.id !== addressId);
        setAddresses?.(updatedAddresses); // update local state if parent cares
        refetch(); // also refresh from server
      },
      [addresses, setAddresses, refetch]
    );
    const handleError = useCallback((error: Error) => {
      setError(error);
      console.error("Address operation error:", error);
    }, []);

    const handleRetry = useCallback(() => {
      setError(null);
      refetch();
    }, [refetch]);
    const hasAddresses = useMemo(() => {
      return addresses.length > 0;
    }, [addresses.length]);

    const defaultAddress = useMemo(() => {
      return addresses.find((addr) => addr.isDefault);
    }, [addresses]);
    if (addressOfUserLoading) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                My Addresses
              </CardTitle>
              <Skeleton className="h-10 w-32" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <AddressItemSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="transition-all duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              My Addresses
              {hasAddresses && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({addresses.length})
                </span>
              )}
            </CardTitle>
            <Button
              onClick={handleAddNew}
              disabled={isAdding}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Global Error Display */}
          {(addressOfUserError || error) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>
                  {addressOfUserError?.message ||
                    error?.message ||
                    "An error occurred"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="ml-2"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Add Address Form */}
          {isAdding && (
            <AddAddressForm
              onCancel={handleCancelAdd}
              onSave={handleAddressSaved}
              onError={handleError}
            />
          )}

          {/* Default Address Highlight */}
          {defaultAddress && !isAdding && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-amber-800">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Default Address:</span>
                <span>{defaultAddress.label || "Unnamed Address"}</span>
              </div>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {hasAddresses
              ? addresses.map((address) => (
                  <AddressItem
                    key={
                      address.id ||
                      `address-${address.line1}-${address.postalCode}`
                    }
                    address={address}
                    onSave={handleAddressUpdated}
                    onDelete={handleAddressDeleted}
                    disabled={addressOfUserLoading}
                  />
                ))
              : !isAdding && (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      No addresses yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your first address to get started with orders and
                      deliveries.
                    </p>
                    <Button
                      onClick={handleAddNew}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Address
                    </Button>
                  </div>
                )}
          </div>

          {/* Loading overlay for operations */}
          {addressOfUserLoading && hasAddresses && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">
                  Updating addresses...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

AddressesSection.displayName = "AddressesSection";

export default AddressesSection;
