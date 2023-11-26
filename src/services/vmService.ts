import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const stopVm = async (id: string, host:string) => {
  try {
    const response = await ApiClient({
      data: {
        uuid: id,
        host:host
      },
      method: "POST",
      url: "api/auth/stop",
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};

export const startVm = async (id: string, host:string) => {
  try {
    const response = await ApiClient({
      data: {
        uuid: id,
        host:host
      },
      method: "POST",
      url: "api/auth/start",
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};

export const removeVm = async (id: string, host:string) => {
  try {
    const response = await ApiClient({
      data: {
        uuid: id,
        host:host
      },
      method: "POST",
      url: "api/auth/delete",
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};