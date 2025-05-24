import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} loading={loading} />
    </div>
  );
}
