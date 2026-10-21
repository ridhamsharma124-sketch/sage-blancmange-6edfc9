import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <AuthCard
      title="Forgot Password ?"
      subtitle="Don't worry! It happens. Please enter the email address associated with your account."
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email/Mobile Number"
          placeholder="Email/Mobile Number"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </AuthCard>
  );
}