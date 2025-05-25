
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Users,
  Brain,
  Target,
  CheckCircle,
  Star
} from "lucide-react";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Conversational AI",
      description: "Have natural conversations with multiple AI models simultaneously and compare their responses in real-time"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Get instant responses from the world's most advanced AI models including GPT, Gemini, Claude, and more"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and secure. We prioritize your privacy and never store sensitive data"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Access",
      description: "Access multiple AI providers through one unified interface without managing separate subscriptions"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Smart Comparison",
      description: "Automatically compare responses from different AI models to get the best insights for your queries"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision Tuning",
      description: "Fine-tune each AI model with specific roles and audiences for more targeted and relevant responses"
    }
  ];

  const benefits = [
    "Compare multiple AI responses side-by-side",
    "Save time with unified interface",
    "Get better results with model diversity",
    "No need for multiple AI subscriptions",
    "Advanced conversation history",
    "Export and share conversations"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Synapsify has transformed how I research and brainstorm. Having multiple AI perspectives in one place is incredibly valuable.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      content: "The ability to compare code solutions from different AI models has made me a more efficient developer.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Researcher",
      content: "Perfect for academic research. I can validate findings across multiple AI models and get more comprehensive insights.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header/Nav */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Synapsify</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/try-chat" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Try Chat
            </Link>
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Features
            </a>
            <a href="#benefits" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Benefits
            </a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Reviews
            </a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              The Future of AI
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the power of multiple AI models in one unified interface. Compare responses from ChatGPT, Gemini, Claude, and more to get the best insights for any question.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              asChild
            >
              <Link to="/try-chat" className="flex items-center gap-2">
                Start Chatting Now
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-secondary/50 transition-all"
              asChild
            >
              <a href="#features">
                Learn more
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-background/50 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-foreground/60">Synapsify Chat Interface</span>
              </div>
              <div className="text-left space-y-4">
                <div className="bg-primary/10 rounded-lg p-4 text-sm border-l-4 border-primary">
                  <span className="text-foreground/60">You:</span> What's the most effective way to learn machine learning in 2024?
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4 text-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-primary font-semibold">ChatGPT-4</span>
                    </div>
                    <p>Start with Andrew Ng's Machine Learning course on Coursera. Focus on fundamentals like linear regression, then move to deep learning frameworks like TensorFlow...</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 font-semibold">Gemini Pro</span>
                    </div>
                    <p>I'd recommend a project-based approach. Start with a real dataset, perhaps from Kaggle, and work backwards to learn the concepts you need...</p>
                  </div>
                </div>
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-primary">
                    + Add more AI models to compare
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Everything you need to harness the collective intelligence of multiple AI models.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/60 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="flex justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-foreground/70 text-center leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Synapsify?</h2>
              <p className="text-xl text-foreground/70">
                Join thousands of professionals who are getting better results with AI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/20 border"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-foreground/70">
              Real feedback from professionals using Synapsify daily.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/60 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Supercharge Your AI Experience?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Join the AI revolution. Compare, analyze, and get better results with multiple AI models in one powerful interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/try-chat" className="flex items-center gap-2">
                  Try Synapsify Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Users className="h-4 w-4" />
                <span>Join 10,000+ users already using Synapsify</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Synapsify</span>
              </div>
              <p className="text-foreground/60 mb-4 max-w-md">
                The most powerful AI conversation platform. Compare multiple AI models, get better insights, and unlock new possibilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-foreground/60">
                <li><Link to="/try-chat" className="hover:text-foreground transition-colors">Try Chat</Link></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-foreground/60">
              &copy; {new Date().getFullYear()} Synapsify.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
