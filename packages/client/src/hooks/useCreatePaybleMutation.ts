import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Payables } from "@/types";
import postCreatePayable from "@/services/postCreatePayable";

type Data = {
  value: number;
  assignorId: number;
};

type Error = {
  message: string;
};

const useCreateAssignorMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ value, assignorId }: Data) =>
      postCreatePayable({
        data: {
          value,
          assignorId,
        },
      }),
    onSuccess: (data: Payables) => {
      enqueueSnackbar({
        message: "Recebível criado com sucesso!",
        variant: "success",
      });

      queryClient.refetchQueries({
        queryKey: ["payables"],
        exact: false,
        type: "active",
      });
    },
    onError: (error: AxiosError<Error>) => {
      return enqueueSnackbar({
        message: "Error ao criar o recebível!",
        variant: "error",
      });
    },
  });

  return { mutate, isLoading };
};

export default useCreateAssignorMutation;
