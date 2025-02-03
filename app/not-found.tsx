import { Button } from "@/components/ui/button";
import { notFoundLinkText, notFoundText } from "@/constants";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="main-padding-x flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl">{notFoundText}</h1>
      <Button className=" cursor-pointer" variant={"outline"}>
        <Link href="/" className="text-sm">
          {notFoundLinkText}
        </Link>
      </Button>
    </div>
  );
};

export default notFound;
