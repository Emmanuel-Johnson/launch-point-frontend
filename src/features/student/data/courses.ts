export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseAccess = "Free" | "Premium";

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: CourseLevel;
  access: CourseAccess;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  thumbnail: string;
  skills: string[];
  featured?: boolean;
  instructorRole?: string;
  longDescription?: string;
  requirements?: string[];
  learningOutcomes?: string[];
  curriculum?: {
    title: string;
    lessons: string[];
  }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Python Programming Masterclass",
    description:
      "Build a strong foundation in Python, from core syntax to object-oriented programming.",
    longDescription:
      "Learn Python step by step, from the fundamentals to writing reusable programs. Practice core concepts and build confidence solving programming problems.",
    instructor: "Alex Morgan",
    instructorRole: "Python Instructor",
    category: "Programming",
    level: "Beginner",
    access: "Free",
    duration: "8h 30m",
    lessons: 42,
    rating: 4.8,
    students: 1240,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    skills: ["Python", "OOP", "Problem Solving"],
    featured: true,
    requirements: [
      "No prior Python experience is required.",
      "A computer with internet access.",
      "Willingness to practice programming.",
    ],
    learningOutcomes: [
      "Understand Python syntax and data types.",
      "Work with functions and collections.",
      "Apply object-oriented programming concepts.",
      "Solve basic programming problems.",
    ],
    curriculum: [
      {
        title: "Python Fundamentals",
        lessons: [
          "Introduction to Python",
          "Variables and data types",
          "Operators and expressions",
          "Conditional statements",
          "Loops and iteration",
        ],
      },
      {
        title: "Functions and Collections",
        lessons: [
          "Defining functions",
          "Lists and tuples",
          "Dictionaries and sets",
          "Working with strings",
        ],
      },
      {
        title: "Object-Oriented Programming",
        lessons: [
          "Classes and objects",
          "Inheritance",
          "Encapsulation",
          "Building a Python project",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    description:
      "Learn how to build modern web applications with frontend and backend technologies.",
    longDescription:
      "Explore the complete web development workflow, from creating user interfaces to building backend services and connecting applications to databases.",
    instructor: "Sarah Williams",
    instructorRole: "Full Stack Developer",
    category: "Web Development",
    level: "Intermediate",
    access: "Premium",
    duration: "24h 15m",
    lessons: 96,
    rating: 4.9,
    students: 2840,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    skills: ["HTML & CSS", "React", "Backend"],
    featured: true,
    requirements: [
      "Basic computer skills.",
      "Familiarity with basic programming is helpful.",
    ],
    learningOutcomes: [
      "Build responsive web interfaces.",
      "Understand frontend and backend architecture.",
      "Connect a frontend to backend APIs.",
      "Develop and test a full stack application.",
    ],
    curriculum: [
      {
        title: "Frontend Foundations",
        lessons: [
          "HTML fundamentals",
          "CSS layouts and responsive design",
          "JavaScript essentials",
          "Working with browser APIs",
        ],
      },
      {
        title: "Modern Frontend Development",
        lessons: [
          "React components",
          "Props and state",
          "Routing and forms",
          "Calling REST APIs",
        ],
      },
      {
        title: "Backend and Integration",
        lessons: [
          "Backend fundamentals",
          "API design",
          "Database integration",
          "Building a full stack project",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "React and TypeScript",
    description:
      "Create maintainable frontend applications using React, TypeScript, and reusable components.",
    longDescription:
      "Learn how to build type-safe React applications using TypeScript. Work with components, hooks, props, state, and reusable frontend patterns.",
    instructor: "David Miller",
    instructorRole: "Frontend Developer",
    category: "Frontend",
    level: "Intermediate",
    access: "Premium",
    duration: "12h 40m",
    lessons: 58,
    rating: 4.7,
    students: 1860,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    skills: ["React", "TypeScript", "Hooks"],
    requirements: [
      "Basic JavaScript knowledge.",
      "Familiarity with HTML and CSS.",
    ],
    learningOutcomes: [
      "Build reusable React components.",
      "Use TypeScript to define application types.",
      "Manage state and side effects with hooks.",
      "Organize scalable frontend code.",
    ],
    curriculum: [
      {
        title: "React Fundamentals",
        lessons: [
          "Components and JSX",
          "Props and state",
          "Event handling",
          "Rendering lists",
        ],
      },
      {
        title: "TypeScript with React",
        lessons: [
          "TypeScript fundamentals",
          "Typing props",
          "Typing events and hooks",
          "Reusable component types",
        ],
      },
      {
        title: "Application Development",
        lessons: [
          "Forms and validation",
          "API integration",
          "Routing",
          "Building a React application",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "SQL and Database Fundamentals",
    description:
      "Understand relational databases, write SQL queries, and work with structured data.",
    longDescription:
      "Build a solid understanding of relational databases and SQL. Learn to retrieve, filter, join, and organize data using practical query examples.",
    instructor: "Emma Wilson",
    instructorRole: "Database Instructor",
    category: "Database",
    level: "Beginner",
    access: "Free",
    duration: "6h 20m",
    lessons: 35,
    rating: 4.6,
    students: 970,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    skills: ["SQL", "PostgreSQL", "Database Design"],
    requirements: [
      "No previous database experience is required.",
      "Basic computer skills.",
    ],
    learningOutcomes: [
      "Understand tables and relationships.",
      "Write SELECT queries and filters.",
      "Join related tables.",
      "Use SQL to manage structured data.",
    ],
    curriculum: [
      {
        title: "Database Basics",
        lessons: [
          "Introduction to relational databases",
          "Tables and data types",
          "Primary and foreign keys",
        ],
      },
      {
        title: "SQL Queries",
        lessons: [
          "SELECT and WHERE",
          "Sorting and grouping",
          "Aggregate functions",
          "Joining tables",
        ],
      },
      {
        title: "Working with Data",
        lessons: [
          "INSERT, UPDATE, and DELETE",
          "Constraints",
          "Database design fundamentals",
          "Practice queries",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Advanced Django REST Framework",
    description:
      "Design secure REST APIs with serializers, permissions, authentication, and testing.",
    longDescription:
      "Learn how to develop structured REST APIs with Django REST Framework. Explore serializers, authentication, permissions, API design, and testing.",
    instructor: "Michael Chen",
    instructorRole: "Backend Developer",
    category: "Backend",
    level: "Advanced",
    access: "Premium",
    duration: "15h 10m",
    lessons: 64,
    rating: 4.9,
    students: 1520,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    skills: ["Django", "REST API", "Authentication"],
    requirements: [
      "Working knowledge of Python.",
      "Basic understanding of Django.",
      "Familiarity with HTTP and APIs.",
    ],
    learningOutcomes: [
      "Build REST APIs with Django REST Framework.",
      "Create serializers and custom validation.",
      "Configure authentication and permissions.",
      "Write tests for API endpoints.",
    ],
    curriculum: [
      {
        title: "REST API Foundations",
        lessons: [
          "REST principles",
          "Django REST Framework setup",
          "Serializers and validation",
          "Views and routers",
        ],
      },
      {
        title: "Authentication and Permissions",
        lessons: [
          "Authentication strategies",
          "JWT authentication",
          "Custom permissions",
          "Role-based access control",
        ],
      },
      {
        title: "Testing and Best Practices",
        lessons: [
          "API testing",
          "Error handling",
          "Pagination and filtering",
          "Securing API endpoints",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Data Structures and Algorithms",
    description:
      "Improve your problem-solving skills with essential data structures and algorithm patterns.",
    longDescription:
      "Develop your problem-solving skills by learning common data structures, algorithm techniques, and ways to analyze time and space complexity.",
    instructor: "James Anderson",
    instructorRole: "Computer Science Instructor",
    category: "Computer Science",
    level: "Intermediate",
    access: "Free",
    duration: "18h 45m",
    lessons: 82,
    rating: 4.8,
    students: 3210,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    skills: ["DSA", "Algorithms", "Complexity"],
    featured: true,
    requirements: [
      "Basic programming knowledge.",
      "Familiarity with variables, loops, and functions.",
    ],
    learningOutcomes: [
      "Understand common data structures.",
      "Choose appropriate algorithms for problems.",
      "Analyze time and space complexity.",
      "Practice structured problem-solving techniques.",
    ],
    curriculum: [
      {
        title: "Core Data Structures",
        lessons: [
          "Arrays and strings",
          "Linked lists",
          "Stacks and queues",
          "Hash tables",
        ],
      },
      {
        title: "Algorithms",
        lessons: ["Searching", "Sorting", "Recursion", "Binary search"],
      },
      {
        title: "Problem Solving",
        lessons: [
          "Trees and graphs",
          "Time complexity",
          "Space complexity",
          "Practice problems",
        ],
      },
    ],
  },
];
