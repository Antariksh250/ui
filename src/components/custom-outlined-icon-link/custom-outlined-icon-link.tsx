import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CustomOutlinedIconLinkPropType = {
  linkTitle: string;
  linkHref: string;
};

export default function CustomOutlinedIconLink({
  linkTitle,
  linkHref,
}: CustomOutlinedIconLinkPropType) {
  return (
    <Link
      href={linkHref}
      className="w-auto px-6 py-3 xl:text-lg text-[rgb(57,60,69)] inline-flex items-center justify-center gap-2 group border-[1px] border-blue-600 rounded-full"
    >
      <span className="inline-block">{linkTitle}</span>
      <ArrowRight />
    </Link>
  );
}
