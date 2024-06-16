import Button from "@/Components/UI/Button/Button";
import Input from "@/Components/UI/Input/Input";
import { REGISTER_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import { useInput } from "@/Hooks/UseInput";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [register] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const usernameInput = useInput((username) => username.length > 5);
  const passwordInput = useInput((password) => password.length > 5);

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
    await register({
      variables: { username: usernameInput.value, password: passwordInput.value },
    })
      .then(({ data }) => {
        toast.success(data.register);
        navigate("/login");
        toast.info("Please login to continue.");
      })
      .catch(() => {
        // TODO: Handle error properly, show error message from server
        toast.error("Error creating account, please try again later.");
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-full text-primary">
      <form
        onSubmit={handleSubmit}
        className="px-4 py-5 my-2 shadow-lg bg-slate-100 rounded-xl flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
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
          errorMessage="Invalid Password"
          autoComplete="new-password"
          {...passwordInput}
        />
        <Button type="submit">Register</Button>
      </form>
      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <p className="border-b border-primary pb-1 px-5">Already have an Account?</p>
        <Link to="/login">
          <Button className="rounded-full shadow-inner border-b py-1" btnType="secondary">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
