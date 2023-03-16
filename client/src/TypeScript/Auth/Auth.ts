import axios from "axios";
export async function LoginFile(password: string, email: string) {
  try {
    const result = await axios.post(`http://localhost:8080/user/login`, {
      email,
      password,
    });
    localStorage.setItem("id", result.data.token);
    return true;
  } catch (error: any) {
    alert(`You have some problems!.\n Please try again later`);
    return false;
  }
}

export async function postDataUser(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  try {
    const result = await axios.post(`http://localhost:8080/user/register`, {
      email,
      surname,
      name,
      password,
    });
    alert(result.data.message);
    if (result.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    alert(error.response.data.message);
    return false;
  }
}

export async function checkTokenValid(token: string) {
  const result = await axios.post(`http:///localhost:8080/user/token`, {
    token,
  });
  if (result.status !== 200) {
    return false;
  } else {
    return true;
  }
}
