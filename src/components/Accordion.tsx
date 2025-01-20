import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  title: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, title }) => {
  return (
    <>
      <h3 className="py-4 opacity-70">
        Please read the instructions below for you to successfully navigate
        through this module
      </h3>
      <div className="mx-2">
        <MuiAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {title}
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-decimal col p-4 gap-3 opacity-70">
              {children}
            </ul>
          </AccordionDetails>
        </MuiAccordion>
      </div>
    </>
  );
};

export default Accordion;
