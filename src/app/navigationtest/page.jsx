"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const NavigationTest = () => {
  //CLIENT SIDE NAVIGATION HOOKS
  const router = useRouter();
  const pathName = usePathname();
  const query = useSearchParams();
  const q = query.get("q");
  console.log(q);
  const handleClick = () => {
    console.log("Clicked");
    console.log(pathName);

    router.push("/");
  };
  return (
    <div>
      <Link href="/" prefetch={false}>
        Click here!
      </Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  );
};
export default NavigationTest;
//Links - we use next Link component. Main feature of the Link component is that it pre-fetches the content, even when the link is not clicked. This results that we are going to see the content much faster. But if there are many links in a component we might want to disable pre-fetching cause it might cause some performece issues (prefetch={false})
//useRouter () - hook to handle redirect. Provides client side navigation to the provided route
//router.back() - go to previous page
//router.forward () - go to next page
// router.replace("/"); doesn't add new entry to browser history stack. Use this when you don't want a page to be accesible via the browser's back button
//router.refresh() refreshes the current route and makes new request to the server. Use this when you want to reload the current page to reflect changes or updates made by the user
//usePathname - returns current pathName
//useSearchParams - hook to retrieve query
