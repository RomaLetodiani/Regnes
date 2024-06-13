import { LOGIN_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { username, password } });
      if (response.data.login) {
        localStorage.setItem("accessToken", response.data.login.accessToken);
        localStorage.setItem("refreshToken", response.data.login.refreshToken);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      // Handle login errors
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
