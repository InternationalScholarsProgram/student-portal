type TestTypes = "Duolingo" | "GRE" | "GMAT";

type ExamStatus = {
  message: string;
  status: number;
  section_count: {
    phase: number;
    sections: number;
  }[];
  current_section: number;
  current_phase: number;
  admin_comment: string | null;
  resources: {
    phase_1: Resources[];
    phase_2: Resources[];
  };
  enrollment_id: number;
  mock_results: MockResults[];
  deadline: string;
  extra_time_request: {
    admin_comment: string;
    id: number;
    reason: string;
    requested_days: number;
    status: number;
  };
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
type MockResults = {
  comment: string | null;
  date_approved: string | null;
  marks: number;
  mock: number;
  proof: string;
  status: number;
};

export type { TestTypes, ExamStatus, Resources, MockResults };
