import AnimatedSection from './../components/AnimatedSection';
import BackgroundBeamsWithCollision from './../components/BackgroundBeamsWithCollision';
import { ArrowRight } from 'lucide-react';


export default function HeroSection() {
    return (
      <BackgroundBeamsWithCollision>
        <div className="relative z-10 py-20 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-bold mb-4 text-primary">Transform Your Business with Our SaaS</h1>
            <p className="text-xl mb-8 text-primary-foreground">Streamline operations, boost productivity, and drive growth</p>
            <button className="btn btn-primary btn-lg animate-pulse">
              Get Started <ArrowRight className="ml-2" />
            </button>
          </AnimatedSection>
        </div>
      </BackgroundBeamsWithCollision>
    )
  }