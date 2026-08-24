import { HeroParallax } from "../../components/ui/hero-parallax";
import Scrollreveal from "../components/Scrolltext"
import Signup from "../components/Signup"
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The Tulsi" },
    { name: "description", content: "Welcome to a new ads free news experience!" },
  ];
}
const products = [
  {
    title: "Art",
    thumbnail: "./r1.webp"
  },
  {
    title: "Fair",
    thumbnail: "./r3.webp"
  },
  {
    title: "Design",
    thumbnail: "./r4.webp"
  },

  {
    title: "Truth",
    thumbnail: "./r2.webp"
  },
  {
    title: "Society",
    thumbnail: "./r6.webp"
  },
  {
    title: "Patriot",
    thumbnail: "./r5.webp"
  },

  {
    title: "Respect",
    thumbnail: "r8.webp"
  },
  {
    title: "Reflection",
    thumbnail: "r9.webp"
  },
  {
    title: "Focused",
    thumbnail: "./r10.webp"
  },
  {
    title: "Imapact",
    thumbnail: "r11.webp"
  },
  {
    title: "Timeliness",
    thumbnail: "r12.webp"
  },

  {
    title: "Novelty",
    thumbnail: "r14.webp"
  },
  {
    title: "Facts",
    thumbnail: "r13.webp"
  },
  {
    title: "Precise",
    thumbnail: "r11.webp"
  },
  {
    title: "Voice",
    thumbnail: "r12.webp"
  },
];

export default function Home() {


  return <main>
    <article>
      <HeroParallax products={products} />
    </article>
    <article className="py-100 px-8 sm:px-16 pb-40 mx-auto max-w-[1600px] " >
      <Scrollreveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={3}
        blurStrength={4}
      >
        The Tulsi News, Designed for Humans by Humans.

        We believe the experience of reading news matters just as much as the news itself.

        For too long, news websites have optimized for clicks instead of readers. Every decision has been driven by advertising, engagement metrics, and endless distractions—not by the people trying to stay informed.

        We're taking a different path.

        Our obsession is design. Every interaction, every screen, every line of text is crafted to feel simple, fast, and intentional. We believe technology should disappear into the background, allowing journalism to take center stage.

        We don't want people to remember our interface.

        We want them to remember how it felt focused and effortless.

        That's the experience we're building. One that respects your time, values your attention, and makes reading the news something you actually look forward to.

      </Scrollreveal>
    </article>
    <article >
      <Signup />
    </article>
  </main >
}
