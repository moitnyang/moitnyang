import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "./Layout";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import { HiOutlineUser, HiOutlineIdentification, HiLockClosed, HiPhone } from "react-icons/hi";
import { useFormik } from "formik";
import { registerValidate } from "@/lib/validate";
import { useRouter } from "next/router";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
      username: "",
      phone: "",
    },
    validate: registerValidate,
    onSubmit
  });

  async function onSubmit(values) {

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }).then((res) =>  
      res.json()
  )
    if(response.success){
      
      console.log("회원가입 성공");
      router.push("/src/First")
    }else{
      alert("같은 아이디가 있습니다.");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-3xl md:text-4xl lg:text-4xl font-bold py-4">회원가입</h1>
          <p className="w-3/4 mx-auto text-gray-400 text-sm md:text-lg lg:text-lg">
            회원가입하라냥
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
          <div
            className={`${styles.input_group} ${formik.errors.password && formik.touched.password
                ? "border-red-500"
                : ""
              }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="비밀번호"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiLockClosed size={23} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${formik.errors.username && formik.touched.username
                ? "border-red-500"
                : ""
              }`}
          >
            <input
              type="text"
              name="username"
              placeholder="이름"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={23} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${formik.errors.phone && formik.touched.phone
                ? "border-red-500"
                : ""
              }`}
          >
            <input
              type="tel"
              name="phone"
              placeholder="전화번호"
              className={styles.input_text}
              {...formik.getFieldProps("phone")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiPhone size={23} />
            </span>
          </div>
          {/* sign up buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              가입하기
            </button>
          </div>
        </form>
        {/* bottom */}
        <div className="text-center text-gray-400 text-sm md:text-base lg:text-base">
          Have an account?{" "}
          <Link href={"/src/Login"}>
            <div className="text-blue-700 text-sm md:text-base lg:text-base">Sign In</div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
