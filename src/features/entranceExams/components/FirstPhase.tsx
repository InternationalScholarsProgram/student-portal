import { Link, useNavigate } from "react-router-dom";
import useExamsStore from "../services/useExamsStore";

const FirstPhase = () => {
  const { sectionCount, sections } = useExamsStore();
  const navigate = useNavigate();
  const hasResources = (state: number) =>
    sections.some((item) => item.week === state);

  const handleClick = (state: number) => {
    if (!hasResources(state)) return;

    navigate("/entrance-exams/section-resource", { state });
  };

  return (
    <div className="col gap-3">
      <p>
        This phase focuses on self-paced learning. Explore and engage with the
        provided training materials
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2">
        {Array.from({ length: sectionCount }).map((item, index) => {
          console.log(item, index);
          return (
            <div
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`drop-shadow-md shadow-lg rounded-md bg-paper col p-3 overflow-clip hover:scale-105 
                ${
                  hasResources(index + 1)
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }
                `}
            >
              <p className="font-bold">Section {index + 1}</p>
              {/* <p className="text-sm">{item.description}</p> */}
              <p className="text-primary-light underline">View</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FirstPhase;
