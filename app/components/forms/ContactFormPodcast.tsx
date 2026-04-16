"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/forms.scss";
import { formatPhoneNumber } from "./phoneFormatting";
import { getRecaptchaToken } from "./Recaptcha";

const ContactFormPodcasts: React.FC = () => {
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
      router.push("/thank-you/");
      return;
    }

    const formData = new FormData(formRef.current);

    const data = {
      user_name: formData.get("user_name") as string,
      user_email: formData.get("user_email") as string,
      user_phone: formData.get("user_phone") as string,
      message: formData.get("message") as string,
      law_firm_name: formData.get("law_firm_name") as string,
      job_title: formData.get("job_title") as string,
      embed_url: window.location.href,
    };

    setLoading(true);

    try {
      const token = await getRecaptchaToken("submit");

      const response = await fetch("/api/sendEmailFormPodcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Message sent successfully!");

        await fetch(
          "https://api.hsforms.com/submissions/v3/integration/submit/44436548/e010bd69-bab3-418e-8d8e-65b67a2b97ec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: [
                { name: "firstname", value: data.user_name },
                { name: "email", value: data.user_email },
                { name: "phone", value: data.user_phone },
                { name: "message", value: data.message },
                { name: "law_firm_name", value: data.law_firm_name },
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
        router.push("/thank-you/");
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
    <div className="relative items-center justify-center bg-cover bg-center w-full">
      <div className="relative">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          className="space-y-4"
        >
          <div className="flex flex-wrap">
            {/* Name Field */}
            <div className="relative w-full md:w-1/2 p-4">
              <label htmlFor="user_name" className="block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 w-[35px] h-full rounded-tl-md rounded-bl-md"></div>
                <Image src="/forms/Form-Name.png" alt="User Icon" width={20} height={20} className="absolute left-2 top-3" />
                <input type="text" name="user_name" className="w-full p-3 pl-12 bg-white/90 text-black border border-white placeholder-gray rounded-md" placeholder="Name" required />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative w-full md:w-1/2 p-4">
              <label htmlFor="user_email" className="block text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 w-[35px] h-full rounded-tl-md rounded-bl-md"></div>
                <Image src="/forms/Form-Email.png" alt="Email Icon" width={20} height={20} className="absolute left-2 top-3" />
                <input type="email" name="user_email" className="w-full p-3 pl-12 bg-white/90 text-black border border-white placeholder-gray rounded-md" placeholder="Email Address" required />
              </div>
            </div>

            {/* Phone Field */}
            <div className="relative w-full md:w-1/2 p-4">
              <label htmlFor="user_phone" className="block text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 w-[35px] h-full rounded-tl-md rounded-bl-md"></div>
                <Image src="/forms/Form-Phone.png" alt="Phone Icon" width={20} height={20} className="absolute left-2 top-3" />
                <input type="tel" name="user_phone" className="w-full p-3 pl-12 bg-white/90 text-black border border-white placeholder-gray rounded-md" placeholder="Phone" required maxLength={14} onChange={formatPhoneNumber} />
              </div>
            </div>

            {/* Law Firm Field */}
            <div className="relative w-full md:w-1/2 p-4">
              <label htmlFor="law_firm_name" className="block text-sm font-medium">
                Law Firm Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 w-[35px] h-full rounded-tl-md rounded-bl-md"></div>
                <Image src="/forms/Form-Law-Firm.png" alt="User Icon" width={20} height={20} className="absolute left-2 top-3" />
                <input type="text" name="law_firm_name" className="w-full p-3 pl-12 bg-white/90 text-black border border-white placeholder-gray rounded-md" placeholder="Law Firm Name" required />
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="relative p-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-0 left-0 w-[35px] h-[95%] rounded-tl-md rounded-bl-md"></div>
              <Image src="/forms/Form-Message.png" alt="Message Icon" width={20} height={20} className="absolute left-2 top-3" />
              <textarea name="message" className="w-full p-3 pl-12 bg-white/90 border border-white placeholder-gray rounded-md min-h-[120px]" placeholder="Message" required></textarea>
            </div>
          </div>

          {/* Honeypot field */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="job_title">Job Title</label>
            <input type="text" name="job_title" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn-main square" disabled={loading}>
              {loading ? "Sending..." : "Be Our Next Guest Attorney"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPodcasts;