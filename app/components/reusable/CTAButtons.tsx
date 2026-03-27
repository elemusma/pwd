import Link from "next/link";
import { Phone } from "@/app/components/globals";

function CTAButtons() {
  return (
    <>
      <div className="r">
        <div className="">
          <Link href={`#schedule`} className="btn-main mx-2 blog-article">
            Get More Leads
          </Link>
          <a href={`tel:+1${Phone}`} className="btn-main secondary mx-2">
            {Phone}
          </a>
        </div>
        <div className="">
          <Link
            href={`/podcast`}
            className="text-link inline-block podcast-guest-attorney"
          >
            Be Podcast Guest
          </Link>
          
        </div>
      </div>
    </>
  );
}

export default CTAButtons;
