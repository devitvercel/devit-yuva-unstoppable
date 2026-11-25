"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { PrimaryButton } from "@/components/common/Buttons";
import { validateNewsletterEmail } from "@/types/newsletter/newsletter.types";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const IDLE: Status = { type: "idle", message: "" };

/**
 * Footer newsletter signup. Posts to the same-origin /api/newsletter proxy,
 * which forwards to the WordPress yuva/v1/newsletter route. Preserves the
 * footer's existing input + Subscribe button styling.
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(IDLE);

  const isLoading = status.type === "loading";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const check = validateNewsletterEmail(email);
    if (!check.valid) {
      setStatus({ type: "error", message: check.message });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: check.email }),
      });

      const data = (await res.json().catch(() => null)) as { message?: string } | null;

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data?.message ?? "Thanks for subscribing!",
      });
      setEmail("");
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <div className="xl:flex-1 flex flex-col gap-3">
      <form className="flex flex-row flex-wrap gap-2" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.type !== "idle") setStatus(IDLE);
          }}
          disabled={isLoading}
          aria-label="Email address"
          className="focus:outline-none border border-[#F4EDE04D] rounded-full flex-1 py-3.5 px-5 typo-body5 placeholder:text-[#F4EDE04D] text-[#F4EDE0] disabled:opacity-60"
          placeholder="your@email.com"
        />
        <PrimaryButton
          label={isLoading ? "Subscribing…" : "Subscribe"}
          rightIcon={<ArrowRightIcon size={16} strokeWidth={2.5} />}
          btnClassName="text-[#241E19] typo-body5 shrink-0 p-3.5 bg-[#F4EDE0] font-extrabold! disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
        />
      </form>
      {status.message ? (
        <p
          role="status"
          aria-live="polite"
          className={`typo-body5 ${status.type === "error" ? "text-red-400" : "text-green-400"}`}
        >
          {status.message}
        </p>
      ) : (
        <p className="typo-body5 text-[#F4EDE080]">
          We never share your email. Read our privacy policy.
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;
