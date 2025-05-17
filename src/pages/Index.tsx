
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Code,
  Cpu, 
  MessageSquare, 
  FileText, 
  Mic,
  RefreshCw,
  Lightbulb,
  UserRound,
  Zap,
  ChevronsUpDown,
  Boxes
} from "lucide-react";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const features = [
    {
      icon: <Boxes className="h-6 w-6" />,
      title: "Multi-Model Integration",
      description: "Connect with all major AI models including OpenAI, Google, DeepSeek, Mistral, Meta, and more in one interface."
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice Input",
      description: "Transcribe your voice into text for a more natural interaction with AI models."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Summary Generation",
      description: "Get comparative summaries of responses from different models to extract insights."
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Continuous Integration",
      description: "Seamlessly add support for new AI models as they become available."
    },
    {
      icon: <UserRound className="h-6 w-6" />,
      title: "Dynamic Roles",
      description: "Configure audience and role settings for each AI model to get personalized responses."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "User-Friendly Interface",
      description: "Intuitive design makes complex AI interactions simple and accessible."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Responses",
      description: "Get instant feedback from multiple AI models simultaneously."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Personalized Outputs",
      description: "Tailor AI outputs to your specific needs with customizable parameters."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Extensibility",
      description: "Built with a modular architecture that allows for easy extensions and modifications."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Future-Ready and Scalable",
      description: "Designed to grow and adapt as AI technology evolves and improves."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/placeholder.svg"
              alt="Synapsify Logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">SYNAPSIFY.AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/ai-interface" className="text-foreground hover:text-primary transition-colors">
              AI Interface
            </Link>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#why-us" className="text-foreground hover:text-primary transition-colors">
              Why Us?
            </a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to <span className="text-primary">SYNAPSIFY.AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground/80"
          >
            Your ultimate platform for accessing and comparing multiple AI models in one place. Get insights from OpenAI, Google, DeepSeek, Mistral, Meta, and more — all through a unified, intuitive interface.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/30"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              asChild
            >
              <Link to="/ai-interface" className="flex items-center gap-2">
                Get Started
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronsUpDown className="h-4 w-4 rotate-90" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FEATURES</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover how Synapsify.AI transforms your interaction with artificial intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 md:py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">WHY US?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              What makes Synapsify.AI different from other AI platforms?
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Why create this when ChatGPT already exists?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70">
                  <p className="mb-2">Unlike single-model platforms like ChatGPT, Synapsify.AI offers:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Side-by-side comparison of responses from different AI models</li>
                    <li>Integrated analysis and summary of multiple AI outputs</li>
                    <li>Full customization of model parameters and contexts</li>
                    <li>Specialized handling for different file types per model capability</li>
                    <li>The ability to identify strengths and weaknesses across models</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Why build this when other AI chatbot platforms exist?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70">
                  <p className="mb-2">Synapsify.AI stands out from other platforms by offering:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>A unified API for accessing disparate AI systems</li>
                    <li>Dynamic role and audience configuration for each model</li>
                    <li>Advanced summarization of cross-model outputs</li>
                    <li>Open architecture allowing users to add new models</li>
                    <li>No vendor lock-in to a single AI provider</li>
                    <li>Community-driven approach to AI integration</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 mt-auto border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/60">
            &copy; {new Date().getFullYear()} Synapsify.AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
