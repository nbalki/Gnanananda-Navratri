import React, { useEffect, useMemo, useState } from "react";

const IST_OFFSET_MIN = 5 * 60 + 30; // +05:30
const toIST = (d: Date) => new Date(d.getTime() + (IST_OFFSET_MIN + d.getTimezoneOffset()) * 60000);

const START_NAVRATRI_IST = new Date("2025-09-22T06:00:00+05:30");
const END_NAVRATRI_IST = new Date("2025-10-01T21:00:00+05:30");

const deviNames = [
  { key: "Shailaputri", ta: "சைலபுத்ரி" },
  { key: "Brahmacharini", ta: "பிரம்மச்சாரிணி" },
  { key: "Chandraghanta", ta: "சந்திரகண்டா" },
  { key: "Kushmanda", ta: "குஷ்மாண்டா" },
  { key: "Skandamata", ta: "ஸ்கந்தமாதா" },
  { key: "Katyayani", ta: "காத்தியாயனி" },
  { key: "Kalaratri", ta: "காளராத்திரி" },
  { key: "Mahagauri", ta: "மகாகௌரி" },
  { key: "Siddhidatri", ta: "சித்திதாத்ரி" },
];

const palette = {
  kumkum: "#9b1c1c",
  turmeric: "#f59e0b",
  gopi: "#e5e7eb",
  peacock: "#0e7490",
  lotus: "#9d174d",
  deepIndigo: "#1f1b3a",
} as const;

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const ms = Math.max(0, toIST(target).getTime() - toIST(now).getTime());
  const totalSecs = Math.floor(ms / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  return { days, hours, minutes, seconds, done: ms <= 0 };
}

const Stat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center min-w-[6rem]">
    <div className="text-3xl font-bold tracking-tight">{value}</div>
    <div className="text-xs uppercase tracking-widest opacity-80">{label}</div>
  </div>
);

const SacredBackdrop: React.FC = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vmax] h-[120vmax] rounded-full opacity-30"
         style={{ background: `radial-gradient(closest-side, ${palette.turmeric}, transparent 70%)` }} />
    <div className="absolute inset-0 opacity-20"
         style={{ backgroundImage: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.2) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35))" }} />
  </div>
);

