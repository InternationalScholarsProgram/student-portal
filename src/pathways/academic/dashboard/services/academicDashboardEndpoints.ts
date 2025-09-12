// Minimal types describing the academic dashboard snapshot
export type DocStatus = "missing" | "pending" | "approved";
export type ProgressNum = number;

export type AcademicSnapshot = {
  entranceExam: {
    required: boolean;
    testType: "GMAT" | "GRE" | "Duolingo" | null;
    progress: ProgressNum;
  };
  schoolAdmission: {
    stageLabel: string;
    progress: ProgressNum;
  };
  funding: {
    model: "loan" | "bank" | "none";
    stageLabel: string;
    progress: ProgressNum;
  };
  visa: {
    visible: boolean;
    stageLabel: string;
    progress: ProgressNum;
  };
  travel: {
    visible: boolean;
    stageLabel: string;
    progress: ProgressNum;
  };
  nextAction?: {
    label: string;
    cta: string;
    link: string;
    helper?: string;
  };
  requiredDocs: Array<{
    name: string;
    status: DocStatus;
    link?: string;
  }>;
  resources: Array<{
    title: string;
    type: "video" | "pdf" | "link";
    to: string;
  }>;
};

// NOTE: This is mocked data to illustrate the UX flow.
// Replace with a real API call and keep the shape.
export async function getAcademicSnapshot(): Promise<AcademicSnapshot> {
  // Example student: Graduate (loan flow). Visa visible after Loan Feedback Approved.
  // Travel visible only after Visa Approved.
  // BRD references: visa visibility after loan/bank approval and training/mock stages timelines.
  // :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

  return Promise.resolve({
    entranceExam: {
      required: true,
      testType: "GRE",
      progress: 60, // % done
    },
    schoolAdmission: {
      stageLabel: "Awaiting School Feedback",
      progress: 75,
    },
    funding: {
      model: "loan",
      stageLabel: "Loan Feedback Approved",
      progress: 100,
    },
    visa: {
      visible: true,
      stageLabel: "DS-160/260 Review",
      progress: 35,
    },
    travel: {
      visible: false,
      stageLabel: "Locked (Visa Pending)",
      progress: 0,
    },
    nextAction: {
      label: "Complete DS-160 details and submit for review",
      cta: "Open Visa Module",
      link: "/pathways/visa/ds-review",
      helper: "Once approved, you’ll submit payment and book your appointment.",
    },
    requiredDocs: [
      { name: "Passport Copy", status: "approved" },
      { name: "Undergraduate Transcripts", status: "approved" },
      { name: "GRE Score Report", status: "pending", link: "/pathways/academic/entrance-exams" },
      { name: "Admission Letter", status: "approved" },
      { name: "I-20 Upload", status: "pending", link: "/pathways/visa/document-upload" },
    ],
    resources: [
      { title: "I-20 Request & Timelines (Video)", type: "video", to: "/resources/i20-video" },
      { title: "DS-160 Walkthrough (PDF)", type: "pdf", to: "/resources/ds160-guide" },
      { title: "Visa Booking Links (by Country)", type: "link", to: "/resources/visa-booking" },
    ],
  });
}
