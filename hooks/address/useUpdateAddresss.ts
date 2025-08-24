import { UPDATE_ADDRESS } from "@/client/address/address.mutations";
import { GET_ADDRESS_OF_USER } from "@/client/address/address.queries";
import { useMutation } from "@apollo/client";
import { UpdateAddressForm } from "./useUpdateForm";

export const useUpdateAddress = () => {
  const [updateAddress, { loading, error }] = useMutation(UPDATE_ADDRESS, {
    refetchQueries: [{ query: GET_ADDRESS_OF_USER }],
    awaitRefetchQueries: true,
  });

  const submit = async (form: UpdateAddressForm) => {
    try {
      const result = await updateAddress({
        variables: { input: form },
        optimisticResponse: {
          updateAddress: {
            __typename: "Address",
            ...form,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      return result;
    } catch (err) {
      console.error("Error updating address:", err);
      throw err;
    }
  };

  return {
    submit,
    loading,
    error,
  };
};
