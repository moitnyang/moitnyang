import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import Image from "next/image";
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
    
    const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });

    // try {
    //   const response = await fetch('http://localhost:3000/api/auth/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(values)
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     router.push('http://localhost:3000');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    console.log(values)
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 md:text-4xl text-3xl font-bold py-4">회원가입</h1>
          <p className="w-3/4 mx-auto text-gray-400 text-sm md:text-lg">
            회원가입하라냥
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div
            className={`${styles.input_group} ${
              formik.errors.id && formik.touched.id
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
              <HiOutlineIdentification size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ?<span className="text-red-500">{formik.errors.email}</span>:<></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
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
              <HiLockClosed size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ?<span className="text-red-500">{formik.errors.password}</span>:<></>} */}
          
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
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
              <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ?<span className="text-red-500">{formik.errors.username}</span>:<></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.phone && formik.touched.phone
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
              <HiPhone size={25} />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ?<span className="text-red-500">{formik.errors.cpassword}</span>:<></>} */}

          {/* sign up buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              가입하기
            </button>
          </div>
        </form>
        {/* bottom */}
        <div className="text-center text-gray-400 ">
          Have an account?{" "}
          <Link href={"/login"}>
            <div className="text-blue-700">Sign In</div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
