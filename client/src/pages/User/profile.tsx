import { useEffect, useState, useSyncExternalStore } from "react";
import {
  editImageProfile,
  editUser,
  getUserById,
  getUsetByToken,
} from "../../TypeScript/Users/user";
import { user } from "../../TypeScript/modules/user";
export default function Profile({ darkMode }: { darkMode: Boolean }) {
  const token = localStorage.getItem("id");
  const userID = localStorage.getItem("userID");
  let [name, setName] = useState("");
  let [lastName, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [image, setImage] = useState("");
  let bool = false;


  let [aboutUser, setUser] = useState<user>();
  if (token && userID) {
    const about = getUsetByToken(token);
    about.then((res) => {
      console.log(res);
    });
    const user = getUserById(+userID, token);
    useEffect(() => {
      user.then((res) => {
        setUser(res.data.user);
        if (res.data.user) {
          setName(res.data.user.name);
          setLastname(res.data.user.surname);
          setEmail(res.data.user.email);
          setPassword(res.data.user.password);
          setImage(res.data.user.imageURL);
          setImage(localStorage.getItem("imageURL") ? localStorage.getItem("imageURL") : res.data.user.imageURL)
        }
      });
    }, []);
    let [typeOf, setTypeOf] = useState("password");
    if (aboutUser) {
      if (
        name !== aboutUser?.name ||
        lastName !== aboutUser.surname ||
        password !== aboutUser.password ||
        email !== aboutUser.email ||
        image !== aboutUser.imageURL
      ) {
        bool = true;
      }
      return (
        <div
          className={`bg-${darkMode ? "dark" : "light"}`}
          style={{ height: innerHeight }}
        >
          <ul className={`items-center flex`}>
            <div className="mx-5">
              <div className={`py-5 ml-[15%] flex gap-5`}>
                <li>
                  <label
                    className={`
                                text-${darkMode ? "light" : "purple-700"
                      } text-2xl
                                `}
                  >
                    Your name:
                  </label>
                  <input
                    className={`bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "purple-700"
                      }
                                    shadow border border-${darkMode ? "light" : "dark"
                      } rounded text-xl p-1
                                    `}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </li>
                <li>
                  <label
                    className={`
                                text-${darkMode ? "light" : "purple-700"
                      } text-2xl
                                `}
                  >
                    Your lastname:
                  </label>
                  <input
                    className={`bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "purple-700"
                      }
                                   shadow  border border-${darkMode ? "light" : "dark"
                      } rounded text-xl p-1
                                    `}
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastName}
                  />
                </li>
              </div>
              <div className={`py-5 ml-[15%] flex gap-5`}>
                <li>
                  <label
                    className={`
                                text-${darkMode ? "light" : "purple-700"
                      } text-2xl
                                 `}
                  >
                    Your email:
                  </label>
                  <input
                    className={`bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "purple-700"
                      }
                                    shadow border border-${darkMode ? "light" : "dark"
                      } rounded text-xl p-1
                                    `}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </li>
                <li>
                  <label
                    className={`
                                text-${darkMode ? "light" : "purple-700"
                      } text-2xl
                                `}
                  >
                    Your password:
                  </label>
                  <div className="flex">
                    <input
                      className={`bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "purple-700"
                        }
                                    shadow border border-${darkMode ? "light" : "dark"
                        } rounded text-xl p-1
                                    `}
                      onChange={(e) => setPassword(e.target.value)}
                      type={`${typeOf}`}
                      value={password}
                    />
                    <i
                      style={{
                        display: typeOf == "password" ? "flex" : "none",
                      }}
                      className={`text-${darkMode ? "light" : "dark"
                        } bi bi-eye-fill border p-2 opacity border-${darkMode ? "light" : "dark"
                        } rounded mx-1`}
                      onClick={() =>
                        typeOf == "password"
                          ? setTypeOf("text")
                          : setTypeOf("password")
                      }
                    ></i>
                    <i
                      style={{
                        display: typeOf == "password" ? "none" : "flex",
                      }}
                      className={`text-${darkMode ? "light" : "dark"
                        } bi bi-eye-slash-fill border p-2 opacity border-${darkMode ? "light" : "dark"
                        } rounded mx-1`}
                      onClick={() =>
                        typeOf == "password"
                          ? setTypeOf("text")
                          : setTypeOf("password")
                      }
                    ></i>
                  </div>
                </li>
              </div>
            </div>
            <div className={` bg-${darkMode ? "dark" : "light"}`}>
              <label htmlFor="image">
                <input
                  onChange={(e) => {
                    let url = editImageProfile(
                      e.target.files ? e.target.files[0] : ""
                    );
                    url.then((res) => {
                      setImage(res);
                    });
                  }}
                  accept="image/"
                  type="file"
                  id="image"
                  style={{ display: "none" }}
                />
                <img
                  className={` ml-[55%] w-[520px] h-[350px] mt-[10%] shadow`}
                  src={`${image ? image : aboutUser.imageURL}`}
                />
              </label>
            </div>
          </ul>
          <div className={`my-[20%] flex justify-content-center gap-5`}>
            <a
              onClick={() =>
                editUser(
                  aboutUser?.id!,
                  name,
                  lastName,
                  email,
                  password,
                  bool,
                  image == aboutUser?.imageURL ? image : ""
                )
              }
              className={`shadow
                         text-${darkMode ? "light" : "light"} border border-${darkMode ? "light" : "dark"
                } 
                         cursor-${bool ? "pointer" : "not-allowed"}  opacity-${bool ? "1" : "[0.5]"
                } bg-green-700 px-4 py-1 rounded`}
            >
              Save
            </a>
            <a
              href="/profile"
              className={`shadow
                         text-${darkMode ? "light" : "light"} border border-${darkMode ? "light" : "dark"
                } 
                         cursor-${bool ? "pointer" : "not-allowed"} opacity-${bool ? "1" : "[0.5]"
                } bg-red-700 px-4 py-1 rounded`}
            >
              Cancel
            </a>
          </div>
        </div>
      );
    } else {
      return <div>Please one second!</div>;
    }
  } else {
    window.location.href = "/login";
    return <div></div>;
  }
}
