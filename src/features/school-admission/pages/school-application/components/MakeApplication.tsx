import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { formatCurrency } from "../../../../../utils/utils";
import { admissionAPIs } from "../../../services/admissionAPIs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdmissions from "../../../services/useAdmissions";
import SchoolIcon from "@mui/icons-material/School";
import { useLocation } from "react-router";

function MakeApplication({
  notAppliedSchools,
  hasAppliedAllSchools,
  intake_id,
}: any) {
  const { state } = useLocation();
  const { queryKeys } = useAdmissions();
  const queryClient = useQueryClient();
  const [school, setSchool] = useState<any>("");

  useEffect(() => {
    if (state) {
      const find = notAppliedSchools.find(
        (item: any) => item.school_name === state.school_name
      );
      if (!find?.school_name) return;
      setSchool(find?.school_name);
    }
  }, [state]);

  const handleChange = (e: any) => setSchool(e.target.value);

  const findSchool = notAppliedSchools.find(
    (item: any) => item.school_name === school
  );
  const handleSubmit = async () => {
    if (!school || !intake_id) return toast.error("Please select a school");
    submitApplication.mutate();
  };

  const submitApplication = useMutation({
    mutationFn: async () =>
      await admissionAPIs.submitSchoolApplication({
        proposed_course_id: findSchool?.id,
        intake: intake_id,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.statusCheck }),
  });

  return (
    <>
      <h3 className="p-2 opacity-70 font-semibold text-lg row w-full gap-3 border-b-30">
        <SchoolIcon /> School Application
      </h3>
      {notAppliedSchools?.length > 0 ? (
        <section className="col p-4">
          <p>
            All your documents have been approved. You are now ready to submit
            your school application request. Please note, you can only submit an
            application request for each school at a time. Please use the button
            below to submit your school application request.
          </p>
          <div className="col m-3">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="school">Select School And Program</InputLabel>
              <Select
                labelId="school"
                id="demo-simple-select-standard"
                value={school}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>Select School</em>
                </MenuItem>
                {notAppliedSchools?.map((school: any) => (
                  <MenuItem key={school.id} value={school.school_name}>
                    {school.school_name + " - " + school.program_name}
                  </MenuItem>
                ))}
              </Select>
              {findSchool && (
                <p className="mt-4">
                  School Application fee is{" "}
                  {findSchool?.application_cost === "Waived"
                    ? "waived for this school"
                    : formatCurrency(findSchool?.application_cost)}
                </p>
              )}
            </FormControl>
          </div>
          {school && (
            <button onClick={handleSubmit} className="primary-btn self-end">
              {submitApplication.isPending
                ? "Submitting..."
                : "Submit Application"}
            </button>
          )}
        </section>
      ) : hasAppliedAllSchools ? (
        <p className="p-4">
          You have successfully requested application to all proposed schools
        </p>
      ) : (
        <p className="p-4">You have not been approved for any school</p>
      )}
    </>
  );
}
export default MakeApplication;
