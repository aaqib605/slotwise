import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mail, MessageSquare } from "lucide-react";

const featureItems = [
  {
    icon: Calendar,
    title: "Calendar Events",
    description: "Track and manage all your important events in one place",
  },
  {
    icon: Clock,
    title: "Smart Reminders",
    description: "Never forget important tasks with intelligent reminders",
  },
  {
    icon: Mail,
    title: "Email Management",
    description: "Draft and manage emails efficiently",
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description: "Stay connected with integrated messaging",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Slotwise
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Manage Your Time{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smartly
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Stay organized with calendars, reminders, emails, and messages all
            in one place. Never miss an important moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-3.5 border border-slate-400 text-white rounded-lg font-semibold hover:bg-slate-700/50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {featureItems.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:bg-slate-800/80 group"
              >
                <div className="bg-linear-to-br from-blue-500/20 to-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12 text-center backdrop-blur">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get organized?
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Join us today and start managing your time more effectively.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-400">
          <p>&copy; 2025 Slotwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
