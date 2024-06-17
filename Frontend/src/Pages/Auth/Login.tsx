import Button from "@/Components/UI/Button/Button";
import Input from "@/Components/UI/Input/Input";
import { LOGIN_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import { useInput } from "@/Hooks/UseInput";
import AuthStore from "@/Stores/Auth.Store";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { setTokens } = AuthStore();
  const usernameInput = useInput((username) => username.length > 5);
  const passwordInput = useInput((password) => password.length > 5);

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { username: usernameInput.value, password: passwordInput.value },
    onCompleted: (data) => {
      setTokens(data.login);
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const errors = [
    usernameInput.hasError,
    !usernameInput.value,
    passwordInput.hasError,
    !passwordInput.value,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.some((error) => error)) {
      toast.error("Please fill all the fields");
      return;
    }
    await login();
  };
  return (
    <div className="flex flex-col justify-center items-center h-full text-primary">
      <form
        onSubmit={handleSubmit}
        className="px-4 py-5 my-2 shadow-lg bg-slate-100 rounded-xl flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          label="username"
          errorMessage="Invalid Username"
          {...usernameInput}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          errorMessage="Invalid Password"
          {...passwordInput}
        />
        <Button type="submit">Continue</Button>
      </form>
      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <p className="border-b border-primary pb-1 px-5">New to Regnes?</p>
        <Link to="/register">
          <Button className="rounded-full shadow-inner border-b py-1" btnType="secondary">
            Create your Account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
