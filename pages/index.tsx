import Head from "next/head";
import Image from "next/image";
import { Content, Inter } from "@next/font/google";
import { signIn } from "next-auth/react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (<div>Welcome</div>)
}
