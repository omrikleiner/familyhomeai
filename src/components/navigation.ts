export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const navItems: NavItem[] = [
  { href: '/', label: 'בית', icon: '🏠' },
  { href: '/family', label: 'פרופיל משפחתי', icon: '👪' },
  { href: '/events', label: 'אירועים', icon: '📅' },
  { href: '/tasks', label: 'מטלות', icon: '✅' },
  { href: '/shopping', label: 'קניות', icon: '🛒' },
  { href: '/ai', label: 'עוזר AI', icon: '🤖' },
  { href: '/settings', label: 'הגדרות', icon: '⚙️' },
];

export function labelForPath(pathname: string): string {
  const match = navItems.find((item) => item.href === pathname);
  return match?.label || 'בית';
}
