import Image from "next/image"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "About Us - Sajivan Ayurveda",
  description:
    "Learn about Sajivan Ayurveda, our mission, values, and journey in providing authentic Ayurvedic products.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="About Sajivan Ayurveda" description="Our journey in the ocean of Ayurveda" />

      <main className="flex-grow">
        {/* Our Story */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Sajivan Ayurveda was founded in 2010 with a simple yet profound mission: to bring the ancient wisdom
                  of Ayurveda to the modern world in its most authentic form.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founder, Dr. Rajesh Sharma, a renowned Ayurvedic practitioner with over 30 years of experience,
                  recognized the growing disconnect between traditional Ayurvedic practices and their modern
                  interpretations. He envisioned a brand that would bridge this gap, offering products that honor the
                  traditional principles while meeting contemporary standards of quality and efficacy.
                </p>
                <p className="text-muted-foreground">
                  The name "Sajivan" combines "Sa" (with) and "Jivan" (life), embodying our philosophy that Ayurveda is
                  not just a system of medicine but a way of life that promotes holistic well-being.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sajivan Ayurveda founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              "To preserve and promote the authentic wisdom of Ayurveda by creating pure, effective products that
              enhance the health and well-being of people worldwide, while honoring the traditions and sustainability of
              our sources."
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  We adhere to traditional Ayurvedic formulations and methods, ensuring our products deliver the true
                  benefits of this ancient science.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Purity</h3>
                <p className="text-muted-foreground">
                  We source the highest quality herbs and ingredients, free from harmful chemicals and additives, to
                  create products that are pure and safe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are committed to sustainable practices in sourcing, production, and packaging to minimize our
                  environmental impact.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-muted-foreground">
                  We believe in empowering our customers with knowledge about Ayurveda and how to integrate its
                  principles into modern life for optimal health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sourcing ingredients"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ethical Sourcing</h3>
                <p className="text-muted-foreground">
                  We carefully select herbs and ingredients from trusted farmers who follow sustainable and ethical
                  practices, ensuring the highest quality and purity.
                </p>
              </div>

              <div className="text-center">
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Traditional processing"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Traditional Processing</h3>
                <p className="text-muted-foreground">
                  Our products are crafted using traditional Ayurvedic methods, respecting the time-honored processes
                  that maximize the potency and efficacy of each ingredient.
                </p>
              </div>

              <div className="text-center">
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Quality testing"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rigorous Testing</h3>
                <p className="text-muted-foreground">
                  Every batch of our products undergoes comprehensive testing for purity, potency, and safety, ensuring
                  that you receive only the best quality Ayurvedic products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Rajesh Sharma",
                  role: "Founder & Chief Ayurvedic Practitioner",
                  bio: "With over 30 years of experience in Ayurvedic medicine, Dr. Sharma leads our product development and ensures adherence to traditional principles.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Dr. Priya Patel",
                  role: "Head of Research & Development",
                  bio: "Dr. Patel combines her expertise in modern pharmacology with deep knowledge of Ayurveda to create innovative yet authentic formulations.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Anita Desai",
                  role: "Sustainability Director",
                  bio: "Anita ensures our sourcing and production practices are environmentally responsible and support the communities we work with.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Vikram Singh",
                  role: "Quality Assurance Manager",
                  bio: "Vikram oversees our rigorous testing processes, ensuring every product meets our high standards for purity, potency, and safety.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="relative h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

