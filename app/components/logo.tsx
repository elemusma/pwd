"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import "@/app/styles/logo.scss";

function Logo() {
  const pathname = usePathname();

  const subtext =
    pathname === "/practice-areas/ecommerce"
      ? "B2C - B2B - eCommerce"
      : "Online Presence - Name Recognition";

  return (
    <>
{/* <Image
          src="/logos/Precise-Wolf-Digital-Logo.png"
          alt="Logo Background"
          width={150}
          height={55}
          className=""
          style={{}}
        /> */}
    <div
      className="flex items-center p-1 logo"
      style={{
      }}
    >
      <div
        className="relative flex items-center justify-start logo-container"
        style={{ width: 200, height: 85 }}
      >
        <Image
          src="/logos/Precise-Wolf-Digital-Logo-Circle.png"
          alt="Logo Background"
          width={65}
          height={55}
          className="absolute logo-bg"
          style={{
            top: "13px",
            left: "-5px",
            transform: "translate(-50%,-50%)",
          }}
        />
        <Image
          src="/logos/Precise-Wolf-Digital-Logo-Main.png"
          alt="Logo Bird"
          width={175}
          height={85}
          className="relative logo-bird"
        />
      </div>
      {/* <div
        className="conditional-visible hidden md:block"
        style={{ paddingLeft: 10, paddingRight: 10, marginTop: -5 }}
      >
        <span
          className="text-accent d-block text-shadow logo-text"
          style={{ fontSize: "1.1rem", margin: 0, lineHeight: 1 }}
        >
          Precise Wolf Digital
        </span>
        <p
          className="text-white block logo-subtext"
          style={{ margin: 0, fontSize: "70%", lineHeight: 1 }}
        >
          <em>{subtext}</em>
        </p>
      </div> */}
    </div>
    </>
  );
}

export default Logo;
