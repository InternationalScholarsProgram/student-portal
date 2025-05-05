type TestTypes = "Duolingo" | "GRE" | "GMAT";

type ExamStatus = {
  message: string;
  status: number;
  section_count: number;
  current_section: number;
  current_phase: number;
  admin_comment: string | null;
  resources: {
    phase_1: Resources[];
    phase_2: Resources[];
  };
  enrollment_id: number;
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
  type: "video" | "document" | "link";
  week: number;
};

export type { TestTypes, ExamStatus, Resources };
