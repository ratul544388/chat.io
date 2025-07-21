import axios from "axios";
import type { User } from "firebase/auth";

export const createUser = async (user: User) => {
  const idToken = await user.getIdToken();
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users`,
      {},
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
  } catch (error) {
    console.log(error);
  }
};
