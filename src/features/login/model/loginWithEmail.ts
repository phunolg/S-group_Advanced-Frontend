import { axios } from '../../../shared/config/axiosInterceptor';
import { setCookie } from '../../../shared/lib/cookie';
import { setLocalStorage } from '../../../shared/lib/storage';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const submit = async (email: string, password: string, navigate: (path: string) => void) => {
  try {
    const data = await axios.post("/auth/login", { email, password }) as unknown as LoginResponse;

    setCookie(
      "access_token",
      data.access_token,
      1
    );

    setLocalStorage({
      key: "refresh_token",
      value: data.refresh_token,
    });

    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
