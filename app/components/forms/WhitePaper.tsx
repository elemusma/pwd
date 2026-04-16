"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/forms.scss";
import { getRecaptchaToken } from "./Recaptcha";

const WhitePaper: React.FC = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave? Changes you made may not be saved.";
        return e.returnValue;
      }
    },
    [isDirty],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, handleBeforeUnload]);

  const handleInputChange = () => {
    setIsDirty(true);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // 🤖 Bot check — bail out early, fake success
    if (!isFocused) {
      setIsDirty(false);
      toast.success("Message sent successfully!");
      router.push("/thank-you-white-paper/");
      return;
    }

    const formData = new FormData(formRef.current);

    const data = {
      user_email: formData.get("user_email") as string,
      job_title: formData.get("job_title") as string,
      embed_url: window.location.href,
    };

    setLoading(true);

    try {
      const token = await getRecaptchaToken("submit");

      const response = await fetch("/api/WhitePaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Message sent successfully!");

        await fetch(
          "https://api.hsforms.com/submissions/v3/integration/submit/44436548/8625caef-c830-46e9-a9c4-1c004aeb8b24",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: [
                { name: "email", value: data.user_email },
                { name: "submission_url", value: data.embed_url },
                { name: "jobtitle", value: data.job_title },
              ],
              context: {
                pageUri: window.location.href,
                pageName: document.title,
              },
            }),
          },
        );

        formRef.current.reset();
        setIsDirty(false);
        router.push("/thank-you-white-paper/");
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center w-full">
      <div className="relative">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Email Field */}
            <div className="relative w-full">
              <div className="relative">
                <div className="absolute top-0 left-0 w-[35px] h-full rounded-tl-md rounded-bl-md"></div>
                <Image src="/forms/Form-Email.png" alt="Email Icon" width={20} height={20} className="absolute left-2 top-3" />
                <input type="email" name="user_email" className="w-full p-3 pl-12 bg-white/90 text-black border border-white placeholder-gray rounded-md" placeholder="Email Address" required />
              </div>
            </div>
          </div>

          {/* Honeypot field */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="job_title">Job Title</label>
            <input type="text" name="job_title" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn-main square" disabled={loading}>
              {loading ? "Downloading..." : "Download White Paper"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhitePaper;