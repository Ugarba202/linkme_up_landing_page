import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Marketing Manager",
    company: "TechStart Inc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "LinkMeUp completely transformed how I network at events. Instead of fumbling with business cards, I just show my QR code. It's so simple and professional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Content Creator",
    company: "YouTube • 500K Subscribers",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "As a creator, getting people to follow all my platforms was a nightmare. Now they scan once and see everything. My cross-platform follows increased by 40%!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Computer Science Student",
    company: "Stanford University",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Every career fair, every networking event - LinkMeUp is my secret weapon. Recruiters are always impressed by how tech-savvy it makes me look!",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "Freelance Designer",
    company: "Self-employed",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "I put my QR code on my business cards, portfolio, even my laptop sticker. Clients can instantly access my Dribbble, Behance, and LinkedIn. Game changer!",
    rating: 5,
  },
  {
    id: 5,
    name: "Jessica Williams",
    role: "Event Coordinator",
    company: "EventPro Solutions",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "We use LinkMeUp for all our speakers and attendees. It makes post-event networking so much easier. The analytics feature is incredibly useful too!",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our users have to say about LinkMeUp
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[350px]">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;
              
              return (
                <motion.div
                  key={testimonial.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? "-100%" : isNext ? "100%" : index < activeIndex ? "-200%" : "200%",
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="h-full bg-card rounded-3xl border border-border shadow-xl p-8 md:p-12 flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaQuoteLeft className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-foreground text-lg md:text-xl leading-relaxed flex-1">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-primary">{testimonial.company}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-6">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {["Google", "Meta", "Apple", "Stanford", "MIT"].map((company) => (
              <span
                key={company}
                className="text-xl md:text-2xl font-bold text-muted-foreground"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
