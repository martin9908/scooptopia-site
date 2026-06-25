"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type InquiryFormValues = {
    name: string;
    email: string;
    phone: string;
    eventType: string;
    eventDate: string;
    guestCount: number;
    message: string;
};

export function InquiryForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InquiryFormValues>();

    const onSubmit = async () => {
        setIsSubmitted(true);
        reset();
    };

    const inputStyle =
        "mt-1 w-full rounded-xl border border-brand-green/30 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="elevated-card p-6 md:p-8" noValidate>
            <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-brand-green">
                    Name
                    <input
                        className={inputStyle}
                        autoComplete="name"
                        {...register("name", { required: "Please enter your name." })}
                    />
                    {errors.name ? <span className="mt-1 block text-xs text-red-700">{errors.name.message}</span> : null}
                </label>

                <label className="text-sm font-medium text-brand-green">
                    Email
                    <input
                        className={inputStyle}
                        type="email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Please enter your email.",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Please enter a valid email address.",
                            },
                        })}
                    />
                    {errors.email ? <span className="mt-1 block text-xs text-red-700">{errors.email.message}</span> : null}
                </label>

                <label className="text-sm font-medium text-brand-green">
                    Phone
                    <input
                        className={inputStyle}
                        type="tel"
                        autoComplete="tel"
                        {...register("phone", { required: "Please enter your phone number." })}
                    />
                    {errors.phone ? <span className="mt-1 block text-xs text-red-700">{errors.phone.message}</span> : null}
                </label>

                <label className="text-sm font-medium text-brand-green">
                    Event Type
                    <select
                        className={inputStyle}
                        {...register("eventType", { required: "Please choose an event type." })}
                    >
                        <option value="">Select event type</option>
                        <option value="birthday">Birthday</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate</option>
                        <option value="community">Community Event</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.eventType ? (
                        <span className="mt-1 block text-xs text-red-700">{errors.eventType.message}</span>
                    ) : null}
                </label>

                <label className="text-sm font-medium text-brand-green">
                    Event Date
                    <input
                        className={inputStyle}
                        type="date"
                        {...register("eventDate", { required: "Please choose an event date." })}
                    />
                    {errors.eventDate ? (
                        <span className="mt-1 block text-xs text-red-700">{errors.eventDate.message}</span>
                    ) : null}
                </label>

                <label className="text-sm font-medium text-brand-green">
                    Guest Count
                    <input
                        className={inputStyle}
                        type="number"
                        min={1}
                        {...register("guestCount", {
                            required: "Please provide guest count.",
                            valueAsNumber: true,
                            min: { value: 1, message: "Guest count must be at least 1." },
                        })}
                    />
                    {errors.guestCount ? (
                        <span className="mt-1 block text-xs text-red-700">{errors.guestCount.message}</span>
                    ) : null}
                </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-brand-green">
                Message
                <textarea
                    className={`${inputStyle} min-h-32`}
                    {...register("message", { required: "Please include event details." })}
                    placeholder="Tell us about your venue, preferred menu, and any special requests."
                />
                {errors.message ? (
                    <span className="mt-1 block text-xs text-red-700">{errors.message.message}</span>
                ) : null}
            </label>

            <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-[#f8f2e9] transition hover:bg-brand-green-soft disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
                {isSubmitted ? (
                    <p className="text-sm text-brand-green">
                        Thanks! Your inquiry is captured. Next step is wiring this to email or CRM.
                    </p>
                ) : null}
            </div>
        </form>
    );
}