export default function NavratriPage() {
  const beforeNav = useCountdown(START_NAVRATRI_IST);
  const duringNav = useCountdown(END_NAVRATRI_IST);
  const period = beforeNav.done ? (duringNav.done ? "post" : "during") : "pre";

  const dayRows = useMemo(() => {
    const rows: Array<{ idx: number; date: Date; devi: (typeof deviNames)[number] }> = [];
    for (let i = 0; i < 9; i++) {
      const d = new Date(START_NAVRATRI_IST);
      d.setDate(d.getDate() + i);
      rows.push({ idx: i + 1, date: d, devi: deviNames[i] });
    }
    return rows;
  }, []);

  const dailyProgramme = [
    { time: "4:00 am", en: "Daily Prayer (Dinasari Vazhipadu)", ta: "தினசரி வழிபாடு" },
    { time: "4:30 am", en: "Gho Pooja", ta: "பசு பூஜை" },
    { time: "5:30 am", en: "Deepa Jyothi", ta: "தீப ஜ்யோதி" },
    { time: "6:00 am", en: "Ganapathi Homam", ta: "கணபதி ஹோமம்" },
    { time: "7:15 am", en: "Paada Pooja", ta: "பாத பூஜை" },
    { time: "8:30 am", en: "Adhistanam (Morning)", ta: "அதிஷ்டானம் (காலை)" },
    { time: "10:00 am", en: "Thulabaram", ta: "துலாபாரம்" },
    { time: "5:00 pm", en: "Mani Mandapam (Vishnu Sahasranama)", ta: "மணி மண்டபம்" },
    { time: "6:00 – 6:45 pm", en: "Adhistanam Pooja (Evening)", ta: "அதிஷ்டானம் (மாலை)" },
    { time: "6:45 – 7:00 pm", en: "Makara Vilakku & Maha Aarthi", ta: "மகர விளக்கு & மஹா ஆரத்தி" },
    { time: "7:00 – 7:30 pm", en: "Vadamalai (Gnana Anjaneyar & Gnana Bhairavar)", ta: "வடமாலை" },
  ];

  return (
    <main className="min-h-dvh text-white" style={{ background: `linear-gradient(180deg, ${palette.deepIndigo}, #000)` }}>
      <SacredBackdrop />

      <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10">🕉️</span>
            <div className="leading-tight">
              <div className="font-semibold">Sri Gnanananda Tapovanam</div>
              <div className="text-[11px] opacity-70">Thirukovilur · Tamil Nadu</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
            <a href="#schedule" className="hover:opacity-100">Daily Programme</a>
            <a href="#navratri" className="hover:opacity-100">Navratri 2025</a>
            <a href="#seva" className="hover:opacity-100">Seva & Pooja</a>
            <a href="#visit" className="hover:opacity-100">Visit</a>
            <a href="#contact" className="hover:opacity-100">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://pooja.gnanananda.org" target="_blank" rel="noreferrer" className="px-3 py-2 text-sm rounded-xl bg-white text-black font-semibold hover:opacity-90">Online Pooja Booking</a>
          </div>
        </div>
      </header>

/* Hero — full-bleed image background with left content + right card */
<section className="relative min-h-[56vh] md:min-h-[72vh]">
  {/* Background image (webp fallback to png) */}
  <picture className="absolute inset-0 -z-10 block">
    <source srcSet="/hero.webp" type="image/webp" />
    {/* Use leading slash — Vite serves files from /public */}
    <img
      src="/hero.png?v=1"
      alt="Navratri Golu festival hero"
      loading="eager"
      className="w-full h-full object-cover object-center"
      style={{ objectPosition: "40% 48%" }} /* tweak this to align subject */
    />
  </picture>

  {/* Readability gradient + subtle vignette */}
  <div
    aria-hidden
    className="absolute inset-0 -z-5"
    style={{
      background:
        "linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.45) 35%, rgba(0,0,0,0.55) 100%)",
      mixBlendMode: "multiply",
    }}
  />

  <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
    {/* Left: Title, quote, countdown, CTAs */}
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]">
        Navratri 2025 at{" "}
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(90deg,#f59e0b,#9b1c1c)" }}
        >
          Sri Gnanananda Tapovanam
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-sm md:text-lg opacity-90">
        “Guru Bhakti would help us to do service with humility, destroy our ego and be a constant source of inner strength.”
      </p>
      <p className="mt-2 text-xs opacity-70">— A guiding thought cherished at Tapovanam</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {period === "pre" && (
          <>
            <Stat label="Days" value={beforeNav.days} />
            <Stat label="Hours" value={beforeNav.hours} />
            <Stat label="Minutes" value={beforeNav.minutes} />
            <Stat label="Seconds" value={beforeNav.seconds} />
            <span className="text-sm opacity-80 w-full md:w-auto mt-2 md:mt-0">
              until Navratri begins (22 Sept, 2025)
            </span>
          </>
        )}
        {period === "during" && (
          <>
            <Stat label="Days Left" value={duringNav.days} />
            <Stat label="Hours" value={duringNav.hours} />
            <Stat label="Minutes" value={duringNav.minutes} />
            <Stat label="Seconds" value={duringNav.seconds} />
            <span className="text-sm opacity-80">of Navratri · Maha Navami on 1 Oct</span>
          </>
        )}
        {period === "post" && <span className="text-sm opacity-80">Navratri 2025 has concluded. Jai Maa!</span>}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#navratri" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15">
          View Schedule
        </a>
        <a href="#seva" className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90">
          Offer Seva
        </a>
      </div>
    </div>

    {/* Right: Festival window card */}
    <aside className="rounded-3xl bg-white/6 border border-white/8 p-6 md:p-8 shadow-2xl backdrop-blur-sm text-white">
      <div className="text-xs uppercase tracking-widest opacity-80">Festival Window</div>
      <div className="mt-2 text-xl font-semibold">Mon, 22 Sept → Wed, 1 Oct (Vijayadashami: Thu, 2 Oct)</div>
      <ul className="mt-4 space-y-2 text-sm opacity-90 list-disc list-inside">
        <li>Ghatasthapana & Shailaputri Puja — 22 Sept (Morning)</li>
        <li>Durga Ashtami — 29 Sept · Maha Navami — 30 Sept</li>
        <li>Vijayadashami Deepotsava — 2 Oct (Ashram timings TBD)</li>
      </ul>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a href="https://pooja.gnanananda.org" target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl bg-white text-black font-semibold text-center">
          Book Pooja
        </a>
        <a href="#contact" className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-center">
          Talk to Office
        </a>
      </div>
    </aside>
  </div>
</section>

      <section id="navratri" className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Nine Divine Nights — Day‑wise Darshan</h2>
          <p className="mt-2 text-sm opacity-80">Subject to Ashram updates. Please reconfirm onsite / via office for special homams and alankarams.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dayRows.map(({ idx, date, devi }) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase opacity-70">Day {idx}</span>
                  <span className="text-sm opacity-80">{toIST(date).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" })}</span>
                </div>
                <div className="mt-2 text-xl font-semibold">Maa {devi.key}</div>
                <div className="text-sm opacity-80">{devi.ta}</div>
                <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-white/30 to-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Daily Programme (தினசரி நிகழ்ச்சி)</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {dailyProgramme.map((row, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="w-24 shrink-0 text-right font-semibold">{row.time}</div>
                <div>
                  <div className="font-medium">{row.en}</div>
                  <div className="text-sm opacity-80">{row.ta}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs opacity-70">Timings may shift on special festival days.</p>
        </div>
      </section>

      <section id="seva" className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold">Offer Seva · Make a Sankalpa</h2>
            <p className="mt-2 text-sm opacity-90">Participate through Pooja bookings, Annadanam, Flowers/Deepam offerings, and volunteer service.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="px-5 py-3 rounded-xl bg-white text-black font-semibold" href="https://pooja.gnanananda.org" target="_blank" rel="noreferrer">Online Pooja Booking</a>
              <a className="px-5 py-3 rounded-xl bg-white/10 border border-white/20" href="#contact">Annadanam / Enquiries</a>
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Plan Your Visit (தரிசனம்)</h2>
          <div className="mt-4 grid lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">Location</div>
              <p className="mt-1 text-sm opacity-90">On the Tirukovilur – Tiruvannamalai bus route, near Kuladeepamangalam, Tamil Nadu 605756.</p>
              <div className="mt-3">
                <a className="text-sm underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Gnanananda+Tapovanam+Thirukovilur">Open in Google Maps</a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">Visitor Notes</div>
              <ul className="mt-1 text-sm opacity-90 list-disc list-inside space-y-1">
                <li>Simple, modest attire requested within ashram premises.</li>
                <li>Maintain silence near Adhistanam; follow volunteer guidance.</li>
                <li>Photography may be restricted in certain sanctum areas.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">First‑time Devotees</div>
              <p className="mt-1 text-sm opacity-90">Newcomers are welcome. Please arrive a little early for morning darshan and pooja tickets.</p>
              <div className="mt-3"><a className="text-sm underline" href="#contact">Call the office for guidance</a></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Contact the Ashram Office</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm opacity-80">Phone</div>
              <div className="mt-1 font-semibold space-y-1">
                <a href="tel:+917598365175" className="block">+91 75983 65175</a>
                <a href="tel:+917598375175" className="block">+91 75983 75175</a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm opacity-80">Email</div>
              <a href="mailto:office@gnanananda.org" className="mt-1 block font-semibold">office@gnanananda.org</a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm opacity-80">Useful Links</div>
              <div className="mt-1 flex flex-col gap-2 text-sm">
                <a className="underline" href="https://gnanananda.org" target="_blank" rel="noreferrer">Official Website</a>
                <a className="underline" href="https://pooja.gnanananda.org" target="_blank" rel="noreferrer">Online Pooja Booking</a>
                <a className="underline" href="https://gnanananda.org/daily-programme/" target="_blank" rel="noreferrer">Daily Programme</a>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs opacity-70">For festival‑specific homams/alankarams, final timings will be announced by the Ashram office.</p>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm opacity-80">
          <div>Sri Gnanananda Tapovanam · Tirukovilur, Tamil Nadu</div>
          <div className="mt-1">© {new Date().getFullYear()} G. Thapovanam Sri Gnanananda Trust</div>
        </div>
      </footer>
    </main>
  );
}
