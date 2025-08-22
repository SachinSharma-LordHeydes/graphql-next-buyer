import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressItem from "./AddressItem";
import AddAddressForm from "./AddAddressForm";

export default function AddressesSection({ addresses, setAddresses }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Addresses</CardTitle>
          <Button onClick={() => setIsAdding(true)}>Add New Address</Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <AddAddressForm
            onCancel={() => setIsAdding(false)}
            onSave={(newAddress) => {
              setAddresses([...addresses, newAddress]);
              setIsAdding(false);
            }}
          />
        )}

        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              onSave={(updatedAddress) => {
                setAddresses(
                  addresses.map((a) =>
                    a.id === updatedAddress.id ? updatedAddress : a
                  )
                );
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
