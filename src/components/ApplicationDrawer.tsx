"use client";

import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { APPLICATION_ENDPOINT, CONTACT_URL } from "@/data/site";

type ApplicationDrawerProps = { open: boolean; onClose: () => void };

const fields = [
  { id: "name", label: "Name", type: "text" },
  { id: "building", label: "What are you building?", type: "text" },
  { id: "link", label: "Link to your work or business", type: "url" },
  { id: "revenue", label: "Current monthly revenue", type: "text" },
  { id: "kpi", label: "Your main KPI", type: "text" },
] as const;

export function ApplicationDrawer({ open, onClose }: ApplicationDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [fallbackText, setFallbackText] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const lastFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button, input, textarea")?.focus(), 50);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, input, textarea, a[href]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocused?.focus();
    };
  }, [open, onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (!APPLICATION_ENDPOINT) {
      const formatted = Array.from(data.entries()).map(([key, value]) => `${key.toUpperCase()}: ${value}`).join("\n\n");
      setFallbackText(formatted);
      setStatus("Your application is ready to copy and send.");
      return;
    }
    setStatus("Sending your application...");
    try {
      const response = await fetch(APPLICATION_ENDPOINT, { method: "POST", body: data });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("Application sent.");
      form.reset();
    } catch {
      setStatus("The application couldn't send. Copy your answers and send them directly.");
      setFallbackText(Array.from(data.entries()).map(([key, value]) => `${key.toUpperCase()}: ${value}`).join("\n\n"));
    }
  }

  async function copyApplication() {
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
      setStatus("Application copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access fails on insecure origins and when permission is denied.
      setStatus("Copying failed. Select the text below and copy it manually.");
    }
  }

  return (
    <div className={`application ${open ? "application--open" : ""}`} aria-hidden={!open} inert={!open}>
      <button className="application__backdrop" type="button" onClick={onClose} aria-label="Close application" tabIndex={open ? 0 : -1} />
      <div className="application__panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="application-title">
        <div className="application__top">
          <span>HackerHouse Accelerator / Metro Manila + Clark</span>
          <button type="button" onClick={onClose} aria-label="Close application"><X aria-hidden="true" /></button>
        </div>
        <div className="application__intro">
          <p>Application / 01</p>
          <h2 id="application-title">Put the real numbers on the table.</h2>
          <p>Tell us where the business is now, what is holding it back, and which house you want a room in.</p>
        </div>
        <form onSubmit={submit}>
          {fields.map((field) => (
            <label key={field.id}>
              <span>{field.label}</span>
              <input name={field.id} type={field.type} required />
            </label>
          ))}
          <label>
            <span>What does 10x look like by year-end?</span>
            <textarea name="ten-x" rows={3} required />
          </label>
          <label>
            <span>Why do you want to live in this house now?</span>
            <textarea name="why-now" rows={4} required />
          </label>
          <label className="application__check">
            <input name="traction-confirmed" type="checkbox" value="yes" required />
            <span>I understand this is a full-time house, and the business I named is my only one.</span>
          </label>
          <button className="button button--dark application__submit" type="submit">Send my application <ArrowUpRight size={17} /></button>
        </form>
        <p className="application__status" aria-live="polite">{status}</p>
        {fallbackText && (
          <div className="application__fallback">
            <textarea readOnly value={fallbackText} rows={8} aria-label="Your application, ready to copy" />
            <button className="button button--outline" type="button" onClick={copyApplication}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy application"}</button>
            {CONTACT_URL ? <a className="button button--signal" href={CONTACT_URL} target="_blank" rel="noreferrer">Open message <ArrowUpRight size={16} /></a> : <p>Set CONTACT_URL in <code>src/data/site.ts</code> to enable direct messaging.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
