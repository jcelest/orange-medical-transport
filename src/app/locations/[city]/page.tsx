import Link from "next/link";
import Image from "next/image";

const CITIES: Record<
  string,
  { name: string; displayName: string; distance: string }
> = {
  orlando: { name: "Orlando", displayName: "Orlando", distance: "0" },
  kissimmee: { name: "Kissimmee", displayName: "Kissimmee", distance: "20" },
  "winter-park": { name: "Winter Park", displayName: "Winter Park", distance: "10" },
  sanford: { name: "Sanford", displayName: "Sanford", distance: "25" },
  clermont: { name: "Clermont", displayName: "Clermont", distance: "25" },
};

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = CITIES[city];
  if (!cityData) return { title: "Medical Transport" };

  const title = `${cityData.displayName} Medical Transport | Wheelchair & NEMT Services | Orange Medical Transport`;
  const description = `Non-emergency medical transportation in ${cityData.displayName}, FL. Wheelchair transport, dialysis rides, doctor appointments. ADA accessible. Call 407-429-1209. Serving ${cityData.displayName} and Central Florida.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CityLandingPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = CITIES[city];
  if (!cityData) return null;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[380px] overflow-hidden bg-[#1a6b1a] sm:min-h-[450px] md:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-van.png"
            alt={`Orange Medical Transport wheelchair accessible van serving ${cityData.displayName}`}
            fill
            className="object-cover object-right"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a6b1a]/95 via-[#228b22]/80 to-transparent" />
        <div className="absolute inset-0 bg-[#1a6b1a]/60" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-16 sm:min-h-[450px] sm:px-6 sm:py-24 md:min-h-[500px] md:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
              Non-Emergency Medical Transport in {cityData.displayName}
            </h1>
            <p className="mt-4 text-base text-white/90 sm:mt-6 sm:text-lg">
              Wheelchair transportation, dialysis rides, and doctor appointment transport
              in {cityData.displayName} and Central Florida. ADA accessible, reliable NEMT.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
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
                Call 407-429-1209
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content - Keyword rich */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            {cityData.displayName} Non-Emergency Medical Transportation (NEMT)
          </h2>
          <p className="mt-4 text-zinc-600">
            Orange Medical Transport provides <strong>medical transportation in {cityData.displayName}</strong> and
            throughout Central Florida. Our <strong>wheelchair transport</strong> and{" "}
            <strong>non-emergency medical transport</strong> services help patients get to
            dialysis appointments, doctor visits, hospital discharges, and rehab centers
            safely and on time.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-zinc-900">
            Wheelchair Transportation {cityData.displayName} FL
          </h3>
          <p className="mt-2 text-zinc-600">
            Need <strong>wheelchair transportation near {cityData.displayName}</strong>? Our ADA
            accessible vans feature wheelchair lifts and securement systems. We serve
            seniors, disabled individuals, and anyone requiring <strong>handicapped
            transportation</strong> for medical appointments, dialysis treatment, or
            assisted living facility visits.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-zinc-900">
            Dialysis Transportation & Doctor Appointment Rides
          </h3>
          <p className="mt-2 text-zinc-600">
            Regular <strong>dialysis transportation</strong> and <strong>doctor appointment
            rides</strong> are essential for many {cityData.displayName} residents. We offer
            reliable <strong>hospital discharge transport</strong>, <strong>nursing home
            transport</strong>, and <strong>ambulatory transport</strong> throughout the
            greater Orlando area. Our <strong>senior transportation</strong> and{" "}
            <strong>stretcher transport</strong> services ensure comfortable, dignified
            travel for every passenger.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-zinc-900">
            Medical Ride Services in {cityData.displayName}
          </h3>
          <p className="mt-2 text-zinc-600">
            Looking for <strong>medical transportation near me</strong> in {cityData.displayName}?
            Orange Medical Transport is your trusted <strong>NEMT provider</strong> for
            Central Florida. We offer <strong>private pay medical transportation</strong> and
            work with healthcare facilities for <strong>Medicaid transportation services</strong>.
            Book your <strong>medical ride</strong> today—call 407-429-1209.
          </p>
        </div>
      </section>

      {/* Services with image */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            {cityData.displayName} Medical Transport Services
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/ford-transit-wheelchair.png"
                  alt={`Wheelchair accessible medical transport van serving ${cityData.displayName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#228b22]">
                  Wheelchair & ADA Transport
                </h3>
                <p className="mt-2 text-zinc-600">
                  Our wheelchair-accessible vans serve {cityData.displayName} with safe,
                  comfortable transport for dialysis, doctor appointments, and more.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/hero-van.png"
                  alt={`Orange Medical Transport NEMT services in ${cityData.displayName}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#228b22]">
                  Ambulatory & Stretcher Transport
                </h3>
                <p className="mt-2 text-zinc-600">
                Hospital discharge, rehab transport, and stretcher services for{" "}
                {cityData.displayName} and surrounding areas.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/book"
              className="flex min-h-[48px] items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 active:bg-orange-700"
            >
              Book {cityData.displayName} Transport
            </Link>
            <a
              href="tel:407-429-1209"
              className="flex min-h-[48px] items-center justify-center rounded-lg border-2 border-[#228b22] px-6 py-3 font-semibold text-[#228b22] hover:bg-[#228b22]/5 active:bg-[#228b22]/10"
            >
              407-429-1209
            </a>
          </div>
        </div>
      </section>

      {/* Local SEO footer */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900">
            Serving {cityData.displayName} & Central Florida
          </h2>
          <p className="mt-4 text-zinc-600">
            Orange Medical Transport provides non-emergency medical transportation,
            wheelchair transport, dialysis rides, and hospital discharge transport
            throughout {cityData.displayName}, Orlando, Kissimmee, Winter Park, Sanford,
            Clermont, and the greater Central Florida region. We&apos;re your trusted NEMT
            provider for safe, reliable medical rides.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-orange-500 font-medium hover:text-orange-600"
          >
            ← Back to Orange Medical Transport
          </Link>
        </div>
      </section>
    </div>
  );
}
