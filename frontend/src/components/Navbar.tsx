import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Shorten" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `transition-colors hover:text-[var(--color-ink)] ${
      isActive ? "text-[var(--color-ink)]" : "text-[var(--color-graphite)]"
  }`;
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
      <header className="relative z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <NavLink
              to="/"
              className="font-display text-lg font-medium tracking-tight text-[var(--color-ink)]"
              onClick={() => setOpen(false)}
          >
            SHORTLY
          </NavLink>

          {/* Desktop nav */}
          <nav
              className="hidden items-center gap-8 text-sm md:flex"
              aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={navLinkClass}
                    end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
          >
          <span className="relative block h-3 w-4">
            <span
                className={`absolute left-0 top-0 block h-px w-4 bg-[var(--color-ink)] transition-transform ${
                    open ? "translate-y-1.5 rotate-45" : ""
                }`}
            />
            <span
                className={`absolute left-0 bottom-0 block h-px w-4 bg-[var(--color-ink)] transition-transform ${
                    open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
            />
          </span>
          </button>
        </div>

        {open && (
            <nav
                id="mobile-nav"
                aria-label="Primary"
                className="animate-rise mx-6 mb-6 flex flex-col gap-1 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm shadow-[var(--shadow-soft)] md:hidden"
            >
              {NAV_LINKS.map((link) => (
                  <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                          `rounded-lg px-3 py-2.5 ${
                              isActive
                                  ? "bg-[var(--color-mist)] text-[var(--color-ink)]"
                                  : "text-[var(--color-graphite)]"
                          }`
                      }
                  >
                    {link.label}
                  </NavLink>
              ))}
            </nav>
        )}
      </header>
  );
}