import { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

import useGetStatus from "../services/useGetStatus";
import MarkCompleteMockModal from "./MarkCompleteMockModal";
import { Resources } from "../types/examTypes";
import Arrow from "../../../assets/Arrow";

type Props = Resources & {
  enrollment_id: number | undefined;
};

function MockTests() {
  const { mockResources, invalidateStatus, status } = useGetStatus();
  const [mock, setMock] = useState<Props>();
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  // const [sections, setSections] = useState<any[]>();
  // const [activeTab, setActiveTab] = useState("");

  // const getSections = () => {
  //   const categories = mockResources.map((item) => item.week);
  //   const uniqueCategories = [...new Set(categories)];
  //   const _sections = uniqueCategories.map((item) => `Section ${item}`);

  //   setActiveTab(_sections[0]);
  //   setSections(_sections);
  // };

  // useEffect(() => {
  //   getSections();
  // }, []);

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
        {mockResources?.map((item) => (
          <div
            key={item.id}
            className="resource"
            onClick={() => {
              toggleModal();
              setMock({ ...item, enrollment_id: status?.enrollment_id });
            }}
          >
            <div className="col py-2 text-primary-main">
              <LaunchIcon />
            </div>
            <b>{item.title}</b>
            <p className="text-sm px-1">{item.description}</p>
            <div className="arrow">
              <Arrow />
            </div>
          </div>
        ))}
      </section>
      <MarkCompleteMockModal
        open={openModal}
        toggleModal={toggleModal}
        invalidateStatus={invalidateStatus}
        mock={mock}
      />
    </div>
  );
}

export default MockTests;
