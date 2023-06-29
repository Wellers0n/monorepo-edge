import Api from "./api";
import { Payables } from "@/types";

type Params = {
  offset?: number;
  limit?: number;
};

type Props = {
  params?: Params;
};

type Response = {
  totalPages: number;
  payables: Payables[];
};

const getPayables = async (props: Props): Promise<Response> => {
  const { params } = props;

  const api = Api();

  const response = await api.get<Response>("payables", {
    params,
  });

  return response.data;
};

export default getPayables;
