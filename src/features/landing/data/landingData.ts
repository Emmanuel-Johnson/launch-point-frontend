import {
  GraduationCap,
  HelpCircle,
  TrendingUp,
  BadgeCheck,
  Users,
  Library,
  Search,
  UserCheck,
  BookOpen,
  ListChecks,
  Award,
} from "lucide-react";
import type {
  Advantage,
  Course,
  FooterLink,
  NavLink,
  PricingPlan,
  RoadmapStep,
} from "../types/landing";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const courses: Course[] = [
  {
    id: "course-react-nextjs",
    title: "Advanced React & Next.js Architecture",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    level: "Intermediate",
    rating: 4.9,
    instructor: {
      name: "Alex Rivera",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    students: "1.2k",
    duration: "14h 30m",
    priceTag: "Premium",
  },
  {
    id: "course-uiux-design",
    title: "UI/UX Design Mastery: 2024 Edition",
    imageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80",
    level: "Beginner",
    rating: 4.8,
    instructor: {
      name: "Sarah Chen",
      avatarUrl: "https://i.pravatar.cc/80?img=47",
    },
    students: "2.8k",
    duration: "22h 15m",
    priceTag: "Free",
  },
  {
    id: "course-python-ml",
    title: "Python for Machine Learning Specialization",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    level: "Advanced",
    rating: 4.7,
    instructor: {
      name: "Dr. James Wilson",
      avatarUrl: "https://i.pravatar.cc/80?img=33",
    },
    students: "850",
    duration: "45h 00m",
    priceTag: "Free",
  },
];

export const advantages: Advantage[] = [
  {
    id: "advantage-instructors",
    icon: GraduationCap,
    title: "Expert Instructors",
    description:
      "Learn from veteran industry professionals who share real-world insights and best practices.",
  },
  {
    id: "advantage-quizzes",
    icon: HelpCircle,
    title: "Interactive Quizzes",
    description:
      "Validate your knowledge with challenging assessments and hands-on coding exercises.",
  },
  {
    id: "advantage-progress",
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics.",
  },
  {
    id: "advantage-certificates",
    icon: BadgeCheck,
    title: "Verified Certificates",
    description:
      "Earn industry-recognized certificates upon completion to showcase your achievements.",
  },
  {
    id: "advantage-community",
    icon: Users,
    title: "Thriving Community",
    description:
      "Connect with fellow learners, share projects, and collaborate in our exclusive forums.",
  },
  {
    id: "advantage-library",
    icon: Library,
    title: "Premium Content Library",
    description:
      "Unlock our entire catalog of advanced, expert-level courses with your subscription.",
  },
];

export const roadmapSteps: RoadmapStep[] = [
  {
    id: "step-explore",
    icon: Search,
    title: "Explore Courses",
    description: "Discover your passion",
  },
  {
    id: "step-enroll",
    icon: UserCheck,
    title: "Enroll",
    description: "Secure your spot",
  },
  {
    id: "step-learn",
    icon: BookOpen,
    title: "Learn",
    description: "Master the content",
  },
  {
    id: "step-quiz",
    icon: ListChecks,
    title: "Quiz",
    description: "Prove your knowledge",
  },
  {
    id: "step-certificate",
    icon: Award,
    title: "Earn Certificate",
    description: "Get certified",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan-community",
    name: "Community Plan",
    tagline: "Free Courses Only",
    price: "0",
    period: "forever",
    features: [
      "Access to free courses",
      "Learning dashboard",
      "Progress tracking",
    ],
    ctaLabel: "Get Started",
    highlighted: false,
  },
  {
    id: "plan-pro",
    name: "Pro Learner",
    tagline: "Unlock all paid courses",
    price: "4,999",
    period: "month",
    features: [
      "Everything in Free Plan",
      "Unlimited access to all paid courses",
      "New premium courses weekly",
    ],
    ctaLabel: "Go Pro Now",
    highlighted: true,
    badge: "Most Popular",
  },
];

export const footerQuickLinks: FooterLink[] = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Pricing Plans", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "All Sales Final Policy", href: "#policy" },
];

export const footerCategories: FooterLink[] = [
  { label: "Development", href: "#development" },
  { label: "Design", href: "#design" },
  { label: "Marketing", href: "#marketing" },
  { label: "Data Science", href: "#data-science" },
];

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "No-Refund Policy", href: "#no-refund" },
];

/** Isometric hero illustration (remote placeholder). Swap for a local asset later. */
export const heroImageUrl =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80";
