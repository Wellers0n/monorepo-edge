import Api from "./api";
import { Assignor } from "@/types";

type Params = {
  offset?: number;
  limit?: number;
};

type Props = {
  params?: Params;
};

type Response = {
  // limit: number;
  // offset: number;
  totalPages: number;
  assignors: Assignor[];
};

const getAssignors = async (props: Props): Promise<Response> => {
  const { params } = props;

  const api = Api();

  const response = await api.get<Response>("assignors", {
    params,
  });

  return response.data;
};

export default getAssignors;
