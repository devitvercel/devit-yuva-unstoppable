'use client'

import React from 'react';
import {z} from 'zod';
import {cn} from "@/lib/utils";
import {PrimaryButton} from "@/components/common/Buttons";
import {AlertTriangleIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, Loader2Icon, XIcon} from "lucide-react";
import {DONATION_PURPOSES, type DonationPurpose, type DonationPurposeOption} from "@/types/donate/donation.types";

type DonationResultStatus = 'success' | 'failed' | 'aborted' | 'pending' | 'invalid';

const RESULT_STATUSES: DonationResultStatus[] = ['success', 'failed', 'aborted', 'pending', 'invalid'];

function fallbackPurposeOptions(): DonationPurposeOption[] {
	return DONATION_PURPOSES.map((label) => ({
		id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
		label,
	}));
}

// ── Zod Validation Schema for Step 2 ────────────────────────────────────────

function buildStep2Schema(allowedPurposes: string[]) {
	return z.object({
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
		phone: z
			.string()
			.min(1, 'Phone number is required')
			.refine(
				(val) => /^\+?[0-9\s\-()]{7,15}$/.test(val),
				{message: 'Please enter a valid phone number'}
			),
		pan: z
			.string()
			.min(1, 'PAN number is required')
			.refine(
				(val) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(val),
				{message: 'Please enter a valid PAN number (e.g. ABCDE1234F)'}
			),
		address: z.string().min(1, 'Address is required'),
		purpose: z
			.string()
			.min(1, 'Please select a purpose')
			.refine(
				(val) => allowedPurposes.length === 0 || allowedPurposes.includes(val),
				{message: 'Please select a purpose'}
			),
	});
}

type DonateFormData = {
	amount: number;
	frequency: 'once' | 'monthly';
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	pan: string;
	address: string;
	purpose: DonationPurpose | '';
};

type FieldErrors = Partial<Record<keyof DonateFormData, string>>;

// Instructions returned by /api/donate to hand off to the payment gateway.
type PaymentInitiation = {
	method: 'POST' | 'GET';
	action: string;
	fields: Record<string, string>;
};

/**
 * Build a hidden form from the gateway instructions and submit it, causing a
 * full-page redirect to the payment gateway (e.g. CCAvenue).
 */
function redirectToGateway(initiation: PaymentInitiation) {
	const form = document.createElement('form');
	form.method = initiation.method;
	form.action = initiation.action;
	form.style.display = 'none';

	Object.entries(initiation.fields).forEach(([name, value]) => {
		const input = document.createElement('input');
		input.type = 'hidden';
		input.name = name;
		input.value = value;
		form.appendChild(input);
	});

	document.body.appendChild(form);
	form.submit();
}

const buttons = [
	{
		amount: "₹500",
		title: "NOURISH"
	},
	{
		amount: "₹1,000",
		title: "BOOKS"
	},
	{
		amount: "₹5,000",
		title: "SCHOLARSHIP ★"
	},
	{
		amount: "₹10,000",
		title: "SANITATION"
	},
	{
		amount: "₹25,000",
		title: "TRANSFORM"
	},
	{
		amount: "₹50,000",
		title: "BUILD"
	},
];

const buttonImpacts: Record<number, string> = {
	0: "Provide one month of nutritious hot meals for two school children.",
	1: "Supply full school textbook sets and learning materials for a child for one year.",
	2: "One month of scholarship for a first-generation girl learner — tuition, books, uniform & stipend so she doesn't drop out.",
	3: "Support setup and maintenance of safe sanitation and drinking water facilities in a government school.",
	4: "Transform a classroom into a digital smart class with modern teaching equipment and projector setup.",
	5: "Contribute to full school renovation, including classroom repair, new desks, and playground equipment.",
};

