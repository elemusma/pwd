import { Metadata } from "next";
import Main from "@/app/js/main";
import Image from "next/image";
import { Phone } from "../components/globals";

export const metadata: Metadata = {
  title: "Thank You | Precise Wolf Digital",
  description:
    "Thank you for reaching out to Precise Wolf Digital. We’ve received your message and will get back to you shortly.",
  alternates: {
    canonical: "https://www.precisewolf.com/thank-you",
  },
  openGraph: {
    title: "Thank You | Precise Wolf Digital",
    description:
      "Thank you for reaching out to Precise Wolf Digital. We’ve received your message and will get back to you shortly.",
    url: "https://www.precisewolf.com/thank-you",
    type: "website",
    siteName: "Precise Wolf Digital",
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Main />
      <main>
        <div className="text-center pt-[50px]">
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg">
            Your message has been sent successfully. I will get back to you
            soon.
          </p>
          <div className="flex flex-wrap justify-center content-center">

          <Image
            src="/podcast/Inside-The-Attorneys-Mind-Podcast.jpg"
            alt="Thank You"
            width={400}
            height={200}
            className="mx-2 mb-6"
            />
          <Image
            src="/podcast/Banner-FB-YT.jpg"
            alt="Thank You"
            width={400}
            height={200}
            className="mx-2 mb-6"
            />
            </div>
            <div>
              <p className="mt-[25px]">
        <strong>Listen to the podcast on:</strong>
      </p>

      <div className="flex justify-center mb-[25px]">
        <a
          href="https://www.youtube.com/playlist?list=PL8V1pLWolwwUEMH7MC0_cMQhmqiTGv6Md"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <Image
            src="https://resources.latinowebstudio.com/wp-content/uploads/2025/12/icon-youtube.png"
            alt="Laura O'Sullivan with Sandage Law - Podcast Apple Music"
            width={45}
            height={45}
            style={{height:45,width:'auto'}}
          />
        </a>
        <a
          href="https://podcasts.apple.com/us/podcast/inside-the-attorneys-mind/id1893727741"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <Image
            src="https://resources.latinowebstudio.com/wp-content/uploads/Podcast-Apple-Music.png"
            alt="Laura O'Sullivan with Sandage Law - Podcast Apple Music"
            width={45}
            height={45}
          />
        </a>

        <a
          href="https://open.spotify.com/show/3gJ0zO2b5wyk3WhbRpFdvh"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <Image
            src="https://resources.latinowebstudio.com/wp-content/uploads/Podcast-Spotify-Music.png"
            alt="Laura O'Sullivan with Sandage Law - Podcast Spotify Music"
            width={45}
            height={45}
          />
        </a>

        <a
          href="https://music.amazon.com/podcasts/181bfe9b-ba79-44c8-9c49-c297c8c01313/inside-the-attorney's-mind"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <Image
            src="https://resources.latinowebstudio.com/wp-content/uploads/Podcast-Amazon-Music.png"
            alt="Laura O'Sullivan with Sandage Law - Podcast Amazon Music"
            width={45}
            height={45}
          />
        </a>
        </div>
            </div>
            <div className="pt-[25px]">
              <p>Have urgent questions? <a href={`tel:+1${Phone}`} className="text-link mx-2">
                          {Phone}
                        </a></p>
            </div>
          
        </div>
      </main>
    </>
  );
}
