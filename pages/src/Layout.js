import styles from "@/styles/Layout.module.css"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}> {/* 왼쪽 */}
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly"> {/* 오른쪽 */}
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
      
    </div>
  );
}
