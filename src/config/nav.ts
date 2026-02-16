export type NavItem = { label: string; href: string };

export const NAV_PRIMARY: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Departments", href: "/departments" },
  { label: "News", href: "/news" },
];

export const NAV_DROPDOWNS: Record<"home" | "departments" | "news", NavItem[]> = {
  home: [
    { label: "Meet the team", href: "/company/meet-the-team" },
    { label: "Mandate", href: "/company/mandate" },
    { label: "Conversion Centers", href: "/conversion-centres" },
    { label: "EV Project", href: "/ev-project" },
  ],
  departments: [
    { label: "Corporate Service", href: "/departments#corporate-service" },
    { label: "Compliance", href: "/departments#compliance" },
    { label: "Investment", href: "/departments#investment" },
    { label: "Finance", href: "/departments#finance" },
    { label: "Technical & Operations", href: "/departments#technical-operations" },
  ],
  news: [
    { label: "Articles", href: "/news?tab=articles" },
    { label: "Newsletters", href: "/news?tab=newsletters" },
    { label: "Testimonials", href: "/news?tab=testimonials" },
  ],
};
