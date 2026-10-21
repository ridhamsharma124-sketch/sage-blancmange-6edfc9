import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    navigate("/login");
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Don't worry! It happens. Please enter the email address associated with your account."
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="new-password"
          label="New Password"
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </AuthCard>
  );
}