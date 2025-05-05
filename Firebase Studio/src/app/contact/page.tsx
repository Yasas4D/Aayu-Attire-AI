
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // TODO: Implement actual form submission logic (e.g., send email, save to DB)
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values)
    // Simulate API call
    setTimeout(() => {
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you soon.",
        })
        form.reset(); // Reset form after successful submission
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-12 text-primary">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Reach out through the form or use the contact details below.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Email</h3>
                <a href="mailto:support@aayulookbook.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@aayulookbook.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <span className="text-muted-foreground">(555) 123-4567</span> {/* Placeholder */}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Address</h3>
                <span className="text-muted-foreground">
                  123 Fashion Ave, Style City, SC 90210 {/* Placeholder */}
                </span>
              </div>
            </div>
          </div>
           {/* Optional: Add a small map embed here */}
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Inquiry about..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more about how we can help..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
