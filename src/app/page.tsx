import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[260px] overflow-hidden bg-[#1a6b1a] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-van.png"
            alt="Orange Medical Transport van"
            fill
            className="object-cover object-right"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a6b1a]/95 via-[#228b22]/80 to-transparent" />
        <div className="absolute inset-0 bg-[#1a6b1a]/60" />
        <div className="relative mx-auto flex min-h-[260px] max-w-7xl items-center px-4 py-8 sm:min-h-[380px] sm:px-6 sm:py-16 md:min-h-[450px] md:py-24 lg:min-h-[500px] lg:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
              Non-Emergency Medical Transport
            </h1>
            <p className="mt-2 text-sm text-white/90 sm:mt-6 sm:text-base md:text-lg">
              Safe, reliable transportation for doctor appointments, dialysis, and more.
              Serving Central Florida with care and comfort.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/book"
                className="flex min-h-[48px] min-w-[140px] items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-orange-600 active:bg-orange-700"
              >
                Book a Ride
              </Link>
              <a
                href="tel:407-429-1209"
                className="flex min-h-[48px] min-w-[140px] items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 active:bg-white/30"
              >
                Call now: 407-429-1209
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services banner */}
      <section className="border-t-4 border-[#1a6b1a] bg-[#228b22]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Reliable Medical Transport Services
            </h2>
            <p className="max-w-xl text-sm text-white/90 sm:text-base">
              Providing safe and efficient non-emergency medical transport for patients
              across the State, ensuring comfort and care during every journey.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <ServiceCard
            title="Ambulatory"
            description="We provide transportation throughout Central Florida to Malls, Restaurants, Salons, Doctors Offices, Assisted Living Facilities, Rehab Centers, Dialysis Treatment, and Family Functions."
            serviceType="ambulatory"
          />
          <ServiceCard
            title="Wheelchair"
            description="Orange Medical Transport provides wheelchair service to make transportation easier for our loved ones, elders, and those with mobility needs. Make your reservation now—a safe and enjoyable ride awaits."
            serviceType="wheelchair"
          />
          <ServiceCard
            title="Stretcher"
            description="Orange Medical Transport has the right equipment managed by the right team members to provide non-emergency medical stretcher transportation services to you and your loved ones."
            serviceType="stretcher"
          />
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-t-4 border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            Why Orange Medical Transport?
          </h2>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold text-[#228b22]">Expert Services</h3>
              <p className="mt-4 text-zinc-600">
                Moving around with medical conditions is made easy with Orange Medical
                Transport. Reliable, smooth, and safe rides—it&apos;s definitely a game
                changer. Don&apos;t worry, our services are unique and affordable.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold text-[#228b22]">Quality and Safety</h3>
              <p className="mt-4 text-zinc-600">
                With Orange Medical Transport, our loved ones can get around without
                frustration. We designed our vans thinking about you—they&apos;re equipped
                to serve you safely. Your comfortable ride is one phone call away.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/book"
              className="flex min-h-[48px] items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 active:bg-orange-700"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="flex min-h-[48px] items-center justify-center rounded-lg border-2 border-[#228b22] px-6 py-3 font-semibold text-[#228b22] hover:bg-[#228b22]/5 active:bg-[#228b22]/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <MiniService
            title="Doctor's Appointment"
            description="We make it easy for you and our loved ones, those with handicaps, and elders to get around without frustration."
          />
          <MiniService
            title="Hospital Discharge"
            description="We hired the right team members and have the right equipment to provide the best non-emergency stretcher service."
          />
          <MiniService
            title="Dialysis Treatment"
            description="We ensure complete coordination bedside-to-bedside, alleviating as much stress as possible for you and your loved ones."
          />
          <MiniService
            title="Airport Shuttle"
            description="Our vans are equipped with wheelchair lifts to serve safely those in need with the best, most comfortable, and enjoyable ride."
          />
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  serviceType,
}: {
  title: string;
  description: string;
  serviceType: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md active:scale-[0.99]">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-forest/10 to-orange-500/10 sm:h-48">
        {serviceType === "wheelchair" ? (
          <Image
            src="/images/ford-transit-wheelchair.png"
            alt="Wheelchair accessible Ford Transit van"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-6xl opacity-50">
            {serviceType === "ambulatory" && "🚐"}
            {serviceType === "stretcher" && "🛏️"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-zinc-600 sm:mt-3 sm:text-base">{description}</p>
        <Link
          href={`/book?service=${serviceType}`}
          className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

function MiniService({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
      <h3 className="font-semibold text-[#228b22]">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}
