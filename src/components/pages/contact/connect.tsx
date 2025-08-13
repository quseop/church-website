import { Mail, Phone, MapPin, Send } from "lucide-react";
import React from "react";

export default function Connect() {
    return (
        <main className="max-sm:bg-[#96958C] w-full max-sm:px-[5%] px-[15%] py-20 text-black">
            <h1 className="text-3xl font-light tracking-widest mb-6">Connect With Us</h1>
            <p className="text-sm  mb-12 md:w-[60%]">
                Whether you have a question, a prayer request, or just want to get in touch, we’d love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6 max-sm:border-y py-10 border-white/10">
                    {/*<div className="flex items-start gap-4">*/}
                    {/*    <Mail className="w-5 h-5 mt-1 text-[#6D2E47]" />*/}
                    {/*    <div>*/}
                    {/*        <h3 className="text-base ">Email</h3>*/}
                    {/*        <p className="text-sm text-gray-700">originalseedministries@gmail.com</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex items-start gap-4">*/}
                    {/*    <Phone className="w-5 h-5 mt-1 text-[#6D2E47]" />*/}
                    {/*    <div>*/}
                    {/*        <h3 className="text-base ">WhatsApp</h3>*/}
                    {/*        <p className="text-sm text-gray-700">+27 71 234 5678</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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
                <form className="flex md:px-30 flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Your Name"
                        className=" border-b   px-4 py-3 text-sm   placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border-b px-4 py-3 text-sm  placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <textarea
                        placeholder="Your Message or Prayer Request"
                        rows={4}
                        className="border-b  px-4 py-3 text-sm  placeholder:text-gray-700 focus:outline-none focus:border-[#6D2E47]"
                    />
                    <button
                        type="submit"
                        className="border bg-muted hover:bg-[#6D2E47] hover:border-[#6D2E47] py-3 px-6 font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500  inline-flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4 text-black" /> Send Request
                    </button>
                    <p className="bg-orange-500 font-bold text-center px-2 rounded-3xl">
                        section under construction
                    </p>
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
