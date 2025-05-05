type Props = {
  tabs: any[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TopTab: React.FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <ul className="ul-links">
      {tabs.map((tab) => (
        <button
          className={tab === activeTab ? "selected" : ""}
          key={tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </ul>
  );
};

export default TopTab;
