import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CustomHeading from "@/components/custom-heading/custom-heading";

export default function NotFound() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20 flex flex-col items-center justify-center py-16 md:py-24">
      <div className="max-w-3xl w-full text-center">
        <CustomHeading heading="404" textAlign="text-center" />

        <div className="mt-8 mb-12">
          <p className="text-lg text-[rgb(57,60,69)]">
            {"Sorry the page you requested has not been found."}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back to home
          </span>
        </Link>
      </div>
    </div>
  );
}
