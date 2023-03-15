import axios from "axios";

export async function getUsers() {
  const users = await axios.get(`http://localhost:8080/user/users`);
  if (users.status !== 200) {
    return (window.location.href = "/login");
  } else {
    return users.data.users;
  }
}
