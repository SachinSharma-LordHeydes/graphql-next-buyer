import { GET_ADDRESS_OF_USER } from "@/client/address/address.mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";
import AddressItem from "./AddressItem";

export default function AddressesSection({ setAddresses }) {
  const {
    data: addressOfUser,
    loading: addressOfUserLoading,
    error: addressOfUserError,
  } = useQuery(GET_ADDRESS_OF_USER);

  const addresses = addressOfUser?.getAddressOfUser;

  if (addressOfUserLoading) console.log("loading");
  if (addressOfUserLoading) console.log(`${addressOfUserError}`);

  console.log("addressOfUser", addressOfUser);
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
          {!addressOfUserLoading &&
            addresses?.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                onSave={(updatedAddress) => {
                  setAddresses(
                    addresses?.map((a) =>
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
