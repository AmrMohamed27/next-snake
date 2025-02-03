import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useParams() {
  // Get the current URL query parameters
  const searchParams = useSearchParams();
  //   Define router to navigate when a new difficulty level is selected
  const router = useRouter();
  //   Get the current pathname
  const pathname = usePathname();
  //   Function to create a query string with the new difficulty level, memoized in useCallback to avoid unnecessary re-renders
  const createQueryString = useCallback(
    (name: string, value: string) => {
      // Create a new URLSearchParams object with the passed name and value parameters
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  //   Function to handle difficulty level change
  const handleChangeParam = useCallback(
    (param: string, newValue: string) => {
      // Check if newValue is empty
      if (!newValue || newValue.length === 0) return;
      // Create a new query string with the new parameter
      const queryString = createQueryString(param, newValue);
      // Navigate to the new URL with the new parameter
      router.push(`${pathname}?${queryString}`);
    },
    [createQueryString, pathname, router]
  );

  return { searchParams, handleChangeParam };
}
