
export type CertificateStatus = "earned" | "in-progress";

export interface Certificate {
  id: number;
  title: string;
  instructor: string;
  category: string;
  issuedAt: string | null;
  status: CertificateStatus;
  progress: number;
  certificateNumber?: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Python Programming Fundamentals",
    instructor: "Alex Morgan",
    category: "Programming",
    issuedAt: "2026-09-18",
    status: "earned",
    progress: 100,
    certificateNumber: "LP-PY-2026-001",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    instructor: "Sarah Williams",
    category: "Web Development",
    issuedAt: "2026-10-05",
    status: "earned",
    progress: 100,
    certificateNumber: "LP-FS-2026-002",
  },
  {
    id: 3,
    title: "Advanced React Development",
    instructor: "David Miller",
    category: "Frontend",
    issuedAt: null,
    status: "in-progress",
    progress: 68,
  },
  {
    id: 4,
    title: "Database Design with PostgreSQL",
    instructor: "Emma Wilson",
    category: "Database",
    issuedAt: null,
    status: "in-progress",
    progress: 42,
  },
];