function DonateForm() {
	const [step, setStep] = React.useState<number>(1);
	const [isRedirecting, setIsRedirecting] = React.useState<boolean>(false);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

	// Result returned from the gateway callback (via /donate?status=…&order=…).
	const [resultStatus, setResultStatus] = React.useState<DonationResultStatus | null>(null);
	const [resultOrderId, setResultOrderId] = React.useState<string>('');
	const [resultTrackingId, setResultTrackingId] = React.useState<string>('');
	const [resultAmount, setResultAmount] = React.useState<string>('');
	const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [submitError, setSubmitError] = React.useState('');

	// Step 1 States
	const [selectedButton, setSelectedButton] = React.useState<number | null>(2);
	const [customAmount, setCustomAmount] = React.useState<string>('');
	const [frequency, setFrequency] = React.useState<'once' | 'monthly'>('once');

	// Step 2 States (Your Details)
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [pan, setPan] = React.useState('');
	const [address, setAddress] = React.useState('');
	const [purpose, setPurpose] = React.useState<DonationPurpose | ''>('');
	const [purposeOptions, setPurposeOptions] = React.useState<DonationPurposeOption[]>(() => fallbackPurposeOptions());

	// Height animation states & refs
	const formRef = React.useRef<HTMLDivElement>(null);
	const [formHeight, setFormHeight] = React.useState<number | undefined>(undefined);
	const [isMounted, setIsMounted] = React.useState(false);

	// Step-level height measurement
	const step1Ref = React.useRef<HTMLDivElement>(null);
	const step2Ref = React.useRef<HTMLDivElement>(null);
	const step3Ref = React.useRef<HTMLDivElement>(null);
	const [sliderHeight, setSliderHeight] = React.useState<number | undefined>(undefined);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	// Load Purpose options from WordPress (Donations → Purposes).
	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch('/api/donate/purposes', {cache: 'no-store'});
				const data = (await res.json().catch(() => null)) as
					| {purposes?: DonationPurposeOption[]}
					| null;
				const list = Array.isArray(data?.purposes)
					? data!.purposes!.filter((p) => p?.label?.trim())
					: [];
				if (!cancelled && list.length > 0) {
					setPurposeOptions(list);
					setPurpose((prev) =>
						prev && list.some((p) => p.label === prev) ? prev : ''
					);
				}
			} catch {
				// Keep fallback options already in state.
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	React.useEffect(() => {
		const handleSelectAmount = (e: Event) => {
			const customEvent = e as CustomEvent<{ amount: number }>;
			const amt = customEvent.detail.amount;
			if (!amt) return;

			// Find if there is a matching button index in our buttons array
			const matchingIndex = buttons.findIndex(btn => {
				const val = Number(btn.amount.replace(/[^0-9]/g, ''));
				return val === amt;
			});

			if (matchingIndex !== -1) {
				setSelectedButton(matchingIndex);
				setCustomAmount('');
			} else {
				setSelectedButton(null);
				setCustomAmount(String(amt));
			}

			// Return to step 1 so the selected price is shown
			setStep(1);
		};

		window.addEventListener('select-donation-amount', handleSelectAmount);
		return () => {
			window.removeEventListener('select-donation-amount', handleSelectAmount);
		};
	}, []);

	// On return from the payment gateway, the callback sends us back to
	// /donate?status=…&order=…&amount=… — show the result inline on this page.
	React.useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const status = params.get('status');
		if (!status) return;

		const normalized = (RESULT_STATUSES as string[]).includes(status)
			? (status as DonationResultStatus)
			: 'invalid';

		setResultStatus(normalized);
		setResultOrderId(params.get('order') ?? '');
		setResultTrackingId(params.get('tracking') ?? '');
		setResultAmount(params.get('amount') ?? '');
		setIsRedirecting(false);
		setStep(3);

		// Clean the query string so a refresh doesn't re-show the result.
		window.history.replaceState({}, '', window.location.pathname + '#donate-form');
	}, []);

	React.useEffect(() => {
		if (!formRef.current) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setFormHeight(entry.target.scrollHeight);
			}
		});
		observer.observe(formRef.current);
		return () => observer.disconnect();
	}, []);

	// Update slider height dynamically when active step changes
	React.useEffect(() => {
		const getActiveRef = () => {
			if (step === 1) return step1Ref.current;
			if (step === 2) return step2Ref.current;
			if (step === 3) return step3Ref.current;
			return null;
		};

		const observer = new ResizeObserver(() => {
			const activeEl = getActiveRef();
			if (activeEl) {
				setSliderHeight(activeEl.offsetHeight);
			}
		});

		const activeEl = getActiveRef();
		if (activeEl) {
			observer.observe(activeEl);
			setSliderHeight(activeEl.offsetHeight);
		}

		return () => observer.disconnect();
	}, [step, isRedirecting, isSuccess, resultStatus]);


	const getAmountNumber = () => {
		if (selectedButton !== null && buttons[selectedButton]) {
			const numericStr = buttons[selectedButton].amount.replace(/[^0-9]/g, '');
			return Number(numericStr);
		}
		return Number(customAmount) || 0;
	};

	const getDonationAmountText = () => {
		const amt = getAmountNumber();
		return `₹${amt.toLocaleString('en-IN')}`;
	};

	const getActiveImpactText = () => {
		if (selectedButton !== null && buttonImpacts[selectedButton]) {
			return buttonImpacts[selectedButton];
		}
		return "Every contribution directly supports educational equity, child nutrition, and school infrastructure development for underprivileged kids.";
	};

	const validateStep = (stepNum: number): boolean => {
		if (stepNum === 1) {
			const amt = getAmountNumber();
			if (amt <= 0) {
				setFieldErrors(prev => ({...prev, amount: 'Please enter or select a valid donation amount'}));
				return false;
			}
			setFieldErrors(prev => {
				const next = {...prev};
				delete next.amount;
				return next;
			});
			return true;
		}

		if (stepNum === 2) {
			const data = {firstName, lastName, email, phone, pan, address, purpose};
			const result = buildStep2Schema(purposeOptions.map((p) => p.label)).safeParse(data);
			if (!result.success) {
				const errors: FieldErrors = {};
				result.error.issues.forEach((issue) => {
					const field = issue.path[0] as keyof DonateFormData;
					if (!errors[field]) {
						errors[field] = issue.message;
					}
				});
				setFieldErrors(prev => ({...prev, ...errors}));
				return false;
			}
			setFieldErrors(prev => {
				const next = {...prev};
				Object.keys(data).forEach(f => delete next[f as keyof DonateFormData]);
				return next;
			});
			return true;
		}

		return true;
	};

	const clearFieldError = (field: keyof DonateFormData) => {
		setFieldErrors(prev => {
			if (!prev[field]) return prev;
			const next = {...prev};
			delete next[field];
			return next;
		});
	};

	const isNextDisabled = () => {
		if (step === 1) return getAmountNumber() <= 0;
		if (step === 2) return !firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !pan.trim() || !address.trim() || !purpose;
		return false;
	};

	const onSubmit = async (): Promise<PaymentInitiation | null> => {
		const formData: DonateFormData = {
			amount: getAmountNumber(),
			frequency,
			firstName,
			lastName,
			email,
			phone,
			pan,
			address,
			purpose: purpose as DonationPurpose,
		};

		setFieldErrors({});
		setSubmitError('');
		setIsSubmitting(true);

		try {
			const res = await fetch('/api/donate', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(formData),
			});

			const data = (await res.json().catch(() => null)) as
				| { message?: string; orderId?: string; initiation?: PaymentInitiation }
				| null;

			if (!res.ok || !data?.initiation) {
				setSubmitError(data?.message ?? 'Something went wrong. Please try again.');
				return null;
			}

			return data.initiation;
		} catch (error) {
			console.error('Donation submission error:', error);
			setSubmitError('Network error. Please try again.');
			return null;
		} finally {
			setIsSubmitting(false);
		}
	};

	const animateToStep = (newStep: number) => {
		if (newStep === step) return;
		setStep(newStep);
	};

	const handleNext = async () => {
		if (isNextDisabled()) return;

		if (!validateStep(step)) return;

		if (step === 2) {
			const initiation = await onSubmit();
			if (!initiation) return;

			// Show the redirecting state, then hand off to the payment gateway.
			// This navigates the browser away; the gateway returns the donor to
			// /api/donate/callback → /donate/status.
			setIsRedirecting(true);
			setStep(3);
			redirectToGateway(initiation);
		} else {
			animateToStep(step + 1);
		}
	};

	const handleReset = () => {
		setStep(1);
		setIsRedirecting(false);
		setIsSuccess(false);
		setResultStatus(null);
		setResultOrderId('');
		setResultTrackingId('');
		setResultAmount('');
		setSelectedButton(2);
		setCustomAmount('');
		setFrequency('once');
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setPan('');
		setAddress('');
		setPurpose('');
		setFieldErrors({});
		setSubmitError('');
	};

	const buttonLabels = [
		"Next: Your Details",
		`Donate ${getDonationAmountText()} Now`
	];

	return (
		<div
			id="donate-form"
			className="w-full xl:max-w-130 border border-[#1A18152E] rounded-2xl overflow-hidden bg-[#F7F5F2] shadow-[0_8px_32px_0_rgba(26,24,21,0.06)]"
			style={{
				height: formHeight !== undefined ? `${formHeight}px` : 'auto',
				transition: isMounted ? 'height 300ms ease-in-out' : 'none',
			}}
		>
			<div ref={formRef} className="flex flex-col h-auto">
				{/* Form Header (Only visible for Step 1 and Step 2) */}
				{step < 3 && (
					<div
						className="p-4 xl:py-7 xl:px-9 flex flex-col gap-4 xl:gap-2.5 bg-[linear-gradient(135deg,#CE2028_0%,#A3171E_70.72%)]">
						<div className="xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-8">
							<p className={"xl:shrink-0 typo-h3 text-[24px]! sm:text-[32px]! text-white"}>Donation Application</p>
							<p className={"hidden xl:block shrink-0 typo-body2 text-white uppercase font-extrabold!"}>step {step} of
								3</p>
						</div>
						<div className="relative">
							<div className="rounded-full bg-[#FFFFFF66] w-full h-1"/>
							<div className="absolute top-0 left-0 bg-white h-1 rounded-full transition-all duration-300"
							     style={{width: `calc(${step}/3*100%)`}}/>
						</div>
						<div className="flex flex-row justify-between items-center">
							<div className="flex flex-row flex-wrap gap-2 shrink-0">
								<button type={"button"}
								        onClick={() => animateToStep(1)}
								        className={cn("transition-all duration-300 rounded-full h-1.5 hover:cursor-pointer", step === 1 ? "w-5 bg-white" : "w-1.5 bg-[#FFFFFFA1]")}/>
								<button type={"button"}
								        onClick={() => {
									        if (validateStep(1)) animateToStep(2);
								        }}
								        className={cn("transition-all duration-300 rounded-full h-1.5 hover:cursor-pointer", step === 2 ? "w-5 bg-white" : "w-1.5 bg-[#FFFFFFA1]")}/>
								<button type={"button"}
								        disabled
								        className={cn("transition-all duration-300 rounded-full h-1.5 w-1.5 bg-[#FFFFFFA1]")}/>
							</div>
							<p className={"xl:hidden shrink-0 typo-body2 text-white uppercase font-extrabold!"}>step {step} of 3</p>
						</div>
					</div>
				)}

				{/* Content Section */}
				<div
					className={cn("flex-1 flex flex-col justify-between overflow-hidden", step === 3 ? "p-0" : "p-4 xl:py-8 xl:px-9 gap-5 xl:gap-6")}>
					{step === 3 ? (
						<div ref={step3Ref} className="w-full">
							{isRedirecting && (
								<div
									className="flex flex-col gap-3 items-center justify-center px-5 py-12 bg-white rounded-2xl min-h-[360px] text-center border border-[rgba(26,24,21,0.1)] shadow-[0_14px_40px_0_rgba(26,24,21,0.12)]">
									<p className="text-[48px] animate-bounce mb-1">
										🙏
									</p>
									<p className="font-fraunces-italics font-semibold italic text-[28px] text-[#1a1815]">
										Thank you!
									</p>
									<div className="flex flex-col items-center gap-4 mt-2">
										<p className="typo-body3 text-[#6b6761] leading-[22px] max-w-xs">
											Redirecting to secure payment gateway…
										</p>
										<Loader2Icon className="animate-spin text-primary-red w-6 h-6 mt-1"/>
									</div>
								</div>
							)}

							{resultStatus && !isRedirecting && (() => {
								const amt = Number(resultAmount);
								const amtText = Number.isFinite(amt) && amt > 0 ? `₹${amt.toLocaleString('en-IN')}` : '';
								const view =
									resultStatus === 'success'
										? {wrap: 'bg-[#2C5F3F1F] text-[#2C5F3F]', icon: <CheckIcon className="w-8 h-8 stroke-3"/>, title: 'Payment Successful!'}
										: resultStatus === 'pending'
											? {wrap: 'bg-[#B7791F1F] text-[#B7791F]', icon: <ClockIcon className="w-8 h-8 stroke-[2.5]"/>, title: 'Payment Pending'}
											: resultStatus === 'aborted'
												? {wrap: 'bg-[#6B67611F] text-[#6B6761]', icon: <XIcon className="w-8 h-8 stroke-[2.5]"/>, title: 'Payment Cancelled'}
												: {wrap: 'bg-[#CE20281F] text-primary-red', icon: <AlertTriangleIcon className="w-8 h-8 stroke-[2.5]"/>, title: 'Payment Failed'};
								const message =
									resultStatus === 'success'
										? (amtText ? `Thank you for your donation of ${amtText}. Your 80G tax-exemption receipt will be emailed to you shortly.` : 'Thank you for your donation. Your 80G tax-exemption receipt will be emailed to you shortly.')
										: resultStatus === 'pending'
											? "We're confirming your payment with the bank. This can take a few moments — we'll email you once it's confirmed."
											: resultStatus === 'aborted'
												? 'Your payment was cancelled and you have not been charged. You can try again whenever you are ready.'
												: "We couldn't process your payment. No amount has been deducted. Please try again or use a different method.";
								return (
									<div
										className="flex flex-col gap-4 items-center justify-center p-6 xl:py-12 xl:px-9 bg-white rounded-2xl min-h-[360px] text-center border border-[rgba(26,24,21,0.1)] shadow-[0_14px_40px_0_rgba(26,24,21,0.12)]">
										<div
											className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-2 shrink-0", view.wrap)}>
											{view.icon}
										</div>
										<h2 className="typo-h3 text-[28px]! text-[#1A1815]">{view.title}</h2>
										<p className="typo-body3 text-[#6B6761] max-w-sm">{message}</p>

										{(resultOrderId || resultTrackingId) && (
											<div className="w-full max-w-sm flex flex-col gap-2 mt-1">
												{resultOrderId && (
													<div className="rounded-lg bg-[#F7F5F2] border border-[#1A18151A] px-4 py-2.5 text-left">
														<p className="typo-body2 uppercase tracking-[0.84px] text-[#6B6761] text-[11px]!">Yuva Order ID</p>
														<p className="typo-body3 font-semibold! text-[#1A1815] break-all">{resultOrderId}</p>
													</div>
												)}
												{resultTrackingId && (
													<div className="rounded-lg bg-[#F7F5F2] border border-[#1A18151A] px-4 py-2.5 text-left">
														<p className="typo-body2 uppercase tracking-[0.84px] text-[#6B6761] text-[11px]!">CCAvenue Tracking ID</p>
														<p className="typo-body3 font-semibold! text-[#1A1815] break-all">{resultTrackingId}</p>
													</div>
												)}
											</div>
										)}

										<PrimaryButton
											type="button"
											label={resultStatus === 'success' ? 'Donate Again' : 'Try Again'}
											btnClassName="font-bold! py-2.5 px-7 w-fit hover:cursor-pointer transition-transform hover:scale-[1.02] mt-2"
											onClickAction={handleReset}
										/>
									</div>
								);
							})()}
						</div>
					) : (
						<>
							{/* Sliders for Step 1 and Step 2 */}
							<div
								className="overflow-hidden w-full relative"
								style={{
									height: sliderHeight !== undefined ? `${sliderHeight}px` : 'auto'
								}}
							>
								<div
									className="flex transition-transform duration-300 ease-in-out items-start"
									style={{
										transform: `translateX(-${(step - 1) * 50}%)`,
										width: '200%'
									}}
								>
									{/* STEP 1: Amount Selection */}
									<div ref={step1Ref} className="w-1/2 shrink-0 flex flex-col gap-4 px-0.5">
										<p className={"typo-body2 text-[#6B6761] uppercase mb-1"}>step 1 — Amount & Cause</p>


										<div className="flex flex-col gap-3">
											<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
												{buttons.map((button, index) => (
													<button key={index} type="button" onClick={() => {
														setSelectedButton(index);
														setCustomAmount('');
													}}
													        className={cn("border rounded-xl hover:cursor-pointer flex flex-col gap-1 px-2.5 py-3.5 items-center transition-all duration-300", index === selectedButton ? cn("bg-primary-red border-primary-red text-white", step === 1 && "shadow-[0_6px_16px_0_rgba(206,32,40,0.25)]") : "bg-white border-[#1A18152E] text-[#1A1815]")}>
														<p className={"typo-h4 text-[20px]! sm:text-[22px]!"}>{button.amount}</p>
														<p
															className={cn("typo-body2 uppercase text-[10px]! sm:text-[11px]!", index === selectedButton ? "text-[#FFFFFFB2]" : "text-[#6B6761]")}>{button.title}</p>
													</button>
												))}
											</div>

											{/* Custom Amount Input */}
											<div className="relative">
												<div className="flex rounded-xl overflow-hidden border border-[#1A18152E]">
                          <span
	                          className="inline-flex text-[20px] font-fraunces-italics text-[#6B6761] items-center px-4 bg-white/50 border-r border-[#1A18152E]">
                            ₹
                          </span>
													<input type="number"
													       value={customAmount}
													       onChange={(e) => {
														       setCustomAmount(e.target.value);
														       setSelectedButton(null);
													       }}
													       className="focus:outline-0 w-full px-4 py-3 placeholder:typo-body5 placeholder:text-[#6B6761]/60 typo-body5 text-[#1A1815] font-semibold! [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
													       placeholder="Enter a different amount"
													/>
												</div>
												{fieldErrors.amount && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.amount}</p>}
											</div>
										</div>

										{/* Impact Text */}
										<p
											className={"ps-3.5 border-l-3 py-2 border-primary-red font-fraunces-italics text-[#6B6761] text-[12px] min-h-[48px] leading-relaxed"}>
											{getActiveImpactText()}
										</p>
									</div>

									{/* STEP 2: Your Details */}
									<div ref={step2Ref} className="w-1/2 shrink-0 flex flex-col gap-4 px-0.5">
										<div className="flex flex-col gap-3 mb-1">
											{/* Back button */}
											<button
												type="button"
												onClick={() => animateToStep(1)}
												className="w-fit inline-flex items-center gap-1.5 hover:cursor-pointer text-[#6B6761] hover:text-[#1A1815] transition-colors"
											>
												<ChevronLeftIcon size={14} className="stroke-2"/>
												<span className="typo-body5 font-bold uppercase tracking-[0.84px]">Back to amount</span>
											</button>

											{/* Summary Pill */}
											<div
												className="bg-[#FBEAEA] border border-[rgba(206,32,40,0.18)] px-3.5 py-1.5 rounded-full w-fit">
												<p className="typo-body5 font-extrabold text-primary-red uppercase tracking-wider text-[11px]!">
													{getDonationAmountText()} · {frequency === 'once' ? 'One-time' : 'Monthly'} · Yuva Unstoppable
												</p>
											</div>
										</div>

										{/* Inputs */}
										<div className="flex flex-col gap-3">
											<div className="flex flex-col sm:flex-row gap-3">
												<div className="relative flex-1">
													<input id="firstName"
													       value={firstName}
													       onChange={(e) => {
														       setFirstName(e.target.value);
														       clearFieldError('firstName');
													       }}
													       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.firstName ? 'border-red-500' : 'border-[#1A18152E]')}
													       type="text" name="firstName" placeholder="Aanya"/>
													<label
														className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
														htmlFor="firstName">First Name *</label>
													{fieldErrors.firstName &&
                              <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.firstName}</p>}
												</div>
												<div className="relative flex-1">
													<input id="lastName"
													       value={lastName}
													       onChange={(e) => {
														       setLastName(e.target.value);
														       clearFieldError('lastName');
													       }}
													       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.lastName ? 'border-red-500' : 'border-[#1A18152E]')}
													       type="text" name="lastName" placeholder="Sharma"/>
													<label
														className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
														htmlFor="lastName">Last Name *</label>
													{fieldErrors.lastName &&
                              <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.lastName}</p>}
												</div>
											</div>

											<div className="relative flex-1">
												<input id="email"
												       value={email}
												       onChange={(e) => {
													       setEmail(e.target.value);
													       clearFieldError('email');
												       }}
												       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.email ? 'border-red-500' : 'border-[#1A18152E]')}
												       type="email" name="email" placeholder="aanya.sharma@example.com"/>
												<label className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
												       htmlFor="email">email address *</label>
												{fieldErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.email}</p>}
											</div>

											<div className="relative flex-1">
												<input id="phone"
												       value={phone}
												       onChange={(e) => {
													       setPhone(e.target.value);
													       clearFieldError('phone');
												       }}
												       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.phone ? 'border-red-500' : 'border-[#1A18152E]')}
												       type="text" name="phone" placeholder="+91 98XXX XXXXX"/>
												<label className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
												       htmlFor="phone">phone number *</label>
												{fieldErrors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.phone}</p>}
											</div>

											<div className="relative flex-1">
												<input id="pan"
												       value={pan}
												       onChange={(e) => {
													       setPan(e.target.value.toUpperCase());
													       clearFieldError('pan');
												       }}
												       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.pan ? 'border-red-500' : 'border-[#1A18152E]')}
												       type="text" name="pan" placeholder="ABCDE1234F" required/>
												<label className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
												       htmlFor="pan">PAN Number (for 80G receipt) *</label>
												{fieldErrors.pan && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.pan}</p>}
											</div>

											<div className="relative flex-1">
												<input id="address"
												       value={address}
												       onChange={(e) => {
													       setAddress(e.target.value);
													       clearFieldError('address');
												       }}
												       className={cn("placeholder:text-[#1A1815]/30 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.address ? 'border-red-500' : 'border-[#1A18152E]')}
												       type="text" name="address" placeholder="123, MG Road, Ahmedabad"/>
												<label className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
												       htmlFor="address">Address *</label>
												{fieldErrors.address && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.address}</p>}
											</div>

											<div className="relative flex-1">
												<select
													id="purpose"
													value={purpose}
													onChange={(e) => {
														setPurpose(e.target.value as DonationPurpose | '');
														clearFieldError('purpose');
													}}
													className={cn(
														"w-full px-4 pr-10 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0 typo-body3 text-[#1A1815] appearance-none cursor-pointer",
														fieldErrors.purpose ? 'border-red-500' : 'border-[#1A18152E]'
													)}
													name="purpose"
												>
													<option value="" disabled className="text-[#6B6761]">Select a purpose</option>
													{purposeOptions.map((option) => (
														<option key={option.id || option.label} value={option.label} className="text-[#1A1815] bg-white">{option.label}</option>
													))}
												</select>
												<ChevronDownIcon
													className="absolute right-4 top-[calc(50%+8px)] -translate-y-1/2 w-4 h-4 text-[#6B6761] pointer-events-none"
													aria-hidden="true"
												/>
												<label className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
												       htmlFor="purpose">Purpose *</label>
												{fieldErrors.purpose && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.purpose}</p>}
											</div>
										</div>
									</div>
								</div>
							</div>

							{submitError && (
								<p role="alert" className="text-red-600 text-sm font-medium">
									{submitError}
								</p>
							)}

							{/* Action Buttons */}
							<div
								className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-[#1A18151A] shrink-0">
								{step > 1 ? (
									<PrimaryButton
										type="button"
										onClickAction={() => animateToStep(step - 1)}
										label={"Back"}
										leftIcon={<ChevronLeftIcon size={16}/>}
										btnClassName="typo-body3 bg-transparent border border-[#1A18152E] py-2 px-5 font-extrabold uppercase text-[#6B6761] hover:text-[#1A1815] transition-colors hover:cursor-pointer"
									/>
								) : (
									<div/>
								)}

								<PrimaryButton
									type="button"
									label={isSubmitting ? 'Processing...' : buttonLabels[step - 1]}
									btnClassName={cn(
										"font-bold! py-2 px-5 sm:px-7 w-fit hover:cursor-pointer transition-all text-[13px]! sm:text-[15px]!",
										(isNextDisabled() || isSubmitting) && "opacity-50 cursor-not-allowed"
									)}
									onClickAction={handleNext}
									disabled={isNextDisabled() || isSubmitting}
									rightIcon={<ChevronRightIcon className="w-4 h-4"/>}
								/>
							</div>

							{/* Trust Badges Footer */}
							{/* <div className="flex gap-4 items-center justify-center pt-2.5 border-t border-[#1A18150D]">
								<p className="font-sans text-[11px] font-semibold text-[#6B6761] flex items-center gap-1">
									<span className="text-[#2C5F3F] text-xs">🛡️</span> 80G Certificate issued
								</p>
								<p className="font-sans text-[11px] font-semibold text-[#6B6761] flex items-center gap-1">
									<span className="text-[#2C5F3F] text-xs">🔒</span> 256-bit SSL Secure
								</p>
							</div> */}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default DonateForm;