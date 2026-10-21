import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <AuthCard
      title="Admin Login"
      subtitle="Please enter your credentials to access the admin dashboard."
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Username or Email"
          type="email"
          placeholder="Username or email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          required
        />

        <div className="mt-4 flex h-[18px] items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold leading-[18px] text-[#0A0847]/60">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[#001984]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-semibold leading-[18px] text-[#001984] transition hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="mt-8">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}