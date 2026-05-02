import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const INITIAL_FORM = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const validateForm = ({ name, email, message }) => {
  if (!name.trim()) return "Please enter your name";
  if (!email.trim() || !EMAIL_RE.test(email)) return "Please enter a valid email";
  if (message.trim().length < 10) return "Message must be at least 10 characters";
  return null;
};

const sendMessage = (form) =>
  axios.post(`${API}/contact`, {
    name: form.name.trim(),
    email: form.email.trim(),
    message: form.message.trim()
  });

const extractError = (apiError) => {
  const detail = apiError?.response?.data?.detail;
  if (Array.isArray(detail)) return detail[0]?.msg || "Validation error";
  return detail || "Could not send. Please try again.";
};

const FieldLabel = ({ htmlFor, children }) => (
  <Label htmlFor={htmlFor} className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
    {children}
  </Label>
);

const NameEmailRow = ({ form, onUpdate }) => (
  <div className="grid sm:grid-cols-2 gap-5">
    <div className="space-y-2">
      <FieldLabel htmlFor="name">Your Name</FieldLabel>
      <Input
        id="name"
        data-testid="contact-name"
        value={form.name}
        onChange={(e) => onUpdate("name", e.target.value)}
        placeholder="Ada Lovelace"
        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
      />
    </div>
    <div className="space-y-2">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        id="email"
        type="email"
        data-testid="contact-email-input"
        value={form.email}
        onChange={(e) => onUpdate("email", e.target.value)}
        placeholder="you@company.com"
        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
      />
    </div>
  </div>
);

const MessageField = ({ value, onUpdate }) => (
  <div className="space-y-2">
    <FieldLabel htmlFor="msg">Message</FieldLabel>
    <Textarea
      id="msg"
      rows={6}
      data-testid="contact-message"
      value={value}
      onChange={(e) => onUpdate("message", e.target.value)}
      placeholder="Tell me about your project, role, or idea…"
      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
    />
  </div>
);

const SubmitButton = ({ sending }) => (
  <button
    type="submit"
    disabled={sending}
    data-testid="contact-submit"
    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60"
  >
    {sending ? "Sending…" : (<><Send size={16} /> Send Message</>)}
  </button>
);

const ContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sending, setSending] = useState(false);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message received — I'll reply within 24h.");
      setForm(INITIAL_FORM);
    } catch (apiError) {
      toast.error(extractError(apiError));
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-3 glass rounded-3xl p-7 md:p-9 reveal space-y-5">
      <NameEmailRow form={form} onUpdate={updateField} />
      <MessageField value={form.message} onUpdate={updateField} />
      <SubmitButton sending={sending} />
    </form>
  );
};

export default ContactForm;
