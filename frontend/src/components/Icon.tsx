interface IconProps {
  size?: number;
}

export const Icon = {
  Razor: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4 L20 20" />
      <path d="M14 14 L20 8 L20 4 L16 4 Z" />
    </svg>
  ),
  Scissors: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 L8.5 16" />
      <path d="M20 20 L8.5 8" />
    </svg>
  ),
  Send: ({ size = 18 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 L11 13" />
      <path d="M22 2 L15 22 L11 13 L2 9 Z" />
    </svg>
  ),
  Close: ({ size = 16 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5 L19 19 M19 5 L5 19" />
    </svg>
  ),
  Chat: ({ size = 22 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12 C21 16.4 16.97 20 12 20 C10.5 20 9.1 19.7 7.85 19.15 L3 20 L4.15 16.15 C3.42 14.95 3 13.55 3 12 C3 7.6 7.03 4 12 4 C16.97 4 21 7.6 21 12 Z" />
    </svg>
  ),
  Back: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5 L8 12 L15 19" />
    </svg>
  ),
  Check: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 L10 18 L20 6" />
    </svg>
  ),
  Pin: ({ size = 16 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22 C12 22 19 14.5 19 9.5 C19 5.36 15.86 2 12 2 C8.14 2 5 5.36 5 9.5 C5 14.5 12 22 12 22 Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  Phone: ({ size = 16 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 17 V20 A2 2 0 0 1 19.8 22 C10 21.6 2.4 14 2 4.2 A2 2 0 0 1 4 2 H7 A2 2 0 0 1 9 4 C9.1 5 9.4 6 9.7 7 A2 2 0 0 1 9.2 9 L8 10.3 C9.7 13.3 12.1 15.7 15 17.4 L16.3 16.2 A2 2 0 0 1 18.4 15.7 C19.4 16 20.4 16.2 21.4 16.4 A2 2 0 0 1 22 17 Z" />
    </svg>
  ),
  Clock: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 V12 L15 14" />
    </svg>
  ),
  Calendar: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 10 H21" />
      <path d="M8 3 V7" />
      <path d="M16 3 V7" />
    </svg>
  ),
  Person: ({ size = 16 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21 C4 16.5 7.5 13 12 13 C16.5 13 20 16.5 20 21" />
    </svg>
  ),
  Star: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L14.5 8.5 L21 9.3 L16 13.8 L17.5 20.5 L12 17 L6.5 20.5 L8 13.8 L3 9.3 L9.5 8.5 Z" />
    </svg>
  ),
  Emblem: ({ size = 56 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="38" />
      <circle cx="40" cy="40" r="32" strokeDasharray="2 3" opacity="0.4" />
      <path d="M22 24 L48 50" />
      <path d="M40 42 L52 30 L52 22 L44 22 Z" fill="currentColor" opacity="0.15" />
      <circle cx="26" cy="56" r="4" />
      <circle cx="54" cy="56" r="4" />
      <path d="M58 24 L30 52" />
      <path d="M22 24 L50 52" opacity="0.4" />
    </svg>
  ),
};
