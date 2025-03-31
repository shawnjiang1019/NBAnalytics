import Image from "next/image";
import { Button } from "@/components/ui/button";
import TypingEffect from "@/components/ui/typingEffect";
import LoginButton from "@/components/ui/loginButton";
import SearchBar from "@/components/ui/searchBar";
import Dashboard from "@/components/ui/dashboard";

export default function Home() {
  return (
    <><TypingEffect />
    <div className="flex items-center justify-center h-screen">
      <LoginButton className="px-10 py-6 text-2xl" />
      <Button className="px-10 py-6 text-2xl">Sign Up</Button>
      <SearchBar/>
    </div>
    
    </>
  );
}
