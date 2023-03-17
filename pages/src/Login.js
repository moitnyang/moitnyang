import { useState } from "react";
import Head from "next/head";
import Layout from "./Layout";
import Link from "next/link";
import Image from 'next/image'
import styles from "@/styles/Form.module.css";
import { HiOutlineIdentification, HiLockClosed } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '@/lib/validate'
import { useRouter } from "next/router";


export default function Login() {

  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter()
  //formik hook
  const formik = useFormik({
    initialValues: {
      id: "",
      password: ""
    },
    validate: login_validate, /* 유효성 검사 컴포넌트*/
    onSubmit
  })
  async function onSubmit(values) {
    const result = await signIn("credentials", {
      redirect: false,
      id: values.id,
      password: values.password,
      callbackUrl: "/src/First",
    });
    if (result.status != 200) {
      alert("아이디와 패스워드가 일치하지 않습니다.")
    }
  }
  //Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "/src/First" })
  }

  //Github Login
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "/src/First" })
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-4/5 h-4/5 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800  text-3xl md:text-4xl lg:text-4xl font-bold py-4">로그인</h1>
          <p className="w-3/4 mx-auto text-gray-400 text-sm md:text-lg lg:text-lg">
            로그인 해달라냥
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${formik.errors.id && formik.touched.id
                ? "border-red-500"
                : ""
              }`}
          >
            <input
              type="text"
              name="id"
              placeholder="아이디"
              className={styles.input_text}
              {...formik.getFieldProps("id")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineIdentification size={23} />
            </span>
          </div>
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? "border-red-500" : ""}`}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="비밀번호를 입력해주세요."
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiLockClosed size={23} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
              로그인
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>
              <Image src={"/assets/google.svg"} width="20" height={20} alt=""></Image>
              Sign In with Google
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGithubSignin} className={styles.button_custom}>
              <Image src={"/assets/github.svg"} width={25} height={25} alt=""></Image>
              Sign In with Github
            </button>
          </div>
        </form>
        {/* bottom */}
        <div className="text-center text-gray-400 text-sm md:text-base lg:text-base">
          dont have an account yet?{" "}
          <Link href={"/src/Register"}>
            <div className="text-blue-700 text-sm md:text-base lg:text-base">Sign Up</div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
