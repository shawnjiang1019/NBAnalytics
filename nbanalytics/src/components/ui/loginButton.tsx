"use client";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./button";

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="default"  // You can change this to any other variant if you want
      size="default"     // You can change the size if needed
      onClick={() => loginWithRedirect({
        appState: {
          returnTo: "/landing"
        }
      })}  // Log in when clicked
      className={className}  // Forward className to Button
    >
      Log In
    </Button>
  );
};

export default LoginButton;
