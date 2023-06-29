import { enqueueSnackbar } from "notistack";
import postLoginSession from "@/services/postLoginSession";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

type Data = {
  email: string;
  password: string;
};

type Response = {
  access_token: string;
  message: string;
};

type Error = {
  message: string;
};

const useAuthLoginMutation = () => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }: Data) =>
      postLoginSession({
        data: {
          email,
          password,
        },
      }),
    onSuccess: (data: Response) => {
      enqueueSnackbar({
        message: "Logado com sucesso!",
        variant: "success",
      });

      Cookies.set("auth-token", data.access_token);

      router.push("/assignor");
    },
    onError: (error: AxiosError<Error>) => {
      return enqueueSnackbar({
        message: "Error ao logar!",
        variant: "error",
      });
    },
  });

  return { mutate, isLoading };
};

export default useAuthLoginMutation;
