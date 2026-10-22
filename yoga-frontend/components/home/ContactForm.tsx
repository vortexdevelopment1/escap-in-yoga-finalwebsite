"use client";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { validateEmail, validateMessage, validateName } from "@/lib/validation";

type Errors = Partial<Record<"name" | "email" | "message", string | null>>;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = { name: validateName(values.name), email: validateEmail(values.email), message: validateMessage(values.message) };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setStatus("loading");
    try {
      // Save contact enquiry to localStorage for Admin Dashboard
      const enquiry = {
        _id: "inq-" + Date.now(),
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(localStorage.getItem("eiy:enquiries") || "[]");
        localStorage.setItem("eiy:enquiries", JSON.stringify([enquiry, ...existing]));
      } catch {}

      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[2rem] bg-cream p-10 text-center">
        <h3 className="text-3xl">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-brown/80">Your message is ready for the studio. In this demo nothing is sent, so connect a form service before launch.</p>
        <Button className="mt-6" variant="secondary" onClick={() => { setValues({ name: "", email: "", message: "" }); setStatus("idle"); }}>Write another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] bg-cream p-7 sm:p-10">
      {status === "error" && <p role="alert" className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-900">We couldn&rsquo;t send your message. Check your connection and try again.</p>}
      <Input id="contact-name" label="Full name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} disabled={status === "loading"} />
      <Input id="contact-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={set("email")} error={errors.email} disabled={status === "loading"} />
      <Textarea id="contact-message" label="Message" value={values.message} onChange={set("message")} error={errors.message} disabled={status === "loading"} />
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">{status === "loading" ? "Sending…" : "Send message"}</Button>
    </form>
  );
}
