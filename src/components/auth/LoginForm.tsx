"use client";

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  openConfirmModal,
  openToast,
  handleResendOTP,
  reqOptions,
  setCookie,
  getData,
  getCookie,
} from "../../components/lib";
import { SessionUserType, LoginFormPropsType } from "../../types";
import PasswordField from "../forms/PasswordField";
import InputText from "../forms/InputText";
import OrDivider from "../ui/OrDivider";
import FromInstinctHub from "./FromInstinctHub";
import SubmitButton from "../forms/SubmitButton";



// Define response type from API
interface LoginResponse {
  status: number;
  message?: string;
  detail?: string;
  [key: string]: any; // For additional properties
}

/**
 * LoginForm component
 * @example
 * ```tsx
 * <LoginForm
 *   params={{
 *     error: "Invalid username or password",
 *     callbackUrl: "/dashboard",
 *   }}
 *   searchParams={{
 *     error: "Invalid username or password",
 *     callbackUrl: "/dashboard",
 *   }}
 *   endpointPath="/api/auth/login"
 *   verificationPath="/auth/verify-email"
 *   redirectPath="/dashboard"
 *   type="skills"
 * />
 * ```
 * @param {LoginFormProps} props - The props for the LoginForm component
 * @property {string} endpointPath - The endpoint path for the LoginForm component
 * @property {string} verificationPath - The verification path for the LoginForm component
 * @property {string} redirectPath - The redirect path for the LoginForm component
 * @property {string} type - The type for the LoginForm component | sis, skills, lms, crm, ecommerce, inventory, hr.
 *
 * @returns {React.ReactElement} The LoginForm component
 */
const LoginForm = ({
  params,
  searchParams,
  endpointPath,
  verificationPath,
  redirectPath,
  type,
}: LoginFormPropsType) => {
  const router = useRouter();
  const { error, callbackUrl } = searchParams;
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<number>(1);

  const { data: session } = useSession();
  const user = session?.user as SessionUserType;
  const handle = user?.name?.channels?.active?.channel?.username;
  const token = user?.name?.token;
  const uuid = user?.name?.uuid;
  const email = user?.name?.email;
  const verifyEmail = user?.name?.verified;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(0);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const obj = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      provider: "credentials",
      channel: "skills",
    };

    const options = reqOptions("POST", JSON.stringify(obj), null, "json");

    const req = await fetch(endpointPath || "/api/auth/login", options);

    try {
      const res: LoginResponse = await req.json();

      if (res.status === 200) {
        setStatus(2);
        const context: {
          username: string;
          password: string;
          callbackUrl?: string;
          redirect?: boolean;
        } = {
          username: JSON.stringify(res),
          password: "instincthub",
          redirect: false,
          callbackUrl: callbackUrl,
        };
        if (callbackUrl) {
          context.callbackUrl = callbackUrl;
        }
        signIn("credentials", context);
        setStatus(1);
      } else {
        setMessage(res.message || res.detail || "An error occurred");
        setStatus(res.status);
      }
    } catch (e) {
      console.log(`Login Error: ${e}`);
      openToast("Couldn't login. Please try again.", 400);
      setStatus(3);
    }
  };

  const handleValidate = async () => {
    if (!token || !uuid) {
      return;
    }

    const cookiesCallbackUrl = getCookie("callbackUrl");

    // Only redirect if the user details are valid.
    const funcParams = {
      path: `auth/skills/validate-user-token/?access_token=${token}&user_uuid=${uuid}`,
      token: token,
    };
    const res = await getData(funcParams);

    if (res?.detail === "Unauthorized" || res?.detail === "Not found.") {
      openToast("Couldn't login. Please try again.", 400);
      return; // Don't do anything if not valid.
    } else if (verifyEmail === false) {
      const msg =
        "You need to verify your email address, click okay to request for a one time password (OTP).";
      const verifyPath = `${
        verificationPath || "/auth/verify-email"
      }?email=${email}`;

      // If user not verified, open confirm modal to request for OTP.
      // And redirect to verify email page.
      openConfirmModal(msg).then((res: boolean) => {
        if (res && email) {
          handleResendOTP(email);
          router.push(verifyPath);
        } else {
          signOut();
        }
      });
    } else if (callbackUrl) {
      router.push(callbackUrl); // Take user to callbackUrl
    } else if (cookiesCallbackUrl) {
      router.push(cookiesCallbackUrl); // Take user to callbackUrl
    } else if (user && type === "skills") {
      router.push("/library"); // Take user to library.
    } else if (user && type === "lms") {
      if (user && !handle) {
        const msg =
          "You do not have an active channel for this account. Would you like to create one?";
        openConfirmModal(msg).then((res: boolean) => {
          if (res) {
            router.push(`/auth/create-channel`);
          } else {
            signOut();
          }
        });
      } else if (user && handle && !callbackUrl) {
        const msg = `You are currently logged in with ${handle} channel. Would you like to proceed to the dashboard?`;
        openConfirmModal(msg).then((res: boolean) => {
          if (res) {
            router.push(`/${handle}`);
          }
        });
      }
    } else if (user && redirectPath) {
      router.push(`${redirectPath}`);
    } else if (user) {
      router.push(`/`);
    }
  };

  useEffect(() => {
    if (callbackUrl) {
      setCookie("callbackUrl", callbackUrl, 30);
    }
  }, []);

  useEffect(() => {
    if (token && uuid) {
      handleValidate();
    }
  }, [token, uuid]);

  return (
    <form onSubmit={handleSubmit} className="ihub-max-w-500 ihub-mx-auto">
      <h1 className="ihub-fs-32">Login Form</h1>
      {error && (
        <p className="err">
          Sign in failed. Check the details you provided are correct.
        </p>
      )}
      <InputText
        name="username"
        type="text"
        label="Email or Username"
        required={true}
        textTransform="lowercase"
      />
      <PasswordField
        name="password"
        label="Password"
        required={true}
        id="password"
      />

      {message && <p className="err">{message}</p>}
      <div className="action ihub-mt-4 ihub-mb-5">
        <SubmitButton label="Login" type="submit" status={status} />
        <OrDivider labels="or sign with" />
        <p className="ihub-text-center">
          Can’t remember password?{" "}
          <a href="/auth/reset-password">Reset Password</a>
        </p>
        <p className="ihub-text-center">
          New user? <a href="/auth/signup">Create an account.</a>
        </p>
      </div>
      <FromInstinctHub />
    </form>
  );
};

export default LoginForm;
