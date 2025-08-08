"use client"

import { Authenticator } from "@aws-amplify/ui-react";

export default function AuthenticatorWrapper({ children }) {
  return (
    <Authenticator>{children}</Authenticator>
  )
}