import { Link } from "react-router-dom";
import { gmatResources } from "./utils";

function FirstPhase() {
  return (
    <div className="col gap-3">
      <p>
        This phase focuses on self-paced learning. Explore and engage with the
        provided training materials
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2">
        {gmatResources.map((item) => (
          <Link
            to={item.url}
            state={item}
            key={item.name}
            className="drop-shadow-md shadow-lg rounded-md bg-paper col p-3 overflow-clip hover:scale-105"
          >
            <p className="font-bold">{item.name}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-primary-light underline">
              View
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FirstPhase;
