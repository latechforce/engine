import type { FormConfig } from '/domain/entities/Form'

/**
 * Form configuration type
 * @title Form configuration
 * @description Type alias for form configuration
 * @example {
 *   name: "contact-form",
 *   path: "/contact",
 *   title: "Contact Us",
 *   description: "Please fill out this form to contact our team",
 *   table: "contacts",
 *   inputs: [
 *     {
 *       field: "name",
 *       label: "Full Name",
 *       required: true,
 *       placeholder: "Enter your full name"
 *     },
 *     {
 *       field: "email",
 *       label: "Email Address",
 *       required: true,
 *       placeholder: "Enter your email"
 *     },
 *     {
 *       field: "message",
 *       label: "Message",
 *       required: true,
 *       placeholder: "Enter your message",
 *       minLength: 10,
 *       maxLength: 1000
 *     }
 *   ],
 *   submitLabel: "Send Message",
 *   successMessage: "Thank you for your message! We'll get back to you soon."
 * }
 */
export type IForm = FormConfig
