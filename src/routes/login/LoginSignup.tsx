import type { loginType } from "../../utils/types/primary-types";
import Login from "./Login";
import Signup from "./Signup";

type Props = {
  loginType: loginType;
};

export default function LoginSignup({ loginType }: Props) {
  if (loginType === "login") return <Login />;
  if (loginType === "signup") return <Signup />;
}
