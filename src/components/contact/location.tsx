import CustomHeading from "../custom-heading/custom-heading";
import { address, email } from "@/utils/utils.constants";

export default function Location() {
  return (
    <div className="w-full px-4 lg:px-4 xl:px-20 mt-20 mb-20 lg:mt-28 lg:mb-28">
      <div className="">
        <CustomHeading heading="Our Office" />
      </div>

      <div className="text-[rgb(57,60,69)]">
        <p className="block mt-10">{address}</p>
        <p className="inline-block mt-5">{email}</p>
        {/* <p className="inline-block ml-5">+91 8133984760</p> */}
      </div>
    </div>
  );
}
