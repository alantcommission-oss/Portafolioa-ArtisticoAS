"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email address";
    }
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) {
      errs.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else if (res.status === 429) {
        setServerError("Too many requests. Please try again later.");
        setStatus("error");
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="parchment-card p-8 text-center">
        <p className="font-heading text-xl text-accent mb-2">Message sent!</p>
        <p className="font-body text-foreground/70">
          Thank you for reaching out. I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="parchment-card p-6 md:p-8 space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-heading text-sm text-foreground/80 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.name && (
          <p className="text-destructive text-xs mt-1 font-body">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-heading text-sm text-foreground/80 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-heading text-sm text-foreground/80 mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.subject && (
          <p className="text-destructive text-xs mt-1 font-body">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-heading text-sm text-foreground/80 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        />
        {errors.message && (
          <p className="text-destructive text-xs mt-1 font-body">{errors.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-destructive text-sm font-body text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-accent text-white font-heading text-sm tracking-widest uppercase transition-all hover:bg-accent/80 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
