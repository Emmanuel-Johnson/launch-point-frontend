import {
  GraduationCap,
  PlayCircle,
  ClipboardCheck,
  Award,
  LineChart,
  MonitorPlay,
  Users,
  Gauge,
  DraftingCompass,
  Banknote,
  Sparkles,
} from 'lucide-react';
import type { Advantage, Highlight, ProcessStep, Stat } from '../types/landing';

/**
 * "What We Offer" cards share the exact shape and visuals of the landing-page
 * advantages, so they reuse the Advantage type and the AdvantageCard component.
 */
export const offerings: Advantage[] = [
  {
    id: 'offer-courses',
    icon: GraduationCap,
    title: 'Industry-Focused Courses',
    description:
      'Curriculums built in collaboration with top tech and business experts for real impact.',
  },
  {
    id: 'offer-video',
    icon: PlayCircle,
    title: 'Video Lessons',
    description:
      'High-definition instructional videos with interactive playback features for deep engagement.',
  },
  {
    id: 'offer-quizzes',
    icon: ClipboardCheck,
    title: 'Quizzes & Assessments',
    description:
      'Validate your knowledge with real-time feedback and structured tests at every stage.',
  },
  {
    id: 'offer-certificates',
    icon: Award,
    title: 'Certificates',
    description:
      'Earn industry-recognized credentials upon completion of every specialized course track.',
  },
  {
    id: 'offer-progress',
    icon: LineChart,
    title: 'Progress Tracking',
    description:
      'Detailed dashboards to monitor your learning journey and key milestones in real-time.',
  },
  {
    id: 'offer-subscription',
    icon: MonitorPlay,
    title: 'Subscription Learning',
    description:
      'Unlimited access to our entire library for one predictable, affordable monthly fee.',
  },
];

export const whyChoose: Highlight[] = [
  { id: 'why-instructors', icon: Users, label: 'Expert Instructors' },
  { id: 'why-self-paced', icon: Gauge, label: 'Self-Paced Learning' },
  { id: 'why-projects', icon: DraftingCompass, label: 'Practical Projects' },
  { id: 'why-pricing', icon: Banknote, label: 'Affordable Pricing' },
  { id: 'why-design', icon: Sparkles, label: 'Modern UI/UX' },
];

export const howItWorksSteps: ProcessStep[] = [
  {
    id: 'how-account',
    step: 1,
    title: 'Create Account',
    description: 'Sign up in seconds to join our global learning community.',
  },
  {
    id: 'how-subscribe',
    step: 2,
    title: 'Subscribe to Prime',
    description: 'Unlock all courses and features with our premium plan.',
  },
  {
    id: 'how-enroll',
    step: 3,
    title: 'Enroll in Courses',
    description: 'Choose from dozens of high-impact professional paths.',
  },
  {
    id: 'how-learn',
    step: 4,
    title: 'Learn & Assess',
    description: 'Watch lessons, practice skills, and take assessments.',
  },
  {
    id: 'how-certificates',
    step: 5,
    title: 'Earn Certificates',
    description: 'Download and share your industry-recognized achievements.',
  },
];

export const stats: Stat[] = [
  { id: 'stat-courses', value: '20+', label: 'Courses' },
  { id: 'stat-lessons', value: '100+', label: 'Lessons' },
  { id: 'stat-learners', value: '10k+', label: 'Learners' },
  { id: 'stat-satisfaction', value: '95%', label: 'Satisfaction' },
];

/** Portrait for the mission card (remote placeholder). Swap for a local asset. */
export const missionImageUrl =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

/** Small avatar cluster above the closing CTA. */
export const journeyAvatars: string[] = [
  'https://i.pravatar.cc/64?img=1',
  'https://i.pravatar.cc/64?img=5',
  'https://i.pravatar.cc/64?img=8',
  'https://i.pravatar.cc/64?img=15',
];