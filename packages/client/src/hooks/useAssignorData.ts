import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Assignor } from "@/types";
import getAssignor from "@/services/getAssignor";

type Params = {
  // limit?: number;
  // offset?: number;
};

type Props = {
  params?: Params;
  id: number;
};

// type Response = {
//   // limit: number
//   // offset: number
//   totalPages: number;
//   assignors: Assignor[];
// };

const useAssignorData = (props: Props) => {
  const { params = {}, id } = props;

  const { data, error, isLoading } = useQuery<Assignor, AxiosError<Error>>(
    ["assignor", params],
    () =>
      getAssignor({
        params,
        id,
      }),
    {
      refetchOnWindowFocus: true,
    }
  );

  if (error) {
    enqueueSnackbar({
      message:
        error.response?.data?.message ||
        "Algo deu errado ao buscar os cedentes!",
      variant: "error",
    });
  }

  return { data, error, isLoading };
};

export default useAssignorData;
