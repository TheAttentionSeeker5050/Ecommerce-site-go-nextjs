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

export function getCorsOrigin() {
  // this function returns the origin of the client origin url needed to make requests to the server
  if (process.env.NODE_ENV === 'development') {
    return process.env.CLIENT_URL as string;
  } else {
    return process.env.CLIENT_URL_REMOTE as string;
  }
}

export function getServerRequestURL(
  url: string,
) {
    if (process.env.NODE_ENV === 'development') {
      return `${process.env.API_URL}${url}`;
    } else {
        return `${process.env.API_URL_REMOTE}${url}`;
    }
}