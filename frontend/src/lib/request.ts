import type { AxiosResponse, Method } from "axios";
import axios from "axios";
import { getAuth } from "firebase/auth";

type QueryParams = Record<string, string | number | boolean>;

interface RequestOptions<Data = unknown, Response = unknown> {
  method?: Method;
  url: string;
  data?: Data;
  params?: QueryParams;
  onSuccess?: (data: Response) => void;
  onError?: (error: unknown) => void;
}

export async function request<Data = unknown, Response = unknown>({
  method = "get",
  url,
  data,
  params,
  onSuccess,
}: RequestOptions<Data, Response>): Promise<Response> {
  const { currentUser } = getAuth();
  const idToken = await currentUser?.getIdToken();
  const res: AxiosResponse<Response> = await axios.request({
    method,
    url: `${import.meta.env.VITE_API_URL}/api${url}`,
    data,
    params,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${idToken}`
    },
  });

  onSuccess?.(res.data);
  return res.data;
}
