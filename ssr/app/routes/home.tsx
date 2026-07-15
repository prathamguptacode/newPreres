import { useEffect } from "react";
import { HeroParallax } from "../../components/ui/hero-parallax";
import Scrollreveal from "../components/Scrolltext"
import Signup from "../components/Signup"
import type { Route } from "./+types/home";
import { useInView } from "react-intersection-observer"
import api from "../api"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Newspaper" },
    { name: "description", content: "Welcome to your newspaper!" },
  ];
}
const products = [
  {
    title: "",
    link: "",
    thumbnail: "./r1.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "./r3.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "./r4.png"
  },

  {
    title: "",
    link: "",
    thumbnail: "./r2.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "./r6.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "./r5.png"
  },

  {
    title: "",
    link: "",
    thumbnail: "r8.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r9.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "./r10.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r11.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r12.png"
  },

  {
    title: "",
    link: "",
    thumbnail: "r14.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r13.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r11.png"
  },
  {
    title: "",
    link: "",
    thumbnail: "r12.png"
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
        News, Designed for Humans by Humans.

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
