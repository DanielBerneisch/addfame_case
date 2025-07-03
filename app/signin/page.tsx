import SignInForm from "@/components/Forms/SigninForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <section className="py-12 lg:py-40">
      <SignInForm />
    </section>
  );
}
