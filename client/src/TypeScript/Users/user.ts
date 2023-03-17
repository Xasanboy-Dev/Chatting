import axios from "axios";

export async function getUsers() {
  const users = await axios.get(`http://localhost:8080/user/users`);
  if (users.status !== 200) {
    return (window.location.href = "/login");
  } else {
    return users.data.users;
  }
}

export async function SaveToArchieve(
  token: string,
  userId: number,
  chattingUserID: number
) {
  if (token && userId && chattingUserID) {
    const result = await axios.post(
      `http://localhost:8080/user/saveArchieve`,
      {
        ID: userId,
        chattingUser: chattingUserID,
      },
      { headers: { Authorization: token } }
    );
    if (result.status !== 201) {
      localStorage.removeItem("userID");
      return alert("You have som probelems!");
    } else {
      return alert("Archieved succesfully!");
    }
  } else {
    alert([token, userId, chattingUserID]);
    alert("You can't save this man!");
  }
}

export async function getArchivedUsers(userID: number, token: string) {
  return await axios.get(`http://localhost:8080/user/archivedUsers`, {
    headers: { Authorization: token },
  });
}

export async function getUserById(id: number, token: string) {
  return await axios.get(`http://localhost:8080/user/${id}`, {
    headers: { Authorization: token },
  });
}
