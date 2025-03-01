import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Access to exclusive Discord community",
  "Custom in-house monitors",
  "24/7 premium support",
  "Industry partnerships",
  "Real-time drop notifications",
  "Advanced botting guides",
  "Early access to restocks",
  "Affiliate program (40% commission)"
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start Your Reselling Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Simple, transparent pricing with everything you need to succeed
          </p>
        </div>

        <motion.div 
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="p-8 sm:p-10">
              <h3 className="text-2xl font-semibold text-gray-900">Premium Membership</h3>
              <p className="mt-4 text-gray-600">Everything you need for successful sneaker reselling</p>
              <div className="mt-4">
                <span className="text-5xl font-extrabold text-gray-900">$69.99</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </div>
              <Button className="mt-8 w-full" size="lg" asChild>
                <a 
                  href="https://whop.com/akchefs/?a=digitalartlab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </div>
            <div className="border-t border-gray-200 px-8 py-8 sm:px-10">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="ml-3 text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
