"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Cookie consent notice.
 *
 * Hand-rolled rather than using vanilla-cookieconsent: that library's run()
 * completed without error but never constructed its modal DOM in this app, and
 * calling show(true) threw "Cannot read properties of undefined (reading
 * 'addEventListener')". An isolated copy from a CDN with a minimal config
 * failed the same way, so it was not a configuration problem. This is ~60 lines,
 * needs no dependency, and matches the brand without fighting library CSS.
 *
 * The site sets no analytics or marketing cookies. The only cookie is this
 * consent record, which is what /privacy states.
 */

const COOKIE = "hha_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days
const REOPEN_EVENT = "hha:cookie-preferences";

type Choice = "accepted" | "rejected";

function readChoice(): Choice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE}=`));
  const value = match?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

function writeChoice(choice: Choice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/*
 * The cookie is external state, so it is read through useSyncExternalStore
 * rather than mirrored into useState from an effect. The server snapshot is
 * false so the banner never renders server-side, which would otherwise flash
 * for people who already answered.
 */
let listeners: (() => void)[] = [];
let forcedOpen = false;

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  const reopen = () => {
    forcedOpen = true;
    listeners.forEach((listener) => listener());
  };
  window.addEventListener(REOPEN_EVENT, reopen);
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
    window.removeEventListener(REOPEN_EVENT, reopen);
  };
}

const getSnapshot = () => forcedOpen || !readChoice();
const getServerSnapshot = () => false;

export function CookieNotice() {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const decide = useCallback((choice: Choice) => {
    writeChoice(choice);
    forcedOpen = false;
    listeners.forEach((listener) => listener());
  }, []);

  if (!open) return null;

  return (
    <div className="cookie-notice" role="dialog" aria-modal="false" aria-label="Cookie notice">
      <p className="cookie-notice__title">Cookies</p>
      <p className="cookie-notice__body">
        This site is a design concept. It runs no analytics and no trackers. The only cookie it
        sets records this choice, so the notice stops reappearing.{" "}
        <a href="/privacy">Privacy policy</a>
      </p>
      <div className="cookie-notice__actions">
        <button className="button button--signal" type="button" onClick={() => decide("accepted")}>
          Accept
        </button>
        <button className="button button--outline" type="button" onClick={() => decide("rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
}

/** Reopens the notice. Consent must stay withdrawable, so the footer links here. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="site-footer__cookie"
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
