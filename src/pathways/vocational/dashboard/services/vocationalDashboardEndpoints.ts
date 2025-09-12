export type DocStatus = "missing" | "pending" | "approved";
export type ProgressNum = number;

export type VocationalSnapshot = {
  advisory: { stageLabel: string; progress: ProgressNum };
  programSelection: { stageLabel: string; progress: ProgressNum };
  bankStatement: { stageLabel: string; progress: ProgressNum }; // the only "funding" control
  visa: { visible: boolean; stageLabel: string; progress: ProgressNum };
  travel: { visible: boolean; stageLabel: string; progress: ProgressNum };
  nextAction?: { label: string; cta: string; link: string; helper?: string };
  requiredDocs: Array<{ name: string; status: DocStatus; link?: string }>;
  resources: Array<{ title: string; type: "video" | "pdf" | "link"; to: string }>;
};

export async function getVocationalSnapshot(): Promise<VocationalSnapshot> {
  // Example snapshot:
  // Advisory completed → Program selected → Bank Statement pending → Visa locked (until approved)
  return Promise.resolve({
    advisory: { stageLabel: "Advisory Complete", progress: 100 },
    programSelection: { stageLabel: "Program Selected", progress: 80 },
    bankStatement: { stageLabel: "Awaiting Approval", progress: 40 },

    visa: {
      visible: false, // becomes true when bankStatement.stageLabel === "Approved"
      stageLabel: "Locked (Bank Statement Pending)",
      progress: 0,
    },
    travel: {
      visible: false,
      stageLabel: "Locked (Visa Pending)",
      progress: 0,
    },

    nextAction: {
      label: "Upload your bank statement for verification",
      cta: "Upload & Submit",
      link: "/pathways/vocational/bank-statement-upload-approval",
      helper: "Visa unlocks automatically once your bank statement is approved.",
    },

    requiredDocs: [
      { name: "Passport Copy", status: "approved" },
      { name: "High School Certificate", status: "approved" },
      { name: "Bank Statement (Recent 6 months)", status: "pending", link: "/pathways/vocational/bank-statement-upload-approval" },
      { name: "Photo (US Visa Spec)", status: "missing", link: "/pathways/visa/document-upload" },
    ],

    resources: [
      { title: "Vocational Advisory – What to Expect (Video)", type: "video", to: "/resources/vocational-advisory" },
      { title: "Bank Statement Requirements (PDF)", type: "pdf", to: "/resources/bank-statement-guide" },
      { title: "Visa Booking Links (by Country)", type: "link", to: "/resources/visa-booking" },
    ],
  });
}
