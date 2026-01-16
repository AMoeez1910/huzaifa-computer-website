import { redirect } from "next/navigation";

export default function AccessoriesPage() {
  redirect("/admin/dashboard?tab=accessories");
}
