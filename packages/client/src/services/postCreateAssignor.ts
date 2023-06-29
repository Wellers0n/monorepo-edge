import { Assignor } from '@/types'
import Api from './api'

type Data = {
  name: string;
  document: string;
  phone: string;
  email: string;
}

type Props = {
  data?: Data
}

const postCreateAssignor = async (props: Props): Promise<Assignor> => {
  const { data } = props

  const api = Api()

  const response = await api.post<Assignor>('/assignors/create', data)

  return response.data
}

export default postCreateAssignor
