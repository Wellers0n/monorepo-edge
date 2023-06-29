import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Assignor } from "@/types";
import postCreateAssignor from "@/services/postCreateAssignor";

type Data = {
  name: string;
  document: string;
  phone: string;
  email: string;
};

type Error = {
  message: string;
};

const useCreateAssignorMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, document, phone, email }: Data) =>
      postCreateAssignor({
        data: {
          name,
          document,
          phone,
          email,
        },
      }),
    onSuccess: (data: Assignor) => {
      enqueueSnackbar({
        message: "Cedente criada com sucesso!",
        variant: "success",
      });

      queryClient.refetchQueries({
        queryKey: ["assignors"],
        exact: false,
        type: "active",
      });
    },
    onError: (error: AxiosError<Error>) => {
      return enqueueSnackbar({
        message: "Error ao criar o cedente!",
        variant: "error",
      });
    },
  });

  return { mutate, isLoading };
};

export default useCreateAssignorMutation;
