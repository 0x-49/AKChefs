import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Shield, Users } from "lucide-react";

const stats = [
  { label: "Success Rate", value: "97%", icon: TrendingUp, description: "Consistent success across all releases" },
  { label: "Active Members", value: "1000+", icon: Users, description: "Growing community of experts" },
  { label: "Average Profit", value: "$500+", icon: Sparkles, description: "Per successful release" },
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-[72px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              Master the Art of
              <span className="text-blue-600 block mt-2">Sneaker Reselling</span>
            </h1>
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>

          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join the elite community of sneaker resellers. Get access to custom monitors, 
            industry partnerships, and 24/7 expert support to maximize your profits.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="group relative overflow-hidden" asChild>
              <a 
                href="https://whop.com/akchefs/?a=digitalartlab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                Start Reselling Today 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <a href="#features" className="flex items-center">
                Explore Features
                <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                />
                <div className="relative z-10">
                  <stat.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}