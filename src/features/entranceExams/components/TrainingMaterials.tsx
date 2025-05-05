import { useNavigate } from "react-router-dom";
import useGetStatus from "../services/useGetStatus";

const TrainingMaterials = () => {
  const { testType, status, trainingResources } = useGetStatus();
  const navigate = useNavigate();
  
  const currentSection = status?.current_section || 0;
  const sectionsArray = Array.from({ length: status?.section_count || 0 });

  const hasResources = (sectionNo: number) =>
    trainingResources.some((item) => item.week === sectionNo);

  const sectionOnClick = (sectionNumber: number) => {
    if (!hasResources(sectionNumber)) return;

    const sectionResources = trainingResources.filter(
      (item) => item.week === sectionNumber && item.phase === "1"
    );

    navigate(`/${testType}/section-resource`, {
      state: {
        sectionNumber,
        sectionResources,
        hideMarkCompleteButton:
          status?.current_phase !== 1 || currentSection !== sectionNumber,
      },
    });
  };

  return (
    <div className="col gap-3">
      <p>
        This phase focuses on self-paced learning. Explore and engage with the
        provided training materials
      </p>
      <p>Sections are unclocked when you have completed previous sections</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 overflow-clip p-2">
        {sectionsArray.map((_item, index) => (
          <div
            key={index}
            onClick={() => sectionOnClick(index + 1)}
            className={`drop-shadow-md shadow-lg rounded-md bg-paper col justify-center h-[10vh] alert
                ${
                  hasResources(index + 1)
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed opacity-60"
                }
               `}
          >
            <p className="font-bold">Section {index + 1}</p>
            <p className="text-primary-light underline">View</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TrainingMaterials;
