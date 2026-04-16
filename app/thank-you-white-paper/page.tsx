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
                      href="https://podcasts.apple.com/us/podcast/laura-osullivan-on-what-criminal-defense-attorneys/id1893727741?i=1000761610341"
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
                      href="https://podcasts.apple.com/us/podcast/laura-osullivan-on-what-criminal-defense-attorneys/id1893727741?i=1000761610341"
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
                      href="https://open.spotify.com/episode/1QoUPC3uAv3Cvd6oKiSOW9"
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
                      href="https://music.amazon.com/podcasts/181bfe9b-ba79-44c8-9c49-c297c8c01313/episodes/89f98ece-39b2-4c4e-bd01-ea7b3ba83504/inside-the-attorney's-mind-laura-o'sullivan-on-what-criminal-defense-attorneys-actually-want-from-expert-witnesses"
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
