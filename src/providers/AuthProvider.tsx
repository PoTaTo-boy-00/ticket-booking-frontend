'use client';

import { SessionProvider } from "next-auth/react";
import { AuthSync } from "./AuthSync";


const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider>
     <AuthSync>
      
        {children}
     </AuthSync>

    </SessionProvider>
  );
};

export default AuthProvider;