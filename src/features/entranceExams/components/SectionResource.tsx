import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import ViewResource from "./ViewResource";
import { Resources } from "../types/examTypes";
import useThemeStore from "../../../styles/theme.store";
import { useMutation } from "@tanstack/react-query";
import examsEndpoints from "../services/examsEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../components/errors/errorMsg";
import useGetStatus from "../services/useGetStatus";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";
import TopTab from "../../../components/TopTab";
import ContentComponent from "../../../components/ContentComponent";

function SectionResource() {
  const { state } = useLocation();
  const sectionNumber = state?.sectionNumber;
  const sectionResources: Resources[] = state?.sectionResources;

  const [activeTab, setActiveTab] = useState("");
  const [tabs, setTabs] = useState<string[]>([]);
  const [resource, setResource] = useState<Resources>();

  const { themeMode } = useThemeStore();
  const navigate = useNavigate();
  const { status, invalidateStatus, testType } = useGetStatus();
  const goBack = () => navigate(`/${testType}`);

  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  useEffect(() => {
    if (!sectionResources.length) return goBack();

    const categories = sectionResources.map((item) => item.category);
    const uniqueCategories = [...new Set(categories)];

    setTabs(uniqueCategories);
    setActiveTab(uniqueCategories[0]);
  }, [sectionNumber]);

  const markComplete = useMutation({
    mutationFn: () =>
      examsEndpoints.markResourceComplete(status?.enrollment_id, sectionNumber),
    onSuccess: () => {
      invalidateStatus();
      goBack();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  return (
    <>
      <h3 className="title-sm text-primary-light pb-2">
        Section {sectionNumber} Training Resources
      </h3>
      <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentComponent header>
        {!state?.hideMarkCompleteButton && (
          <p className="pb-3">
            Mark as completed only when you have finished going through all the
            resources
          </p>
        )}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2 ">
          {sectionResources
            ?.filter((item) => item.category === activeTab)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setResource(item);
                  toggleModal();
                  console.log(item);
                }}
                className="resource bg-paper"
              >
                <div className="col py-2 text-primary-main">
                  {item.type === "video" ? (
                    <OndemandVideoIcon />
                  ) : (
                    <PictureAsPdfIcon />
                  )}
                </div>
                <b>{item.title}</b>
                <p className="text-sm px-1">{item.description}</p>
                <div className="arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="15"
                    width="15"
                  >
                    <path
                      fill={themeMode === "dark" ? "#fff" : "#000"}
                      d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
        </section>
        <footer>
          <FormFooterBtns
            closeText="Go back"
            onClose={goBack}
            onSubmit={markComplete.mutate}
            btnText={markComplete.isPending ? "Loading..." : "Mark Complete"}
            hideBtn={state?.hideMarkCompleteButton}
          />
        </footer>
        <ViewResource
          open={open}
          toggleModal={toggleModal}
          resource={resource}
        />
      </ContentComponent>
    </>
  );
}

export default SectionResource;
