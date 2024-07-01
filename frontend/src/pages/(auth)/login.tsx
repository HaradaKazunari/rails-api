import { LoginForm } from "@/features/auth";
import { AuthLayout } from "@/components/Layout";
import { redirect } from "@/utils/redirect";

export const Login = () => {
  return (
    <AuthLayout title="ログイン">
      <LoginForm onSuccess={() => redirect("/app")} />
    </AuthLayout>
  );
};

export default Login;
