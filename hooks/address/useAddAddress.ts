import { ADD_ADDRESS } from "@/client/address/address.mutations";
import { GET_ADDRESS_OF_USER } from "@/client/address/address.queries";
import { useMutation } from "@apollo/client";
import type { AddressForm } from "./useAddressForm";

export const useAddAddress = () => {
  const [addAddress, { loading, error, data }] = useMutation(ADD_ADDRESS, {
    refetchQueries: [{ query: GET_ADDRESS_OF_USER }],
    awaitRefetchQueries: true,
  });

  const submit = async (form: AddressForm) => {
    try {
      const result = await addAddress({
        variables: { input: form },
        optimisticResponse: {
          addAddress: {
            __typename: "Address",
            id: "temp-id",
            ...form,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      });
      return result;
    } catch (err) {
      console.error("Error adding address:", err);
      throw err;
    }
  };

  return {
    submit,
    loading,
    error,
    data,
  };
};
