import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import type { ContactDetail } from '../types/landing';

export const contactDetails: ContactDetail[] = [
  {
    id: 'contact-email',
    icon: Mail,
    label: 'Email',
    value: 'support@launchpoint.com',
  },
  {
    id: 'contact-phone',
    icon: Phone,
    label: 'Phone',
    value: '+91 XXXXX XXXXX',
  },
  {
    id: 'contact-location',
    icon: MapPin,
    label: 'Location',
    value: 'Kochi, Kerala, India',
  },
  {
    id: 'contact-hours',
    icon: Clock,
    label: 'Support Hours',
    value: 'Monday - Friday, 9:00 AM - 6:00 PM IST',
  },
];

/** Isometric map illustration (remote placeholder). Swap for a local render. */
export const contactMapImageUrl =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80';