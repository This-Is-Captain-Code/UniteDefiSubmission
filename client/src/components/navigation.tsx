import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-inch-dark dark:text-white">SuiBridge</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('live-swaps')}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
            >
              Live Swaps
            </button>
            <button 
              onClick={() => scrollToSection('technology')}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('developers')}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
            >
              Developers
            </button>
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90"
              onClick={() => {
                const tradingElement = document.getElementById('trading-interface');
                if (tradingElement) {
                  tradingElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Swapping
            </Button>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-inch-blue transition-colors py-2"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('technology')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-inch-blue transition-colors py-2"
                  >
                    Technology
                  </button>
                  <button 
                    onClick={() => scrollToSection('live-swaps')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-inch-blue transition-colors py-2"
                  >
                    Live Swaps
                  </button>
                  <button 
                    onClick={() => scrollToSection('developers')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-inch-blue transition-colors py-2"
                  >
                    Developers
                  </button>
                  <Button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-full"
                    onClick={() => {
                      const tradingElement = document.getElementById('trading-interface');
                      if (tradingElement) {
                        tradingElement.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsOpen(false);
                    }}
                  >
                    Start Swapping
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}