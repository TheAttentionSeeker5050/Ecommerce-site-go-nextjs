import { useRouter as useNavRouter } from "next/navigation";

export function getCurrentPath() {
    // this doesn't work in getStaticProps
  const router = useNavRouter();
  return router
}