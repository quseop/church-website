"use client";

import { useState } from "react";
import {ArrowLeft, Send} from "lucide-react";
import Link from "next/link";

export default function PrayerRequest() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate submission logic (replace with API later)
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="relative h-screen w-full px-[15%] max-sm:px-[5%] py-20 ">
            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 "
                >
                    <ArrowLeft size={45} className="border border-black rounded-3xl p-2" />
                </Link>
            </div>
            <h1 className="text-3xl font-light tracking-widest mb-6">Prayer Request</h1>
            <p className="text-gray-700 text-sm mb-12 w-[60%]">
                We believe in the power of prayer. Please submit your request below. Your message will be handled with care and confidentiality.
            </p>



            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-[60%]">
                    <div>
                        <label className="block text-sm  mb-1">Name (optional)</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 bg-transparent border border-white rounded text-[#ddd] placeholder-gray-600 focus:outline-none focus:border-[#6D2E47]"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm  mb-1">Email (optional)</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 bg-transparent border border-white rounded  placeholder-gray-600 focus:outline-none focus:border-[#6D2E47]"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm  mb-1">Your Prayer Request</label>
                        <textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-3 h-40 bg-transparent border border-white rounded  placeholder-gray-600 focus:outline-none focus:border-[#6D2E47]"
                            placeholder="Write your prayer request here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 border rounded transition-all hover:bg-[#6D2E47] hover:border-[#6D2E47] text-[#ddd]"
                    >
                        <Send className="w-4 h-4" />
                        Submit Request
                    </button>
                </form>
            ) : (
                <div className="text-lg text-[#ccc] max-w-xl">
                    <p className="mb-4">
                        🙏 Thank you for your submission. We will be standing with you in prayer.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="underline text-sm text-[#6D2E47] hover:text-[#8d3b61]"
                    >
                        Submit another request
                    </button>
                </div>
            )}
        </main>
    );
}
