"use client";
import Link from "next/link";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined); //the register function will update this state based on the returned value
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]); //if the registration was successful then rdirect to login page using next router
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="userName" name="userName" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      {state && state.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};
export default RegisterForm;
