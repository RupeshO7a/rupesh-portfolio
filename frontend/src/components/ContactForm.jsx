import React, { useState, useCallback } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const INITIAL = { name: "", email: "", message: "" };

const validate = ({ name, email, message }) => {
  if (!name.trim()) return "Please enter your name";
  if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Please enter a valid email";
  if (message.trim().length < 10) return "Message must be at least 10 characters";
  return null;
};

const submitMessage = async (form) => {
  await axios.post(`${API}/contact`, {
    name: form.name.trim(),
    email: form.email.trim(),
    message: form.message.trim()
  });
};

const ContactForm = () => {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const err = validate(form);
      if (err) {
        toast.error(err);
        return;
      }
      setSending(true);
      try {
        await submitMessage(form);
        toast.success("Message received — I'll reply within 24h.");
        setForm(INITIAL);
      } catch (apiErr) {
        const detail = apiErr?.response?.data?.detail;
        const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
        toast.error(msg || "Could not send. Please try again.");
      } finally {
        setSending(false);
      }
    },
    [form]
  );

  return (
    <form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-3xl p-7 md:p-9 reveal space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Your Name</Label>
          <Input
            id="name"
            data-testid="contact-name"
            value={form.name}
            onChange={update("name")}
            placeholder="Ada Lovelace"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Email</Label>
          <Input
            id="email"
            type="email"
            data-testid="contact-email-input"
            value={form.email}
            onChange={update("email")}
            placeholder="you@company.com"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="msg" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Message</Label>
        <Textarea
          id="msg"
          rows={6}
          data-testid="contact-message"
          value={form.message}
          onChange={update("message")}
          placeholder="Tell me about your project, role, or idea…"
          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        data-testid="contact-submit"
        className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {sending ? "Sending…" : (<><Send size={16} /> Send Message</>)}
      </button>
    </form>
  );
};

export default ContactForm;
