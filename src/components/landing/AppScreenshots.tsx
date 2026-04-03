import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const screenshots = [
  {
    id: 1,
    title: "Profile Dashboard",
    description: "Manage all your social links",
  },
  {
    id: 2,
    title: "QR Code Generator",
    description: "Create your unique QR code",
  },
  {
    id: 3,
    title: "Analytics View",
    description: "Track your scan statistics",
  },
  {
    id: 4,
    title: "Social Connections",
    description: "Add unlimited profiles",
  },
  {
    id: 5,
    title: "Customization",
    description: "Personalize your page",
  },
];

const IPhoneFrame = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex-shrink-0 w-[280px] md:w-[320px]"
  >
    <div className="relative mx-auto w-[260px] md:w-[300px]">
      {/* iPhone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-gray-900 rounded-full z-10" />
          
          {/* Content */}
          <div className="h-full w-full flex items-center justify-center pt-12">
            {children}
          </div>
        </div>
      </div>
      
      {/* Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rounded-[3rem] pointer-events-none" />
    </div>
  </motion.div>
);

const ScreenContent = ({ title, description, index }: { title: string; description: string; index: number }) => {
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
  ];
  
  return (
    <div className="h-full w-full p-4 flex flex-col">
      {/* Mock Header */}
      <div className="flex items-center justify-between mb-4 mt-6">
        <div className="w-8 h-8 rounded-full bg-white/20" />
        <div className="w-16 h-4 rounded bg-white/20" />
        <div className="w-8 h-8 rounded-full bg-white/20" />
      </div>
      
      {/* Mock Profile */}
      <div className="flex flex-col items-center mb-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradients[index]} mb-2`} />
        <div className="w-24 h-3 rounded bg-white/30 mb-1" />
        <div className="w-16 h-2 rounded bg-white/20" />
      </div>
      
      {/* Mock Links */}
      <div className="space-y-2 flex-1">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center px-3 gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-white/20" />
            <div className="flex-1 h-2 rounded bg-white/20" />
          </div>
        ))}
      </div>
      
      {/* Label */}
      <div className="text-center py-4">
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-white/60 text-xs">{description}</p>
      </div>
    </div>
  );
};

export const AppScreenshots = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            App Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Beautiful, Intuitive Design
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience a seamless interface designed for the modern user
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-8 px-8 md:px-16 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {screenshots.map((screen, index) => (
              <div key={screen.id} className="snap-center">
                <IPhoneFrame index={index}>
                  <ScreenContent
                    title={screen.title}
                    description={screen.description}
                    index={index}
                  />
                </IPhoneFrame>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {screenshots.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
