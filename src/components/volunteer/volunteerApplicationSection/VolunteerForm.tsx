'use client'

import React from 'react';
import {z} from 'zod';
import {cn} from "@/lib/utils";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowRightIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

// ── Zod Validation Schemas ──────────────────────────────────────────────────

const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z
    .string()
    .refine(
      (val) => val === '' || /^\+?[0-9\s\-()]{7,15}$/.test(val),
      {message: 'Please enter a valid phone number'}
    ),
  city: z.string(),
});

const step2Schema = z.object({
  preference: z.string().min(1, 'Please select a volunteer type'),
  availabilities: z.array(z.string()),
  skills: z.string().min(1, 'Please describe your skills or profession'),
});

const step3Schema = z.object({
  whyVolunteer: z.string().min(1, 'Please tell us why you want to volunteer'),
  contribution: z.string().min(1, 'Please describe how you\'d like to contribute'),
});

const volunteerFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
type FieldErrors = Partial<Record<keyof VolunteerFormData, string>>;

function VolunteerForm() {
  const [step, setStep] = React.useState<number>(1);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [successVisible, setSuccessVisible] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

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

  // Update slider height dynamically when active step changes or active step content height changes
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
  }, [step]);

  // Form states
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [city, setCity] = React.useState('');

  const [preference, setPreference] = React.useState('students');
  const [availabilities, setAvailabilities] = React.useState<string[]>(['Weekdays']);
  const [skills, setSkills] = React.useState('');

  const [whyVolunteer, setWhyVolunteer] = React.useState('');
  const [contribution, setContribution] = React.useState('');

  const stepTitles = [
    "VOLUNTEER DETAILS",
    "VOLUNTEER PREFERENCES",
    "TELL US MORE"
  ];

  const buttonLabels = [
    "Next: Volunteer Preferences",
    "Next: Tell Us More",
    "Submit Application"
  ];

  const volunteerTypes = [
    {id: 'students', label: 'With Students', subtext: 'Mentoring & tutoring', icon: '🎓'},
    {id: 'community', label: 'Community', subtext: 'On-ground programmes', icon: '🌱'},
    {id: 'operational', label: 'Operational', subtext: 'Skills & support', icon: '💼'}
  ];

  const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Virtual only",
    "On-site",
    "4 hrs/month",
    "8+ hrs/month"
  ];

  const toggleAvailability = (opt: string) => {
    setAvailabilities(prev =>
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  // ── Per-step Zod validation ───────────────────────────────────────────────

  const getStepData = (stepNum: number) => {
    if (stepNum === 1) return {firstName, lastName, email, phone, city};
    if (stepNum === 2) return {preference, availabilities, skills};
    if (stepNum === 3) return {whyVolunteer, contribution};
    return {};
  };

  const getStepSchema = (stepNum: number) => {
    if (stepNum === 1) return step1Schema;
    if (stepNum === 2) return step2Schema;
    if (stepNum === 3) return step3Schema;
    return z.object({});
  };

  const validateStep = (stepNum: number): boolean => {
    const schema = getStepSchema(stepNum);
    const data = getStepData(stepNum);
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof VolunteerFormData;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(prev => ({...prev, ...errors}));
      return false;
    }

    // Clear errors for fields in this step
    const stepFields = Object.keys(data) as (keyof VolunteerFormData)[];
    setFieldErrors(prev => {
      const next = {...prev};
      stepFields.forEach(f => delete next[f]);
      return next;
    });
    return true;
  };

  const clearFieldError = (field: keyof VolunteerFormData) => {
    setFieldErrors(prev => {
      if (!prev[field]) return prev;
      const next = {...prev};
      delete next[field];
      return next;
    });
  };

  const isNextDisabled = () => {
    if (step === 1) return !firstName.trim() || !lastName.trim() || !email.trim();
    if (step === 2) return !skills.trim();
    if (step === 3) return !whyVolunteer.trim() || !contribution.trim();
    return false;
  };

  // ── Submit handler ────────────────────────────────────────────────────────

  const onSubmit = async () => {
    // Validate entire form before submitting
    const formData: VolunteerFormData = {
      firstName, lastName, email, phone, city,
      preference, availabilities, skills,
      whyVolunteer, contribution,
    };

    const result = volunteerFormSchema.safeParse(formData);

    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof VolunteerFormData;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const data = (await res.json().catch(() => null)) as { message?: string } | null;

      if (!res.ok) {
        setSubmitError(data?.message ?? 'Something went wrong. Please try again.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Network error. Please try again.');
      return false;
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

    // Validate current step before proceeding
    if (!validateStep(step)) return;

    if (step === 3) {
      const submitted = await onSubmit();
      if (!submitted) return;

      setIsSuccess(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSuccessVisible(true);
        });
      });
    } else {
      animateToStep(step + 1);
    }
  };

  const handleReset = () => {
    setSuccessVisible(false);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCity('');
      setPreference('students');
      setAvailabilities(['Weekdays']);
      setSkills('');
      setWhyVolunteer('');
      setContribution('');
      setFieldErrors({});
      setSubmitError('');
    }, 200);
  };

  return (
    <div
      className="border border-[#1A18152E] rounded-2xl overflow-hidden bg-[#F7F5F2] shadow-[0_8px_32px_0_rgba(26,24,21,0.06)]"
      style={{
        height: formHeight !== undefined ? `${formHeight}px` : 'auto',
        transition: isMounted ? 'height 300ms ease-in-out' : 'none',
      }}
    >
      <div ref={formRef} className="flex flex-col h-auto sm:min-h-145.5 xl:min-h-155">
        {isSuccess ? (
          <div
            className="flex flex-col items-center justify-center p-6 xl:py-12 xl:px-9 text-center min-h-80 sm:min-h-145.5 xl:min-h-155">
            <div
              className="flex flex-col items-center"
              style={{
                opacity: successVisible ? 1 : 0,
                transform: successVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(12px)',
                transition: 'opacity 350ms ease, transform 350ms ease',
              }}
            >
              <div
                className="w-16 h-16 rounded-full bg-[#2C5F3F1F] flex items-center justify-center text-[#2C5F3F] mb-6 shrink-0">
                <CheckIcon className="w-8 h-8 stroke-3"/>
              </div>
              <h2 className="typo-h3 text-[28px]! text-[#1A1815] mb-3">Application Sent!</h2>
              <p className="typo-body1 text-[#6B6761] max-w-sm mb-8">
                We&apos;ll get back to you within 48 hours. Check your inbox — and get ready to show up.
              </p>
              <PrimaryButton
                type="button"
                label="Back to Form"
                btnClassName="font-bold! py-2.5 px-7 w-fit hover:cursor-pointer"
                onClickAction={handleReset}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className="p-4 xl:py-7 xl:px-9 flex flex-col gap-4 xl:gap-2.5 bg-[linear-gradient(135deg,#CE2028_0%,#A3171E_70.72%)]">
              <div className="xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-8">
                <p className={"xl:shrink-0 typo-h3 text-[24px]! sm:text-[32px]! text-white"}>Volunteer Application</p>
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
                          onClick={() => {
                            if (validateStep(1) && validateStep(2)) animateToStep(3);
                          }}
                          className={cn("transition-all duration-300 rounded-full h-1.5 hover:cursor-pointer", step === 3 ? "w-5 bg-white" : "w-1.5 bg-[#FFFFFFA1]")}/>
                </div>
                <p className={"xl:hidden shrink-0 typo-body2 text-white uppercase font-extrabold!"}>step {step} of 3</p>
              </div>
            </div>
            <div className="flex-1 p-4 xl:py-8 xl:px-9 flex flex-col gap-5 xl:gap-7.5 justify-between overflow-hidden">
              <div
                className="overflow-hidden w-full relative"
                style={{
                  height: sliderHeight !== undefined ? `${sliderHeight}px` : 'auto'
                }}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out items-start"
                  style={{
                    transform: `translateX(-${(step - 1) * 33.3333}%)`,
                    width: '300%'
                  }}
                >
                  {/* STEP 1: Volunteer Details */}
                  <div ref={step1Ref} className="w-1/3 shrink-0 flex flex-col gap-4 px-0.5">
                    <p className={"typo-body2 text-[#6B6761] uppercase mb-1"}>step 1 — {stepTitles[0]}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input id={"firstName"}
                               value={firstName}
                               onChange={(e) => {
                                 setFirstName(e.target.value);
                                 clearFieldError('firstName');
                               }}
                               className={cn("placeholder:text-[#1A1815] w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.firstName ? 'border-red-500' : 'border-[#1A18152E]')}
                               type={"text"} name={"firstName"} placeholder={"Aanya"}/>
                        <label
                          className={"absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"}
                          htmlFor={"firstName"}>First Name *</label>
                        {fieldErrors.firstName &&
                            <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.firstName}</p>}
                      </div>
                      <div className="relative flex-1">
                        <input id={"lastName"}
                               value={lastName}
                               onChange={(e) => {
                                 setLastName(e.target.value);
                                 clearFieldError('lastName');
                               }}
                               className={cn("placeholder:text-[#1A1815] w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.lastName ? 'border-red-500' : 'border-[#1A18152E]')}
                               type={"text"} name={"lastName"} placeholder={"Sharma"}/>
                        <label
                          className={"absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"}
                          htmlFor={"lastName"}>Last Name *</label>
                        {fieldErrors.lastName &&
                            <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <input id={"email"}
                             value={email}
                             onChange={(e) => {
                               setEmail(e.target.value);
                               clearFieldError('email');
                             }}
                             className={cn("placeholder:text-[#1A1815] w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.email ? 'border-red-500' : 'border-[#1A18152E]')}
                             type={"email"} name={"email"} placeholder={"aanya.sharma@example.com"}/>
                      <label className={"absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"}
                             htmlFor={"email"}>email address *</label>
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.email}</p>}
                    </div>
                    <div className="relative flex-1">
                      <input id={"phone"}
                             value={phone}
                             onChange={(e) => {
                               setPhone(e.target.value);
                               clearFieldError('phone');
                             }}
                             className={cn("placeholder:text-[#1A1815] w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0", fieldErrors.phone ? 'border-red-500' : 'border-[#1A18152E]')}
                             type={"text"} name={"phone"} placeholder={"+91 98XXX XXXXX"}/>
                      <label className={"absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"}
                             htmlFor={"phone"}>phone number</label>
                      {fieldErrors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.phone}</p>}
                    </div>
                    <div className="relative flex-1">
                      <input id={"city"}
                             value={city}
                             onChange={(e) => setCity(e.target.value)}
                             className={"placeholder:text-[#1A1815] w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border border-[#1A18152E] rounded-[10px] bg-white focus:outline-0"}
                             type={"text"} name={"city"} placeholder={"Ahmedabad"}/>
                      <label className={"absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"}
                             htmlFor={"city"}>city</label>
                    </div>
                  </div>

                  {/* STEP 2: Volunteer Preferences */}
                  <div ref={step2Ref} className="w-1/3 shrink-0 flex flex-col gap-5 px-0.5">
                    <p className={"typo-body2 text-[#6B6761] uppercase mb-1"}>step 2 — {stepTitles[1]}</p>
                    <div className="flex flex-col gap-2.5">
                      <p className="typo-body2 text-[#6B6761] uppercase tracking-[0.84px]">
                        How would you like to volunteer? *
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xl:gap-3">
                        {volunteerTypes.map((type) => {
                          const isSelected = preference === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setPreference(type.id)}
                              className={cn(
                                "flex flex-col items-center text-center p-2.5 xl:py-4 xl:px-2 rounded-[10px] border transition-all duration-300 hover:cursor-pointer min-h-28 sm:min-h-32 xl:min-h-36 justify-center gap-1.5 xl:gap-2",
                                isSelected
                                  ? "bg-[#FBEAEA] border-[#CE2028] text-[#CE2028]"
                                  : "bg-white border-[#1A18152E] text-[#1A1815] hover:border-[#6B6761]"
                              )}
                            >
                              <div className={cn(
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 text-[10px] font-bold shrink-0",
                                isSelected
                                  ? "bg-[#CE2028] border-[#CE2028] text-white"
                                  : "bg-transparent border-[#1A18152E]"
                              )}>
                                {isSelected ? "✓" : null}
                              </div>
                              <span className="text-xl xl:text-2xl mb-0.5">{type.icon}</span>
                              <span
                                className="typo-body4 font-extrabold uppercase tracking-wide text-[12px]! xl:text-[13px]!">{type.label}</span>
                              <span
                                className="typo-body5 text-[#6B6761] text-[10px]! xl:text-[11px]! line-clamp-2 leading-tight">{type.subtext}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <p className="typo-body2 text-[#6B6761] uppercase tracking-[0.84px]">
                        Availability
                      </p>
                      <div className="flex flex-wrap gap-1.5 xl:gap-2">
                        {availabilityOptions.map((opt) => {
                          const isSelected = availabilities.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleAvailability(opt)}
                              className={cn(
                                "transition-all duration-300 rounded-full py-1.5 px-3.5 typo-body4 font-bold border hover:cursor-pointer text-[12px]! xl:text-[13px]!",
                                isSelected
                                  ? "bg-[#CE2028] border-[#CE2028] text-white"
                                  : "bg-white border-[#1A18152E] text-[#6B6761] hover:border-[#6B6761]"
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        id="skills"
                        value={skills}
                        onChange={(e) => {
                          setSkills(e.target.value);
                          clearFieldError('skills');
                        }}
                        className={cn("placeholder:text-[#1A1815]/40 w-full placeholder:typo-body3 typo-body3 text-[#1A1815] px-4 pb-2 pt-7 border rounded-[10px] bg-white focus:outline-0 resize-none h-20 xl:h-24", fieldErrors.skills ? 'border-red-500' : 'border-[#1A18152E]')}
                        placeholder="Graphic designer, 6 yrs"
                      />
                      <label
                        className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
                        htmlFor="skills"
                      >
                        Your skills or profession *
                      </label>
                      {fieldErrors.skills && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.skills}</p>}
                    </div>
                  </div>

                  {/* STEP 3: Tell Us More */}
                  <div ref={step3Ref} className="w-1/3 shrink-0 flex flex-col gap-4 px-0.5">
                    <p className={"typo-body2 text-[#6B6761] uppercase mb-1"}>step 3 — {stepTitles[2]}</p>
                    <div className="relative">
                      <textarea
                        id="whyVolunteer"
                        value={whyVolunteer}
                        onChange={(e) => {
                          setWhyVolunteer(e.target.value);
                          clearFieldError('whyVolunteer');
                        }}
                        className={cn("placeholder:text-[#1A1815]/40 w-full placeholder:typo-body3 leading-4! placeholder:leading-4! typo-body3 text-[#1A1815] px-4 pb-2 sm:pt-7 pt-12 border rounded-[10px] bg-white focus:outline-0 resize-none h-28 xl:h-32", fieldErrors.whyVolunteer ? 'border-red-500' : 'border-[#1A18152E]')}
                        placeholder="I've followed Yuva since 2018 and want to commit my time to the school-mentoring programme..."
                      />
                      <label
                        className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
                        htmlFor="whyVolunteer"
                      >
                        Why do you want to volunteer with Yuva? *
                      </label>
                      {fieldErrors.whyVolunteer &&
                          <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.whyVolunteer}</p>}
                    </div>

                    <div className="relative">
                      <textarea
                        id="contribution"
                        value={contribution}
                        onChange={(e) => {
                          setContribution(e.target.value);
                          clearFieldError('contribution');
                        }}
                        className={cn("placeholder:text-[#1A1815]/40 w-full placeholder:typo-body3 leading-4! placeholder:leading-4! typo-body3 text-[#1A1815] px-4 pb-2 sm:pt-7 pt-12 border rounded-[10px] bg-white focus:outline-0 resize-none h-28 xl:h-32", fieldErrors.contribution ? 'border-red-500' : 'border-[#1A18152E]')}
                        placeholder="Brand design, communications, photography..."
                      />
                      <label
                        className="absolute top-2 left-4 typo-body2 tracking-[0.84px] uppercase text-primary-red"
                        htmlFor="contribution"
                      >
                        Any specific skills or experience you&apos;d like to contribute? *
                      </label>
                      {fieldErrors.contribution &&
                          <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.contribution}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {submitError && (
                <p role="alert" className="text-red-600 text-sm font-medium">
                  {submitError}
                </p>
              )}

              <div
                className="flex flex-wrap justify-between items-center gap-3 pt-5 border-t border-[#1A18151A] shrink-0">
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
                  label={isSubmitting ? 'Submitting...' : buttonLabels[step - 1]}
                  btnClassName={cn(
                    "font-bold! py-2 px-5 sm:px-7 w-fit hover:cursor-pointer transition-all text-[13px]! sm:text-[15px]!",
                    (isNextDisabled() || isSubmitting) && "opacity-50 cursor-not-allowed"
                  )}
                  onClickAction={handleNext}
                  disabled={isNextDisabled() || isSubmitting}
                  rightIcon={step === 3 ? <ArrowRightIcon className="w-4 h-4"/> :
                    <ChevronRightIcon className="w-4 h-4"/>}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VolunteerForm;