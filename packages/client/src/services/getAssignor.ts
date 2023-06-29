import Api from "./api";
import { Assignor } from "@/types";

type Params = {};

type Props = {
  params?: Params;
  id: number;
};

// type Response = {
//   // limit: number;
//   // offset: number;
//   // totalPages: number;
//   assignors: Assignor;
// };

const getAssignor = async (props: Props): Promise<Assignor> => {
  const { params, id } = props;

  const api = Api();

  const response = await api.get<Assignor>(`assignors/${id}`, {
    params,
  });

  return response.data;
};

export default getAssignor;
