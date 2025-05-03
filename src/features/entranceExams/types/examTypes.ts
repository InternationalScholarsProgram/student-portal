type TestTypes = "Duolingo" | "GRE" | "GMAT";

type ExamStatus = {
  message: string;
  status: number;
  section_count: number;
  admin_comment: string | null;
  resources: Resources[];
};
type Resources = {
  category: string;
  description: string;
  id: number;
  link: string;
  phase: string;
  status: 1;
  test_type: string;
  title: string;
  type: "video" | "pdf";
  week: number;
};

export type { TestTypes, ExamStatus, Resources };
