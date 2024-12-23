import { BeadPattern } from "@/components/BeadPattern";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-6">
      <div className="max-w-5xl mx-auto animate-fade-up">
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Bügelperlen-Muster Generator
          </div>
          <h1 className="text-4xl font-bold text-accent mb-4">
            Verwandle deine Bilder in Bügelperlen-Kunst
          </h1>
          <p className="text-accent/60 max-w-2xl mx-auto">
            Lade ein Bild hoch und erstelle ganz einfach ein Bügelperlen-Muster. Perfekt für kreative Projekte und Handarbeiten.
          </p>
        </header>
        
        <BeadPattern />
      </div>
    </div>
  );
};

export default Index;