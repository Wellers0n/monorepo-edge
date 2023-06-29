import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import getPayables from "@/services/getPayables";
import { Payables } from "@/types";

type Params = {
  limit?: number;
  offset?: number;
  assignorId?: number;
};

type Props = {
  params?: Params;
};

type Response = {
  totalPages: number;
  payables: Payables[];
};

const usePayablesData = (props: Props) => {
  const { params = {} } = props;

  const { data, error, isLoading } = useQuery<Response, AxiosError<Error>>(
    ["payables", params],
    () =>
      getPayables({
        params,
      }),
    {
      refetchOnWindowFocus: true,
    }
  );

  if (error) {
    enqueueSnackbar({
      message:
        error.response?.data?.message ||
        "Algo deu errado ao buscar os recebíveis!",
      variant: "error",
    });
  }

  return { data, error, isLoading };
};

export default usePayablesData;
