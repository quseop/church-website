"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Footer } from "@/components/sub-components/footer";

function ContactForm() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, message })
            })
            if (!res.ok) throw new Error('Failed to send')
            setSubmitted(true)
            setFullName("")
            setEmail("")
            setMessage("")
        } catch {
            alert('Sorry, something went wrong sending your message. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="text-sm text-gray-700">
                Thank you! Your message has been sent. We will get back to you soon.
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="flex md:px-30 flex-col gap-4">
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className=" border-b   px-4 py-3 text-sm   placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="border-b px-4 py-3 text-sm  placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message or Prayer Request"
                rows={4}
                className="border-b  px-4 py-3 text-sm  placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
            />
            <button
                type="submit"
                disabled={loading}
                className="border bg-muted hover:bg-[#6D2E47] hover:border-[#6D2E47] py-3 px-6 font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500  inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <Send className="w-4 h-4 text-black" /> {loading ? 'Sending...' : 'Send Request'}
            </button>
        </form>
    )
}

export default function Connect() {
    return (
        <>
        <main className="max-sm:bg-[#96958C] min-h-screen w-full max-sm:px-[5%] px-[15%] py-20 text-black">
            <h1 className="text-3xl font-light tracking-widest mb-6">Connect With Us</h1>
            <p className="text-sm  mb-12 md:w-[60%]">
                Whether you have a question, a prayer request, or just want to get in touch, we’d love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6 max-sm:border-y py-10 border-white/10">
                    <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base ">Email</h3>
                            <p className="text-sm text-gray-700">blessingtshego@yahoo.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base ">Call</h3>
                            <p className="text-sm text-gray-700">078 272 8442</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base">Location</h3>
                            <p className="text-sm text-gray-700">Brooklyn, Pretoria, South Africa <br/>
                                (1st Floor, Optilan House, 232 Bronkhorst Street, Nieuw, Muckleneuk, Pretoria, 0181)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message / Prayer Form */}
                <ContactForm />
            </div>

            {/* CTA to Sermons */}
            <div>
                <a
                    href="/resources/sermons"
                    className="underline underline-offset-4 text-[#6D2E47] text-sm hover:text-[#b46c82] transition"
                >
                    Or watch the latest sermon now →
                </a>
            </div>
        </main>
        <Footer />
        </>
    );
}
