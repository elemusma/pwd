// components/Login.js

export default function Login() {
  const handleLogin = () => {
    window.location.href = "/api/auth/redirect";
  };

  return <button onClick={handleLogin}>Log in with Google</button>;
}
