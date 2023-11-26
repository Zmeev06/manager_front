import { AxiosError } from "axios";
import { ApiClient } from "./Client";

interface LoginResult {
  data: any;
  status: number | null;
}

export const addVm = async (
  name: string,
  cpus: number,
  image: string,
  host: string
): Promise<LoginResult> => {
  try {
    const response = await ApiClient({
      method: "POST",
      data: {
        name: name,
        cpus: cpus,
        image: image,
        host: host
      },
      url: "api/auth/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при получении данных. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};
