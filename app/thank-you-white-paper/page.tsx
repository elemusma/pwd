import Main from "@/app/js/main";
// import Link from "next/link";
import "@/app/styles/blog.scss";
import ContactForm from "@/app/components/forms/ContactForm";
import { Metadata } from "next";
import Image from "next/image";
import { Phone } from "../components/globals";

export const metadata: Metadata = {
  title: "White Paper Requested | Precise Wolf Digital",
  description:
    "Thanks for requesting the white paper. Learn how to get more legal cases and be found by attorneys. Contact Ted for personalized support.",
  alternates: {
    canonical: "https://www.precisewolf.com/thank-you-white-paper",
  },
  openGraph: {
    title: "White Paper Requested | Precise Wolf Digital",
    description:
      "Thanks for requesting the white paper. Learn how to get more legal cases and be found by attorneys. Contact Ted for personalized support.",
    url: "https://www.precisewolf.com/thank-you-white-paper",
    type: "website",
    siteName: "Precise Wolf Digital",
  },
};

export default function ThankYouWhitePaperPage() {
  return (
    <>
      <Main />
      <main>
        <div className="text-center pt-[50px] flex flex-wrap justify-center">
          <div className="lg:w-3/4 w-full">
            <h1 className="text-3xl font-bold mb-4">Congrats!</h1>
            <p className="text-lg">
              You will receive the white paper soon. You have taken the first
              step to start getting more cases and getting found by attorneys.
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
            <div className="pt-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
