"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Zap, Send } from "lucide-react";

const Github = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>);
const Linkedin = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

export function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <Badge variant="outline" className="border-white/10 bg-white/5 text-gray-300 rounded-full px-4 py-1">
            Get in Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's Work <span className="text-primary">Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Have a project in mind or want to discuss opportunities?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 lg:col-span-1"
          >
            <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl flex gap-4 items-start group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Email</h4>
                <p className="text-sm text-gray-400 mb-2">abdurrahman1072a@gmail.com</p>
                <a href="mailto:sakibul.islam0808@gmail.com" className="text-xs text-primary hover:underline">Send an email ↗</a>
              </div>
            </Card>

            <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl flex gap-4 items-start group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <Phone className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Phone</h4>
                <p className="text-sm text-gray-400 mb-2">+880 1540581443</p>
                <a href="tel:+8801540581443" className="text-xs text-primary hover:underline">Make a call ↗</a>
              </div>
            </Card>

            <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl flex gap-4 items-start group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Location</h4>
                <p className="text-sm text-gray-400">Mirpur, Dhaka<br />Bangladesh</p>
              </div>
            </Card>

            <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl flex flex-col gap-3 group hover:border-primary/50 transition-colors mt-2">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-white">Quick Response</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                I typically respond within 24 hours. For urgent matters, feel free to call directly.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-[#111111] border-white/5 p-8 md:p-10 rounded-2xl h-full glow-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Send a Message</h3>
                  <p className="text-sm text-gray-500">Fill out the form below and I'll get back to you soon.</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input id="subject" placeholder="How can I help you?" className="bg-black/50 border-white/10 focus-visible:ring-primary text-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea id="message" placeholder="Tell me about your project, timeline, and how I can help..." className="bg-black/50 border-white/10 focus-visible:ring-primary text-white min-h-[150px] resize-none" />
                </div>
                <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 h-14 text-base font-medium rounded-xl">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 max-w-6xl mt-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-white/10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-white italic font-serif text-2xl">MD Abdur Rahman</span>
            <p className="text-sm text-gray-500">Software Engineer focused on scalable full-stack products with React, Next.js, Node.js, and Nest.js.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-transparent hover:bg-white/5 text-gray-300 text-xs h-8">
              ↑ Back to Top
            </Button>
          </div>
        </div>
        <div className="text-center pb-8">
          <p className="text-xs text-gray-600">© 2026 Md Abdur Rahman. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
