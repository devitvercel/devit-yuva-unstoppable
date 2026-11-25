import {markFallback} from "@/lib/utils";
import type {NumbersSectionType} from "@/types/programme/programme.types";
import {
  BankIcon,
  BookIcon,
  FarmingIcon,
  LoanIcon,
  StemIcon,
  TrophyIcon,
} from "../../../../public/SVGs/svg";

export const numbersDataFallback: NumbersSectionType = {
  heading: markFallback("Numbers"),
  title: markFallback("Our Impact in Numbers"),
  body: markFallback(
    "We are proud to support thousands of students as they navigate the rigorous journey toward professional excellence."
  ),
  numbers: [
    {
      icon: BookIcon,
      title: markFallback("78%"),
      body: markFallback("STUDENTS ARE FIRST GENERATION LEARNER"),
    },
    {
      icon: FarmingIcon,
      title: markFallback("57%"),
      body: markFallback("STUDENTS ARE FROM FARMING & LABOUR HOUSEHOLDS"),
    },
    {
      icon: LoanIcon,
      title: markFallback("54%"),
      body: markFallback(
        "STUDENTS REPORTED BEING AT RISK OF TAKING EDUCATION LOANS TO CONTINUE THEIR STUDIES"
      ),
    },
    {
      icon: StemIcon,
      title: markFallback("80%"),
      body: markFallback(
        "STUDENTS REPORTED ASPIRING FOR STEM COURSES (MEDICAL ENGINEERING, ETC)"
      ),
    },
    {
      icon: BankIcon,
      title: markFallback("97%"),
      body: markFallback(
        "STUDENTS REPORTED OPENING BANK ACCOUNT AND STARTED SAVINGS LEADING TO IMPROVED STANDARD OF LIVING"
      ),
    },
    {
      icon: TrophyIcon,
      title: markFallback("50%"),
      body: markFallback(
        "STUDENTS REPORTED SCORING ABOVE 80% MARKS SHOWCASING STRONG ACADEMIC PERFORMANCE"
      ),
    },
  ],
};
