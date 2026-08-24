import type { LucideIcon } from 'lucide-react';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type PriceTag = 'Free' | 'Premium';

export interface Instructor {
  name: string;
  avatarUrl: string;
}

export interface Course {
  id: string;
  title: string;
  imageUrl: string;
  level: CourseLevel;
  rating: number;
  instructor: Instructor;
  /** Pre-formatted for display, e.g. "1.2k" */
  students: string;
  /** Pre-formatted for display, e.g. "14h 30m" */
  duration: string;
  priceTag: PriceTag;
}

export interface Advantage {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface RoadmapStep {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  /** Pre-formatted price without currency symbol, e.g. "0" or "4,999" */
  price: string;
  /** e.g. "forever" or "month" */
  period: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
  badge?: string;
}

/** Compact icon + label card, e.g. the "Why Choose" highlights. */
export interface Highlight {
  id: string;
  icon: LucideIcon;
  label: string;
}

/** Numbered step in the "How It Works" process. */
export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface ContactDetail {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}