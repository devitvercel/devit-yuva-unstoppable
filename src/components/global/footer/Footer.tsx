import React from "react";
import Image from "next/image";
import {
	FacebookIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
	YoutubeIcon,
} from "../../../../public/SVGs/svg";
import Link from "next/link";
import {
	APP_ROUTES,
	FOOTER_GET_INVOLVED_LINKS,
	FOOTER_ORGANISATION_LINKS,
	FOOTER_PROGRAMMES_SECTION_LINKS,
	FOOTER_SOCIAL_LINKS,
} from "@/constants/navigation.constants";

const SOCIAL_ICONS = {
	facebook: FacebookIcon,
	twitter: TwitterIcon,
	linkedin: LinkedInIcon,
	instagram: InstagramIcon,
	youtube: YoutubeIcon,
} as const;

const Footer = () => {
	return (
		<footer className={"pt-8 pb-2 xl:pt-20 xl:pb-8 bg-[#241E19]"}>
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-6 xl:gap-12">
				{/* <div
					className="flex flex-col xl:flex-row xl:flex-wrap xl:gap-43.5 xl:pb-12 gap-6 pb-6 border-b border-[#F4EDE01A]">
					<div className="xl:w-2/5">
						<p className="typo-h3 text-[#F4EDE0]">
							Field notes from our schools. Once a month. No fundraising.
						</p>
					</div>
					<NewsletterForm/>
				</div> */}
				<div className="flex flex-col xl:flex-row xl:flex-wrap xl:justify-between xl:gap-46 gap-12">
					<div className="flex xl:w-1/4 flex-col gap-6">
						<div className="">
							<Image
								src={"/assets/logos/logo-light.avif"}
								alt={"Yuva Unstoppable"}
								width={125}
								height={65}
								loading="lazy"
								className={"w-31.25 h-16.25 object-contain"}
							/>
						</div>
						<div className="">
							<p className="typo-h4 text-[#F4EDE0BF] w-85/100">
								Unstoppable seva that empowers resilient communities towards
								Viksit Bharat.
							</p>
						</div>
						<div className="flex flex-wrap flex-row gap-3.5">
							{FOOTER_SOCIAL_LINKS.map((social) => {
								const Icon = SOCIAL_ICONS[social.platform];
								return (
									<a
										key={social.platform}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										className="size-9 border border-[#F4EDE040] flex items-center justify-center rounded-full transition-colors duration-300 hover:cursor-pointer hover:bg-secondary-sand text-[#F4EDE0B2] hover:text-secondary-brown"
									>
										<Icon />
									</a>
								);
							})}
						</div>
					</div>
					<div className="flex flex-col md:flex-row md:flex-wrap xl:gap-12 md:flex-1 gap-10">
						<div className="flex flex-col gap-2 xl:gap-8 flex-1">
							<p className="typo-body2 font-black! uppercase text-primary-red">
								PROGRAMMES
							</p>
							<div className="flex flex-col xl:gap-3">
								{FOOTER_PROGRAMMES_SECTION_LINKS.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="typo-body5 capitalize text-[#F4EDE0D9] underline-hover-effect w-fit"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 xl:gap-8 flex-1">
							<p className="typo-body2 font-black! uppercase text-primary-red">
								GET INVOLVED
							</p>
							<div className="flex flex-col xl:gap-3">
								{FOOTER_GET_INVOLVED_LINKS.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="typo-body5 capitalize text-[#F4EDE0D9] underline-hover-effect w-fit"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 xl:gap-8 flex-1">
							<p className="typo-body2 font-black! uppercase text-primary-red">
								THE ORGANISATION
							</p>
							<div className="flex flex-col xl:gap-3">
								{FOOTER_ORGANISATION_LINKS.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="typo-body5 capitalize text-[#F4EDE0D9] underline-hover-effect w-fit"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-[#F4EDE01A] w-full h-px xl:mt-12"/>
				<div className="flex flex-col xl:flex-row xl:flex-wrap xl:gap-0 justify-between gap-6">
					<p className={"typo-body2 xl:shink-0 text-[#F4EDE08C]"}>
						&copy; 2026 Yuva Unstoppable{" "}
						<span>
              <Link href={APP_ROUTES.TERMS}>Terms</Link>
            </span>{" "}
						<span>
              <Link href={APP_ROUTES.PRIVACY}>Privacy</Link>
            </span>{" "}
						Grievance Redressal
					</p>
					<p className={"typo-body2 xl:shink-0 text-[#F4EDE08C] uppercase"}>
						INDIA & US REGISTERED · 12A · 80G · FCRA · CSR-1 REGISTERED
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
