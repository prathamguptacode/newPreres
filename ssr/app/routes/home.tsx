import { useEffect } from "react";
import { HeroParallax } from "../../components/ui/hero-parallax";
import Scrollreveal from "../components/Scrolltext"
import Signup from "../components/Signup"
import type { Route } from "./+types/home";
import { useInView } from "react-intersection-observer"
import api from "../api"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Tulsi News" },
    { name: "description", content: "Welcome to a new ads free news experience!" },
  ];
}
const products = [
  {
    title: "",
    thumbnail: "./r1.webp"
  },
  {
    title: "",
    thumbnail: "./r3.webp"
  },
  {
    title: "",
    thumbnail: "./r4.webp"
  },

  {
    title: "",
    thumbnail: "./r2.webp"
  },
  {
    title: "",
    thumbnail: "./r6.webp"
  },
  {
    title: "",
    thumbnail: "./r5.webp"
  },

  {
    title: "",
    thumbnail: "r8.webp"
  },
  {
    title: "",
    thumbnail: "r9.webp"
  },
  {
    title: "",
    thumbnail: "./r10.webp"
  },
  {
    title: "",
    thumbnail: "r11.webp"
  },
  {
    title: "",
    thumbnail: "r12.webp"
  },

  {
    title: "",
    thumbnail: "r14.webp"
  },
  {
    title: "",
    thumbnail: "r13.webp"
  },
  {
    title: "",
    thumbnail: "r11.webp"
  },
  {
    title: "",
    thumbnail: "r12.webp"
  },
];

export default function Home() {


  const { ref: heroRef, inView: heroIn } = useInView()
  const { ref: talkRef, inView: talkIn } = useInView()
  const { ref: contactRef, inView: contanctIn } = useInView()

  useEffect(() => {
    (async () => {
      if (heroIn) {
        await api.get("/stats/hero")
      }
      if (talkIn) {
        await api.get("/stats/talk")
      }
      if (contanctIn) {
        await api.get("/stats/contact")
      }
    })()
  }, [heroIn, talkIn, contanctIn])




  return <div>
    <div ref={heroRef}>
      <HeroParallax products={products} />
    </div>
    <div className="py-100 px-8 sm:px-16 pb-40" ref={talkRef}>
      <Scrollreveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={4}
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
    </div>
    <div ref={contactRef}>
      <Signup />
    </div>
  </div>
}
