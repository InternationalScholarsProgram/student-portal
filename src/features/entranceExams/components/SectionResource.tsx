import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gmatResources } from "../features/gmat/components/utils";
import ViewResource from "./ViewResource";
import useExamsStore from "../services/useExamsStore";
import { Resources } from "../types/examTypes";

function SectionResource() {
  const { state } = useLocation();
  const [show, setShow] = useState("");
  const [tabs, setTabs] = useState<string[]>([]);
  const [resource, setResource] = useState({});
  const [resources, setResources] = useState<Resources[]>([]);
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const { sections } = useExamsStore();

  useEffect(() => {
    const _resources = sections.filter((item) => item.week === state);
    const categories = _resources.map((item) => item.category);
    const uniqueCategories = [...new Set(categories)];
    setTabs(uniqueCategories);
    setShow(uniqueCategories[0]);
    setResources(_resources);
  }, [sections]);

  return (
    <div className="w-full">
      <header>
        <h3 className="py-4 p-2 opacity-70">
          {state?.name} Training Resources
        </h3>
      </header>
      {tabs.length > 1 && (
        <ul className="ul-links">
          {tabs.map((tab) => (
            <button
              className={tab === show ? "selected" : ""}
              key={tab}
              onClick={() => setShow(tab)}
            >
              {tab}
            </button>
          ))}
        </ul>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2 ">
        {resources
          ?.filter((item) => item.category === show)
          .map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setResource(item);
                toggleModal();
              }}
              className="drop-shadow-md shadow-lg rounded-md bg-paper col p-3 overflow-clip hover:scale-105 cursor-pointer"
            >
              <p className="font-bold">{item.title}</p>
              <p className="text-sm">{item.description}</p>
              <p className="text-sm">Category : {item.category}</p>
            </div>
          ))}
      </div>
      <ViewResource open={open} toggleModal={toggleModal} resource={resource} />
    </div>
  );
}

export default SectionResource;
