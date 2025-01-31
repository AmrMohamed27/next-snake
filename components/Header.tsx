"use client";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { signInWithGoogle } from "@/actions/auth";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const user = useAuth();
  return (
    <header className="w-full px-4 sm:px-6 md:px-16 lg:px-32 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Snake Logo"
            width={36}
            height={36}
          />
          <span>next_snake</span>
        </Link>
        {/* Auth Buttons */}
        {!user ? (
          <Button
            className={cn(
              " cursor-pointer",
              user === undefined
                ? "disabled bg-transparent"
                : "bg-theme-green hover:bg-theme-green/70"
            )}
            onClick={async () => await signInWithGoogle()}
          >
            {user === undefined ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Log in"
            )}
          </Button>
        ) : (
          <ProfileDropdown user={user} />
        )}
      </div>
    </header>
  );
};

export default Header;
