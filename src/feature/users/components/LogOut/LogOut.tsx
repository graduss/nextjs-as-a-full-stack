import { SubmitButton } from "@/conponents/ui";
import { actionLogOut } from "../../actions";

export default function LogOut() {
  return (
    <form action={actionLogOut}>
      <SubmitButton>LogOut</SubmitButton>
    </form>
  );
}