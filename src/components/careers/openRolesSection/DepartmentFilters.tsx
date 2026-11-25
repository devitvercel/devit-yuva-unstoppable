import React from 'react';
import {Carousel, CarouselContent, CarouselItem} from "@/components/common/carousel";
import {cn} from "@/lib/utils";

function DepartmentFilters({setSelectedDepartment, departments, selectedDepartment}: {
  setSelectedDepartment: (department: string) => void,
  departments: string[],
  selectedDepartment: string
}) {
  return (
    <Carousel options={{align: 'start', containScroll: 'trimSnaps'}} className="w-full">
      <CarouselContent containerClassName="gap-2 mx-[4.2%] xl:mx-0">
        <CarouselItem className="basis-auto shrink-0">
          <button
            onClick={() => {
              setSelectedDepartment("All Departments");
            }}
            className={cn(
              "rounded-[10px] py-2.5 px-5 typo-body3 transition-all duration-200 cursor-pointer font-medium",
              selectedDepartment === "All Departments"
                ? "bg-primary-red text-white"
                : "bg-white border border-[#1A18152E] text-[#6B6761]"
            )}
          >
            All Departments
          </button>
        </CarouselItem>
        {departments.map((department, index) => (
          <CarouselItem key={index} className="basis-auto shrink-0">
            <button
              onClick={() => {
                setSelectedDepartment(department);
              }}
              className={cn(
                "rounded-[10px] py-2.5 px-5 typo-body3 transition-all duration-200 cursor-pointer font-medium",
                selectedDepartment === department
                  ? "bg-primary-red text-white"
                  : "bg-white border border-[#1A18152E] text-[#6B6761]"
              )}
            >
              {department}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default DepartmentFilters;