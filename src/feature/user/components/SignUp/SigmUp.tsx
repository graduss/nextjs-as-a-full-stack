
import { signUp } from "../../actions";
import UserForm from "../ui/UserForm";

export default function SignUp() {
  return <UserForm action={signUp} />
}