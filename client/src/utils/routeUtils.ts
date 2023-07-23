import { usePathname, useSearchParams } from "next/navigation";

export function getCurrentPath() {
    // this doesn't work in getStaticProps
  const currentPage = usePathname();
  return currentPage;
}

export function getQuerysetFromURL() {
  const querySet = useSearchParams();
  return querySet.toString();
}