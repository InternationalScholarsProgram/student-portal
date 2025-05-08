import { NavLink } from "react-router-dom";

type Props = {
  tabs: any[];
  activeTab?: string | boolean;
  setActiveTab?: (tab: any) => unknown;
  link?: boolean;
};

const TopTab: React.FC<Props> = ({
  tabs = [],
  activeTab,
  setActiveTab,
  link = false,
}) => {
  const onClick = (tab: string) => {
    if (setActiveTab) setActiveTab(tab);
  };
  
  const classes = tabs.length === 1 ? " basis-1/2 " : " flex-1 ";
  return (
    <ul className="ul-links">
      {tabs.map((tab, index) =>
        link ? (
          <NavLink
            key={index}
            to={tab.to}
            className={({ isActive }) =>
              `${isActive ? "selected" : ""} ${classes}`
            }
          >
            {tab.label}
          </NavLink>
        ) : (
          <button
            className={`
                ${
                  (tab?.value || tab) === activeTab ? "selected" : ""
                } ${classes}`}
            key={index}
            onClick={() => onClick(tab)}
          >
            {tab.label || tab}
          </button>
        )
      )}
    </ul>
  );
};

export default TopTab;
