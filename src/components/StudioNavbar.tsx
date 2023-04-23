import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const StudioNavbar = (props: any) => {
  return (
    <>
      <div className="flex items-center justify-between p-5 text-md-brand">
        <Link className="flex" href="/">
          <ArrowUturnLeftIcon className="h-6 w-6 text- mr-2" />
          Go to Website
        </Link>
      </div>
      {props.renderDefault(props)}
    </>
  );
};

export default StudioNavbar;
