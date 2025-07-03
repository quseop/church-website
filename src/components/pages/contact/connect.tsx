import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Connect() {
    return (
        <main className="min-h-screen w-full max-sm:px-[5%] px-[15%] py-20 text-[#ddd]">
            <h1 className="text-3xl font-light tracking-widest mb-6">Connect With Us</h1>
            <p className="text-sm text-gray-400 mb-12 w-[60%]">
                Whether you have a question, a prayer request, or just want to get in touch, we’d love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base font-light">Email</h3>
                            <p className="text-sm text-gray-400">originalseedministries@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base font-light">WhatsApp</h3>
                            <p className="text-sm text-gray-400">+27 71 234 5678</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 text-[#6D2E47]" />
                        <div>
                            <h3 className="text-base font-light">Location</h3>
                            <p className="text-sm text-gray-400">Brooklyn, Pretoria, South Africa</p>
                        </div>
                    </div>
                </div>

                {/* Message / Prayer Form */}
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="bg-black border border-white/10 px-4 py-3 text-sm text-[#ddd] rounded placeholder:text-gray-500 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-black border border-white/10 px-4 py-3 text-sm text-[#ddd] rounded placeholder:text-gray-500 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <textarea
                        placeholder="Your Message or Prayer Request"
                        rows={4}
                        className="bg-black border border-white/10 px-4 py-3 text-sm text-[#ddd] rounded placeholder:text-gray-500 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <button
                        type="submit"
                        className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] py-3 px-6 font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd] inline-flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" /> Send Message
                    </button>
                </form>
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
    );
}
