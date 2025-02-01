"use client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { signInWithGoogle } from "@/actions/auth";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileDropdown from "./ProfileDropdown";
import { websiteTitle } from "@/constants";
import { loginText } from "../constants/index";

const Header = () => {
  const user = useAuth();
  return (
    <header className="w-full main-padding-x py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <span>🐍</span>
          <span>{websiteTitle}</span>
        </Link>
        {/* Auth Buttons */}
        {!user ? (
          <Button
            className={cn(
              " cursor-pointer",
              user === undefined
                ? "disabled bg-transparent"
                : "bg-theme-gray hover:bg-theme-gray/70 text-theme-green"
            )}
            onClick={async () => await signInWithGoogle()}
          >
            {user === undefined ? (
              <Loader className="animate-spin text-white" />
            ) : (
              <span> {loginText}</span>
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
