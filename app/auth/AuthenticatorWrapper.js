"use client"

import { Authenticator } from "@aws-amplify/ui-react";

const AuthenticatorWrapper = ({ children }) => {
  return (
    <Authenticator>{children}</Authenticator>
  )
}

export default AuthenticatorWrapper;