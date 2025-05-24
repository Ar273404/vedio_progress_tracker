import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      await registerUser(username, email, password);
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm onRegister={handleRegister} loading={loading} />
    </div>
  );
}
