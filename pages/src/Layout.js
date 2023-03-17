import styles from "@/styles/Layout.module.css"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-orange-100">
      <div className="m-auto bg-slate-50 rounded-md w-4/5 py-8">
        <div className="right flex flex-col justify-evenly"> {/* 오른쪽 */}
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
      
    </div>
  );
}
