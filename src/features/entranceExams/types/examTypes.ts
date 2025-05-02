type TestTypes = "Duolingo" | "GRE" | "GMAT";

type ExamStatus = {
    message: string;
    status: number;
    admin_comment: string | null;
  };
  

export type { TestTypes ,ExamStatus};
