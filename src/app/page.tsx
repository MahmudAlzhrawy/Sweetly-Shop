import Main from "@/components/Main";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Home",
  description: "Welcome to the home page",
};
export default function Home() {

  return (
    <Main />
  );
}
