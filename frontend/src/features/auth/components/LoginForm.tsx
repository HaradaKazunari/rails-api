import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { useLogin } from "@/lib/auth";
import { getValidateRule } from "@/utils/validate";

const schema = getValidateRule(["email", "password"]);

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();

  return (
    <div>
      <Form<LoginValues, typeof schema>
        debug
        onSubmit={(values) => {
          login.mutateAsync(values).then(() => {
            onSuccess();
          });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="メールアドレス"
              error={formState.errors["email"]}
              registration={register("email")}
              defaultValue="test@example.com"
            />
            <InputField
              type="password"
              label="パスワード"
              error={formState.errors["password"]}
              registration={register("password")}
              defaultValue="password"
            />

            <Button
              isLoading={login.isPending}
              type="submit"
              className="w-full"
            >
              ログイン
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
