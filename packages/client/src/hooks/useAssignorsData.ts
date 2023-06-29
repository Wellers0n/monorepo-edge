import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import getAssignors from "@/services/getAssignors";
import { Assignor } from "@/types";

type Params = {
  limit?: number;
  offset?: number;
};

type Props = {
  params?: Params;
};

type Response = {
  // limit: number
  // offset: number
  totalPages: number;
  assignors: Assignor[];
};

const useAssignorsData = (props: Props) => {
  const { params = {} } = props;

  const { data, error, isLoading } = useQuery<Response, AxiosError<Error>>(
    ["farms", params],
    () =>
      getAssignors({
        params,
      }),
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );

  if (error) {
    enqueueSnackbar({
      message:
        error.response?.data?.message ||
        "Algo deu errado ao buscar as transações!",
      variant: "error",
    });
  }

  return { data, error, isLoading };
};

export default useAssignorsData;
