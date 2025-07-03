import RegisterForm from "@/components/Forms/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="py-12 lg:py-40">
      <RegisterForm />
    </section>
  );
}
