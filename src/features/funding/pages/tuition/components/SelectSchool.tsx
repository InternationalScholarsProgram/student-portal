import useSchools from "../../../../school-admission/services/useSchools";
import PrimaryBtn from "../../../../../components/buttons/PrimaryBtn";
import RadioBtns from "../../../../../components/inputs/RadioBtns";
import ContentComponent from "../../../../../components/ContentComponent";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";

function SelectSchool() {
  const { appliedSchools } = useSchools(true);
  const { palette } = useTheme();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to select this school?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue!",
      cancelButtonText: "Cancel",
      confirmButtonColor: palette.primary.main,
      customClass: {
        actions: "flex flex-row-reverse justify-center  w-full", // Custom class for action buttons
        // confirmButton: "mr-3",
      },
    });

    if (result.isConfirmed) {
      confirmSchool.mutate();
    } else {
      console.log("Cancelled");
    }
    //
  };
  const confirmSchool = useMutation({
    mutationFn: () => {
      console.log("Confirmed");
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
  return (
    <ContentComponent header="Select school">
      <div className="alert my-3">
        <p>
          Please choose the school you wish to proceed with for funding. Once
          selected, you <strong>cannot apply to another school</strong> while
          your current application is still active. Make sure this is the school
          you are fully committed to.
        </p>
      </div>
      <form onSubmit={onSubmit} className="col gap-2 p-3">
        <RadioBtns
          options={appliedSchools?.map((school) => ({
            label: `${school.school_name} - ${school.program_name}`,
            value: school.school_name,
          }))}
          title="Select the school you want to proceed with for funding"
        />
        <PrimaryBtn className="self-end">
          {confirmSchool.isPending ? "Processing..." : "Proceed"}
        </PrimaryBtn>
      </form>
    </ContentComponent>
  );
}

export default SelectSchool;
