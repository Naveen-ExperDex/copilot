'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "null");

    if (!userData) {
      router.push("/register");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-blue-500 text-3xl font-bold">this is my new project</h1>
    </div>
  );
}
