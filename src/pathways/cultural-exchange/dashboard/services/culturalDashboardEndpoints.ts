import api, { baseDirectory } from "../../../../services/api/base";

/** Toggle via .env(.local)
 *  VITE_USE_CE_MOCKS=1 → use mocks
 *  VITE_USE_CE_MOCKS=0 → call backend
 */
const USE_MOCKS = String(import.meta.env.VITE_USE_CE_MOCKS ?? "") === "1";

export type Stage = { stageLabel: string; progress: number };

export type CulturalSnapshot = {
  hostPlacement: Stage;
  programDocs: Stage;
  visa: Stage;
  travel: Stage;
  nextAction?: { label: string; cta: string; link: string; helper?: string };
  requiredDocs: Array<{ name: string; status: "missing" | "pending" | "approved"; link?: string }>;
  resources: Array<{ type: "video" | "pdf" | "link"; title: string; description?: string; url: string }>;
};

// ---------- Mock data ----------
const mock: CulturalSnapshot = {
  hostPlacement: { stageLabel: "Host Matched", progress: 65 },
  programDocs: { stageLabel: "Docs In Progress", progress: 45 },
  visa: { stageLabel: "Interview Scheduled", progress: 30 },
  travel: { stageLabel: "Planning", progress: 10 },
  nextAction: {
    label: "Upload DS-2019 supporting documents",
    cta: "Upload Now",
    link: "/pathways/cultural-exchange/program-docs",
    helper: "SEVIS fee receipt and passport bio page are required.",
  },
  requiredDocs: [
    { name: "Passport Copy", status: "approved" },
    { name: "DS-2019 Copy", status: "pending", link: "/pathways/cultural-exchange/program-docs" },
    { name: "SEVIS Fee Receipt", status: "pending", link: "/pathways/cultural-exchange/program-docs" },
    { name: "Insurance Proof", status: "missing" },
  ],
  resources: [
    { type: "video", title: "J-1 Overview & Timelines", url: "https://example.com/j1-video" },
    { type: "pdf", title: "DS-160 Walkthrough", url: "https://example.com/ds160.pdf" },
    { type: "link", title: "SEVIS Fee Portal", url: "https://fmjfee.com" },
  ],
};

const url = baseDirectory + "cultural-dashboard/"; // adjust when backend is ready

export async function getCulturalSnapshot(): Promise<CulturalSnapshot> {
  if (USE_MOCKS) {
    // small realistic delay
    await new Promise((r) => setTimeout(r, 300));
    return mock;
  }
  const res = await api.get(`${url}snapshot.php`);
  return (res?.data?.data ?? mock) as CulturalSnapshot;
}
