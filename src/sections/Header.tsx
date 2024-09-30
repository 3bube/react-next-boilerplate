export default function Header() {
    return (
      <div className="flex p-4 justify-between items-center absolute top-0 left-0 right-0 z-10">
        <div className="text-2xl font-bold text-primary">SaaSLogo</div>
        <nav>
          <div className="flex space-x-4">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </nav>
      </div>
    )
  }