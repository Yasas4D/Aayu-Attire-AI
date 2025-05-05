
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-8 text-primary">
          About Aayu Lookbook
        </h1>

        <section className="mb-12">
          <Image
            src="https://picsum.photos/1200/500?random=about-hero"
            alt="Brand Image"
            width={1200}
            height={500}
            className="w-full h-auto rounded-lg object-cover mb-8 shadow-md"
             data-ai-hint="fashion workshop design studio"
          />
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aayu Lookbook began with a simple idea: to create beautiful, high-quality clothing that empowers individuals to express their unique style. Born from a passion for design and a commitment to ethical practices, our brand, Aayu Attire, focuses on timeless pieces with a modern sensibility. We believe that fashion should be both inspiring and accessible, offering curated collections that blend comfort, elegance, and sustainability.
          </p>
           <p className="text-muted-foreground leading-relaxed mt-4">
            From our design studio to your wardrobe, every garment is crafted with care, attention to detail, and a deep respect for the environment and the people who make our clothes. Join us on our journey to redefine modern fashion.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to inspire confidence and self-expression through thoughtfully designed apparel. We strive to create clothing that not only looks good but feels good, crafted sustainably and ethically. We aim to build a community around shared values of creativity, quality, and conscious consumption.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Craftsmanship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We prioritize durable materials and meticulous construction in every piece.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sustainable Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Committed to reducing our environmental impact through responsible sourcing and production.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ethical Production</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ensuring fair labor practices and safe working conditions throughout our supply chain.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

         {/* Optional: Team Section */}
         {/* <section>
           <h2 className="text-2xl font-semibold mb-4 text-center">Meet the Team</h2>
           <div className="text-center text-muted-foreground">Team section coming soon...</div>
         </section> */}
      </div>
    </div>
  );
}
