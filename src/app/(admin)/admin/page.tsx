import { redirect } from "next/navigation";

export default function AdminEntry() {
  redirect("/sign-in"); // Always redirect to sign-in
}
