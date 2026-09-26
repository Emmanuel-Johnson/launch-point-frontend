import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  date_joined: string;
  is_active: boolean;
}
const students: Student[] = [
  {
    id: 86,
    full_name: "Emmanuel Johnson",
    email: "emmanuelj.swe@gmail.com",
    profile_image: null,
    date_joined: "2026-09-26T19:35:11.566680+05:30",
    is_active: true,
  },
  {
    id: 85,
    full_name: "Cristiano Ronaldossd cc",
    email: "emmanuel.johnson.pro@gmail.com",
    profile_image: null,
    date_joined: "2026-09-26T17:45:18.920094+05:30",
    is_active: true,
  },
  {
    id: 84,
    full_name: "Arjun Menon",
    email: "arjun.menon@gmail.com",
    profile_image: null,
    date_joined: "2026-09-25T16:20:11.120000+05:30",
    is_active: true,
  },
  {
    id: 83,
    full_name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    profile_image: null,
    date_joined: "2026-09-25T14:10:32.450000+05:30",
    is_active: false,
  },
  {
    id: 82,
    full_name: "Ananya Krishnan",
    email: "ananya.krishnan@gmail.com",
    profile_image: null,
    date_joined: "2026-09-24T11:45:22.780000+05:30",
    is_active: true,
  },
  {
    id: 81,
    full_name: "Vishnu Prasad",
    email: "vishnu.prasad@gmail.com",
    profile_image: null,
    date_joined: "2026-09-24T09:30:15.230000+05:30",
    is_active: true,
  },
  {
    id: 80,
    full_name: "Sneha Nair",
    email: "sneha.nair@gmail.com",
    profile_image: null,
    date_joined: "2026-09-23T18:25:44.610000+05:30",
    is_active: false,
  },
  {
    id: 79,
    full_name: "Aditya Raj",
    email: "aditya.raj@gmail.com",
    profile_image: null,
    date_joined: "2026-09-23T15:12:36.340000+05:30",
    is_active: true,
  },
  {
    id: 78,
    full_name: "Meera Thomas",
    email: "meera.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-22T13:40:18.550000+05:30",
    is_active: true,
  },
  {
    id: 77,
    full_name: "Nikhil Kumar",
    email: "nikhil.kumar@gmail.com",
    profile_image: null,
    date_joined: "2026-09-22T10:15:29.920000+05:30",
    is_active: false,
  },
  {
    id: 76,
    full_name: "Diya Joseph",
    email: "diya.joseph@gmail.com",
    profile_image: null,
    date_joined: "2026-09-21T17:35:12.180000+05:30",
    is_active: true,
  },
  {
    id: 75,
    full_name: "Karthik Suresh",
    email: "karthik.suresh@gmail.com",
    profile_image: null,
    date_joined: "2026-09-21T12:20:45.670000+05:30",
    is_active: true,
  },
  {
    id: 74,
    full_name: "Aishwarya Rajan",
    email: "aishwarya.rajan@gmail.com",
    profile_image: null,
    date_joined: "2026-09-20T16:50:33.410000+05:30",
    is_active: false,
  },
  {
    id: 73,
    full_name: "Mohammed Faisal",
    email: "mohammed.faisal@gmail.com",
    profile_image: null,
    date_joined: "2026-09-20T09:25:17.890000+05:30",
    is_active: true,
  },
  {
    id: 72,
    full_name: "Priya Nambiar",
    email: "priya.nambiar@gmail.com",
    profile_image: null,
    date_joined: "2026-09-19T14:35:26.540000+05:30",
    is_active: true,
  },
  {
    id: 71,
    full_name: "Rohan Mathew",
    email: "rohan.mathew@gmail.com",
    profile_image: null,
    date_joined: "2026-09-19T11:10:48.320000+05:30",
    is_active: false,
  },
  {
    id: 70,
    full_name: "Lakshmi Devi",
    email: "lakshmi.devi@gmail.com",
    profile_image: null,
    date_joined: "2026-09-18T18:45:19.760000+05:30",
    is_active: true,
  },
  {
    id: 69,
    full_name: "Joel George",
    email: "joel.george@gmail.com",
    profile_image: null,
    date_joined: "2026-09-18T15:30:27.150000+05:30",
    is_active: true,
  },
  {
    id: 68,
    full_name: "Sanjay Krish",
    email: "sanjay.krish@gmail.com",
    profile_image: null,
    date_joined: "2026-09-17T13:20:36.480000+05:30",
    is_active: false,
  },
  {
    id: 67,
    full_name: "Neha Varma",
    email: "neha.varma@gmail.com",
    profile_image: null,
    date_joined: "2026-09-17T10:05:14.620000+05:30",
    is_active: true,
  },
  {
    id: 66,
    full_name: "Abhinav Das",
    email: "abhinav.das@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T16:40:51.270000+05:30",
    is_active: true,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
  {
    id: 65,
    full_name: "Sara Thomas",
    email: "sara.thomas@gmail.com",
    profile_image: null,
    date_joined: "2026-09-16T12:15:38.910000+05:30",
    is_active: false,
  },
];

const STUDENTS_PER_PAGE = 10;

const StudentListPage = () => {
  const [studentList, setStudentList] = useState(students);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsListRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return studentList;
    }

    return studentList.filter(
      (student) =>
        student.full_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query),
    );
  }, [searchQuery, studentList]);

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
    const endIndex = startIndex + STUDENTS_PER_PAGE;

    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  // Reserve the height of a full page so the layout below (pagination,
  // page edges) never shifts when the last page has fewer rows. Only kicks
  // in while pagination is active, so single-page searches stay natural.
  const placeholderCount =
    totalPages > 1
      ? Math.max(STUDENTS_PER_PAGE - paginatedStudents.length, 0)
      : 0;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const truncateText = (text: string, maxLength = 35) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength - 3)}...`;
  };

  const handleToggleStatus = (studentId: number) => {
    setStudentList((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              is_active: !student.is_active,
            }
          : student,
      ),
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const scrollToStudentsList = () => {
    studentsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.max(page - 1, 1);

      if (nextPage !== page) {
        setTimeout(scrollToStudentsList, 0);
      }

      return nextPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.min(page + 1, totalPages);

      if (nextPage !== page) {
        setTimeout(scrollToStudentsList, 0);
      }

      return nextPage;
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    setTimeout(scrollToStudentsList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  };

  const startItem =
    filteredStudents.length === 0
      ? 0
      : (currentPage - 1) * STUDENTS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * STUDENTS_PER_PAGE,
    filteredStudents.length,
  );

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* Header */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] p-7 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.06] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
            />

            <div className="relative cursor-default">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#34D399]/25">
                  <Users className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Students
                  </h1>

                  <p className="mt-1 text-sm text-white/50">
                    Manage and view all registered students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Total Students */}
          <div className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Total Students
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {studentList.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <Users className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Active Students */}
          <div className="group relative cursor-default overflow-hidden rounded-2xl border border-[#34D399]/25 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-[#34D399]/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#34D399]/[0.08] blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Active Students
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-[#34D399]">
                  {studentList.filter((student) => student.is_active).length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <UserCheck className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Showing */}
          <div className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Showing
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {filteredStudents.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                <Search className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Student Table */}
        <section
          ref={studentsListRef}
          className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
        >
          {" "}
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div className="cursor-default">
              <h2 className="text-lg font-semibold tracking-tight">
                All Students
              </h2>

              <p className="mt-1 text-xs text-white/45">
                View and manage registered student accounts.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-white/35"
                strokeWidth={1.8}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search students..."
                className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
              />
            </div>
          </div>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            {/* table-fixed + explicit column widths keep every column in the
                exact same position across pages, regardless of cell content. */}
            <table className="w-full table-fixed">
              <thead className="cursor-default">
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                  <th className="w-[26%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Student
                  </th>

                  <th className="w-[30%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Email
                  </th>

                  <th className="w-[16%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Joined
                  </th>

                  <th className="w-[14%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Status
                  </th>

                  {/* "Action" label aligned to the start (left edge) of the
                      action button that sits below it. */}
                  <th className="w-[14%] px-6 py-4">
                    <div className="flex justify-end">
                      <span className="w-28 text-left text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Action
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.map((student, index) => (
                  <tr
                    key={`${student.id}-${index}`}
                    onClick={() => navigate(`/admin/students/${student.id}`)}
                    className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.id === 85 ? (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-bold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                            CR
                          </div>
                        ) : student.profile_image ? (
                          <img
                            src={student.profile_image}
                            alt={student.full_name}
                            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                          />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-semibold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                            {getInitials(student.full_name)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-medium text-white"
                            title={student.full_name}
                          >
                            {truncateText(student.full_name)}
                          </p>

                          <p className="mt-0.5 text-xs tabular-nums text-white/35">
                            ID #{student.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Mail className="h-4 w-4 shrink-0 text-white/30" />

                        <span className="truncate" title={student.email}>
                          {truncateText(student.email)}
                        </span>
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                        <CalendarDays className="h-4 w-4 shrink-0 text-white/30" />

                        <span className="truncate">
                          {formatDate(student.date_joined)}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex h-7 w-20 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
                          student.is_active
                            ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                            : "bg-red-400/10 text-red-400 ring-red-400/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            student.is_active ? "bg-[#34D399]" : "bg-red-400"
                          }`}
                        />

                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleToggleStatus(student.id);
                        }}
                        className={`inline-flex h-9 w-28 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-700 ease-out hover:scale-[1.03] ${
                          student.is_active
                            ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                            : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                        }`}
                      >
                        {student.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Height-reserving placeholder rows keep the page structure
                    fixed when the last page is partially filled. */}
                {Array.from({ length: placeholderCount }).map((_, index) => (
                  <tr
                    key={`placeholder-${index}`}
                    aria-hidden="true"
                    className="border-b border-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <div className="h-11" />
                    </td>
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="divide-y divide-white/[0.06] md:hidden">
            {paginatedStudents.map((student, index) => (
              <div
                key={`${student.id}-${index}`}
                className="p-5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-start gap-3">
                  {student.id === 85 ? (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-bold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      CR
                    </div>
                  ) : student.profile_image ? (
                    <img
                      src={student.profile_image}
                      alt={student.full_name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-semibold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      {getInitials(student.full_name)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className="max-w-[200px] truncate text-sm font-medium text-white"
                          title={student.full_name}
                        >
                          {truncateText(student.full_name)}
                        </p>

                        <p
                          className="max-w-[220px] truncate text-xs text-white/40"
                          title={student.email}
                        >
                          {truncateText(student.email)}
                        </p>
                      </div>

                      {/* Mobile Status */}
                      <span
                        className={`inline-flex h-7 w-20 shrink-0 items-center justify-center gap-1.5 rounded-full text-[10px] font-medium ring-1 ring-inset ${
                          student.is_active
                            ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                            : "bg-red-400/10 text-red-400 ring-red-400/20"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            student.is_active ? "bg-[#34D399]" : "bg-red-400"
                          }`}
                        />

                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs tabular-nums text-white/35">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Joined {formatDate(student.date_joined)}
                      </span>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleToggleStatus(student.id);
                        }}
                        className={`inline-flex h-9 w-28 items-center justify-center rounded-lg text-xs font-medium transition-all ${
                          student.is_active
                            ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                            : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                        }`}
                      >
                        {student.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Height-reserving placeholder cards mirror a real card's layout
                so the mobile list keeps a constant height across pages. */}
            {Array.from({ length: placeholderCount }).map((_, index) => (
              <div
                key={`placeholder-mobile-${index}`}
                aria-hidden="true"
                className="p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-full" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="h-4" />
                        <div className="mt-0.5 h-4" />
                      </div>
                      <div className="h-7 w-20 shrink-0" />
                    </div>

                    <div className="mt-4 h-9" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {filteredStudents.length > 0 && totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between cursor-default">
              {/* Showing range */}
              <p className="text-xs text-white/40">
                Showing{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {startItem}
                </span>{" "}
                to{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {filteredStudents.length}
                </span>{" "}
                students
              </p>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                      currentPage === page
                        ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-medium text-white">
                No students found
              </h3>

              <p className="mt-1 text-xs text-white/40">
                Try searching with a different name or email.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentListPage;
