import React, {useState} from 'react';
import type {CareersOpenRolesSectionType} from "@/types/careers/careers.types";
import DepartmentFilters from "@/components/careers/openRolesSection/DepartmentFilters";
import Role from "@/components/careers/openRolesSection/Role";

function RolesContainer({departments, roles}: { departments: string[], roles: CareersOpenRolesSectionType['roles'] }) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All Departments");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredRoles = selectedDepartment === "All Departments"
    ? roles
    : roles.filter(role => role.department.toLowerCase() === selectedDepartment.toLowerCase());

  const handleSelectDepartment = (dept: string) => {
    setSelectedDepartment(dept);
    setExpandedIndex(0);
  };

  return (
    <div className="flex flex-col gap-8 w-full xl:w-888/1000 mx-auto">
      <DepartmentFilters
        departments={departments}
        setSelectedDepartment={handleSelectDepartment}
        selectedDepartment={selectedDepartment}
      />

      {/* Roles List */}
      <div className="flex flex-col border-t border-[#1A18152E]">
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <Role key={idx} isOpen={isOpen} role={role} idx={idx} toggleExpand={toggleExpand}/>
            );
          })
        ) : (
          <div className="text-center py-12 border border-[#1A18151A] bg-[#F7F5F2] rounded-xl text-[#6B6761] mt-4">
            No current openings for this department. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
}

export default RolesContainer;