import jwt from "jsonwebtoken";

export  function Verify(token: string) {
  const SECRET = process.env.SECRET_ACCES_KEY;
  return jwt.verify(token, SECRET!);
}

export async function Sign(
  name: string,
  surname: string,
  email: string,
  id: number
) {
  const payload = {
    name,
    surname,
    email,
    id,
  };
  const SECRET = process.env.SECRET_ACCES_KEY;
  return jwt.sign(payload, SECRET!);
}
