import { AxiosError } from "axios";
import { ApiClient } from "./Client";

interface LoginResult {
  data: any;
  status: number | null;
}

export const getImages = async (host: string): Promise<LoginResult> => {
  try {
    const response = await ApiClient({
      method: "POST",
      data: { host: `${host.slice(5, host.length)}` },
      url: "/api/auth/images",
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
