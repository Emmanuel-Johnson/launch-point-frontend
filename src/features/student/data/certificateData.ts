/* ──────────────────────────────────────────────────────────────────
   SHARED CERTIFICATE DATA (UI-only mock)
   Lives at: features/student/data/certificateData.ts
   Imported by CertificatePage (the list) and CertificateDetailsPage
   (the single view) so both read the same records and the list can
   deep-link into the detail page by id.

   Wire this to the student's real certificates from the API later —
   keep the exported `Certificate` type and `certificates` name so
   neither page needs to change.
   ────────────────────────────────────────────────────────────────── */

export type CertificateStatus = "earned" | "in-progress";

export type CertificateGrade = "Distinction" | "Merit" | "Pass";

export type Certificate = {
  id: number;
  courseId: number;
  status: CertificateStatus;
  /** "YYYY-MM-DD" once earned, null while still in progress. */
  issuedAt: string | null;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  plan: "Free" | "Premium";
  duration: string;
  lessons: number;
  /** Course completion percentage (100 when earned). */
  progress: number;
  /** Final score % — null until the course is completed. */
  score: number | null;
  grade: CertificateGrade | null;
  /** Unique credential ID — null until the certificate is issued. */
  credentialId: string | null;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  image: string;
  skills: string[];
};

export const certificates: Certificate[] = [
  {
    id: 1,
    courseId: 4,
    status: "earned",
    issuedAt: "2026-10-21",
    title: "Data Analytics with SQL",
    category: "Data Science",
    level: "Intermediate",
    plan: "Premium",
    duration: "21 hours",
    lessons: 36,
    progress: 100,
    score: 96,
    grade: "Distinction",
    credentialId: "LP-DA-2026-00482",
    instructor: "Priya Sharma",
    instructorRole: "Data Analyst",
    instructorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=520&fit=crop",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 2,
    courseId: 3,
    status: "earned",
    issuedAt: "2026-09-08",
    title: "Python Programming",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "24 hours",
    lessons: 40,
    progress: 100,
    score: 88,
    grade: "Merit",
    credentialId: "LP-PY-2026-00310",
    instructor: "James Wilson",
    instructorRole: "Software Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 3,
    courseId: 6,
    status: "earned",
    issuedAt: "2026-06-30",
    title: "Product & Business Strategy",
    category: "Business",
    level: "Beginner",
    plan: "Premium",
    duration: "14 hours",
    lessons: 24,
    progress: 100,
    score: 82,
    grade: "Pass",
    credentialId: "LP-BS-2026-00127",
    instructor: "Olivia Bennett",
    instructorRole: "Product Strategist",
    instructorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=520&fit=crop",
    skills: ["Strategy", "Research", "Planning"],
  },
  {
    // In-progress example — not shown on the list, but reachable at
    // /student/certificates/4 so the detail page's locked state renders.
    id: 4,
    courseId: 1,
    status: "in-progress",
    issuedAt: null,
    title: "Full Stack Web Development",
    category: "Development",
    level: "Intermediate",
    plan: "Premium",
    duration: "32 hours",
    lessons: 48,
    progress: 65,
    score: null,
    grade: null,
    credentialId: null,
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop",
    skills: ["React", "Django", "PostgreSQL"],
  },
];

/* Shared helpers so both pages format grades and dates identically. */

export const GRADE_META: Record<
  CertificateGrade,
  { wrap: string; tint: string; icon: "Trophy" | "Medal" | "BadgeCheck" }
> = {
  Distinction: {
    wrap: "border-amber-300/35 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95",
    tint: "text-amber-200",
    icon: "Trophy",
  },
  Merit: {
    wrap: "border-violet-400/30 bg-violet-500/[0.12]",
    tint: "text-violet-200",
    icon: "Medal",
  },
  Pass: {
    wrap: "border-emerald-400/30 bg-[#06251D]/90",
    tint: "text-emerald-300",
    icon: "BadgeCheck",
  },
};

/** "2026-10-21" -> "21 Oct 2026". Returns "Not issued" for null. */
export const formatIssueDate = (value: string | null) => {
  if (!value) return "Not issued";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
