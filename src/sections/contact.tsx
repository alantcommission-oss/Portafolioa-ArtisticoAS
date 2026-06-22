import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-24 px-4 pt-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-accent text-center mb-4 uppercase tracking-wider">
          Contact
        </h2>
        <p className="text-center text-foreground/70 font-body mb-12">
          Have a project in mind? Want to commission a piece? Drop me a message
          and I will get back to you.
        </p>

        <ContactForm />
      </div>
    </section>
  );
}
