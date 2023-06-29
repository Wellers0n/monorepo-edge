import { Payables } from "@/types";
import Api from "./api";

type Data = {
  value: number;
  assignorId: number;
};

type Props = {
  data?: Data;
};

const postCreatePayable = async (props: Props): Promise<Payables> => {
  const { data } = props;

  const api = Api();

  const response = await api.post<Payables>("/payables/create", data);

  return response.data;
};

export default postCreatePayable;
