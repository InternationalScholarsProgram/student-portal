import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionProps extends MuiAccordionProps {
  title: string;
  label?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  label,
  title,
  ...props
}) => {
  return (
    <>
      {!label && (
        <h3 className="sm:py-4 opacity-70 text-sm">
          Please read the instructions below for you to successfully navigate
          through this module
        </h3>
      )}
      <div className="sm:mx-2">
        <MuiAccordion {...props}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <p className="">{title}</p>
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
