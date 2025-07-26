"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  reqOptions,
  API_HOST_URL,
  openToast,
  objectIsEmpty,
} from "../../../../components/lib";
import {
  FormError,
  OrDivider,
  SubmitButton,
  IsUsernameEmailTaken,
  DateInput,
  TextField,
  PasswordsMatch,
} from "../../../../index";

/*
Import ../../../../components/lib as @instincthub/react-ui/lib
Import ../../../../components/ui as @instincthub/react-ui
Import ../../../../components/lib as @instincthub/react-ui/lib
*/

interface SignUpFormExampleProps {
  callbackUrl?: string;
}

interface SignUpResponse {
  id?: number;
  email?: string;
  message?: string;
  detail?: string;
  status?: number;
}

const SignUpFormExample: React.FC<SignUpFormExampleProps> = () => {
  const router = useRouter();
  const [error, setError] = useState({});
  const { data: session, update: sessionUpdate } = useSession();
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [status, setStatus] = useState<number | undefined>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(0);

    const form = new FormData(e.currentTarget);
    form.set("provider", "instincthub");

    const options = reqOptions("POST", form);
    const url = `${API_HOST_URL}auth/skills/learn-teach-signup/`;

    try {
      const req = await fetch(url, options);
      const res: SignUpResponse = await req.json();

      if (res.id) {
        // Login user if ID exist in res.
        sessionUpdate({ info: res });

        // Redirect user to verify email
        router.push(`/auth/verify-email?email=${res.email}`);
      } else {
        setStatus(res.status);
        openToast(JSON.stringify(res), 400);
        setError(res);
      }
    } catch (error) {
      setStatus(500);
      openToast("Network or server error", 500);
    }
  }

  const handleDisableBtn = () => {
    if (usernameIsValid === true && emailIsValid === true) {
      return false;
    } else {
      return true;
    }
  };
  console.log(handleDisableBtn());

  return (
    <section className="ihub-learn-teach">
      <form onSubmit={handleSubmit}>
        <IsUsernameEmailTaken
          name="username"
          type="text"
          label="Username *"
          required={true}
          key={1}
          setIsValid={setEmailIsValid}
        />
        <IsUsernameEmailTaken
          key={2}
          name="email"
          type="email"
          label="Email Address *"
          required={true}
          setIsValid={setUsernameIsValid}
        />
        <TextField
          name="first_name"
          type="text"
          label="First Name *"
          required={true}
        />
        <TextField
          name="last_name"
          type="text"
          label="Last Name *"
          required={true}
        />
        <TextField name="mobile" type="tel" label="Phone *" required={true} />
        <DateInput
          label="Date of birth"
          name="date_of_birth"
          required={true}
          controls={false}
        />

        <PasswordsMatch />
        {/* TAKE ACTION */}
        <div>
          <SubmitButton
            label="Sign up"
            status={0}
            disabled={handleDisableBtn()}
          />

          {!objectIsEmpty(error) ? (
            <FormError errors={error} status={status} />
          ) : (
            ""
          )}

          <OrDivider labels="Or signup with" />
          {/* <LoginProviders /> */}

          <p className="ihub-text-center">
            Already have an account?{" "}
            <Link href="/auth/login">
              {" "}
              <b>Login</b>{" "}
            </Link>{" "}
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUpFormExample;
