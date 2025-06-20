import { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

import useGetStatus from "../services/useGetStatus";
import MarkCompleteMockModal from "./MarkCompleteMockModal";
import { Resources } from "../types/examTypes";
import Arrow from "../../../assets/Arrow";
import { Tooltip } from "@mui/material";

type Props = Resources & {
  enrollment_id: number | undefined;
};

function MockTests() {
  const { mockResources, invalidateStatus, status } = useGetStatus();
  const [mock, setMock] = useState<Props>();
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  const sectionCount =
    status?.section_count.find((item) => item.phase === 2)?.sections || 0;
  const sectionsArray = Array.from({ length: sectionCount });

  const onClick = (item: any) => {
    toggleModal();
    setMock({ ...item, enrollment_id: status?.enrollment_id });
  };

  if (!mockResources.length)
    return (
      <div className="p-2">
        <p>No mock tests currently available</p>
        <div className="h-2"> </div>
      </div>
    );

  return (
    <div>
      <p>
        This is the test phase. You will be doing the various mocks and
        submitting them for review.
      </p>
      <div className="h-2" />

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2 ">
        {sectionsArray.map((item, index) => (
          <MockItem
            key={index}
            item={mockResources[index]}
            index={index}
            handleClick={onClick}
          />
        ))}
      </section>
      <MarkCompleteMockModal
        open={openModal}
        toggleModal={toggleModal}
        invalidateStatus={invalidateStatus}
        mock={mock}
        mockResults={status?.mock_results.find(
          (item) => item.mock === mock?.id
        )}
      />
    </div>
  );
}

export default MockTests;

const MockItem = ({ item, handleClick, index }: any) => {
  const isDisabled = item?.id ? false : true;
  const classes = isDisabled
    ? "opacity-50 cursor-not-allowed hover:scale-100"
    : " hover:scale-105 cursor-pointer";
  return (
    <Tooltip title={isDisabled && "Complete previous mock in order to proceed"}>
      <div
        key={item?.id}
        className={`${classes} resource bg-paper `}
        onClick={() => {
          if (isDisabled) return;
          handleClick(item);
        }}
      >
        <div className="col py-2 text-primary-main">
          <LaunchIcon />
        </div>
        <div className="flex-1">
          <b>{item?.title || `Mock ${index + 1}`}</b>
          <p className="text-sm px-1">
            {item?.description || "Currently Not available"}
          </p>
        </div>
        <div className="bg-default arrow">
          <Arrow />
        </div>
      </div>
    </Tooltip>
  );
};
