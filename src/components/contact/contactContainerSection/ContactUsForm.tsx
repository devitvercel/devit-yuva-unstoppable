'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowRightIcon, MailIcon} from "lucide-react";
import {validateContact, type ContactType} from "@/types/contact/contact.types";

type Status = {
	type: "idle" | "loading" | "success" | "error";
	message: string;
};

const IDLE: Status = {type: "idle", message: ""};

const EMPTY_FIELDS = {name: "", email: "", mobile: "", message: ""};

function ContactUsForm({email}: { email: string }) {
	const [fields, setFields] = useState(EMPTY_FIELDS);
	const [status, setStatus] = useState<Status>(IDLE);
	const [activeTab, setActiveTab] = useState<ContactType>("scholarships");

	const isLoading = status.type === "loading";

	const updateField = (key: keyof typeof EMPTY_FIELDS) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFields((prev) => ({...prev, [key]: e.target.value}));
			if (status.type !== "idle") setStatus(IDLE);
		};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isLoading) return;

		const check = validateContact({...fields, type: "scholarships"});
		if (!check.valid) {
			setStatus({type: "error", message: check.message});
			return;
		}

		setStatus({type: "loading", message: ""});

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(check.data),
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
				message: data?.message ?? "Thanks! We will be in touch soon.",
			});
			setFields(EMPTY_FIELDS);
		} catch {
			setStatus({type: "error", message: "Network error. Please try again."});
		}
	};

	return (
		<form className={"w-full max-w-130 flex flex-col gap-6 xl:gap-15"} method={"POST"} onSubmit={handleSubmit}
		      noValidate>
			<div className="flex flex-col gap-6 xl:gap-10">
				<h3 className="w-full text-center pb-3 typo-h3 font-fraunces-italics text-[24px] xl:text-[28px] text-[#241E19] border-b border-primary-red">
					For Scholarships
				</h3>
				<div className="flex flex-col gap-4 xl:gap-10">
					<input
						className={"focus:outline-0 border-b border-[#241E19C7] placeholder:text-[#241E19CC] placeholder:typo-body5 typo-body5 text-[#241E19] py-3.5"}
						placeholder={"Your Name"}
						type={"text"}
						value={fields.name}
						onChange={updateField("name")}
						disabled={isLoading}
					/>
					<input
						className={"focus:outline-0 border-b border-[#241E19C7] placeholder:text-[#241E19CC] placeholder:typo-body5 typo-body5 text-[#241E19] py-3.5"}
						placeholder={"Email"}
						type={"email"}
						value={fields.email}
						onChange={updateField("email")}
						disabled={isLoading}
					/>
					<input
						className={"focus:outline-0 border-b border-[#241E19C7] placeholder:text-[#241E19CC] placeholder:typo-body5 typo-body5 text-[#241E19] py-3.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"}
						placeholder={"Mobile Number"}
						type={"number"}
						value={fields.mobile}
						onChange={updateField("mobile")}
						disabled={isLoading}
					/>
					<input
						className={"focus:outline-0 border-b border-[#241E19C7] placeholder:text-[#241E19CC] placeholder:typo-body5 typo-body5 text-[#241E19] py-3.5"}
						placeholder={activeTab === 'volunteering' ? "Why do you want to volunteer?" : "Message"}
						type={"text"}
						value={fields.message}
						onChange={updateField("message")}
						disabled={isLoading}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-5 items-center">
				{status.message && (
					<p
						role="status"
						aria-live="polite"
						className={cn("w-full typo-body5", status.type === "error" ? "text-primary-red" : "text-green-700")}
					>
						{status.message}
					</p>
				)}
				<PrimaryButton type={"submit"} rightIcon={<ArrowRightIcon/>}
				               disabled={isLoading}
				               label={isLoading ? "Submitting…" : "Submit"}
				               btnClassName={"text-[#FBF7EF] w-full xl:w-fit px-19.5 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"}/>
				<div className="w-full flex flex-row gap-4 items-center">
					<div className="flex-1 h-px bg-linear-to-r from-[#251F1A00] to-[#251F1A]"/>
					<div className="shrink-0 typo-body1 text-[24px]! font-bold!">Or</div>
					<div className="flex-1 h-px bg-linear-to-l from-[#251F1A00] to-[#251F1A]"/>
				</div>
				<PrimaryButton href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
				               target={"_blank"}
				               leftIcon={<MailIcon strokeWidth={1.5}/>}
				               label={"Write an Email "}
				               btnClassName={"text-[#241E19] bg-transparent w-full xl:w-fit py-3.5 border border-[#241E19]"}/>
			</div>
		</form>
	);
}

export default ContactUsForm;
