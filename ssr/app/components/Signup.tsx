import React, { useRef } from "react";
import { BackgroundBeams } from "../../components/ui/background-beams";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { z } from "zod"
import api from "../api"

export default function BackgroundBeamsDemo() {

  const inRef = useRef<HTMLInputElement>(null)

  const emailSch = z.object({
    email: z.email()
  })

  async function submit() {
    const str = inRef.current?.value
    if (str) {
      const val = emailSch.safeParse({ email: str })
      if (val.success == false) {
        toast.error("Invalid email")
        return
      }
      try {
        await api.post("/newsletter/collect", { email: val.data.email })
        if (inRef.current) {
          inRef.current.value = ""
        }
        return toast.success("You joined newsletter successfully", { position: "top-center" })
      } catch {
        return toast.warning("Something went wrong", { position: "top-center" })
      }
    }
    else {
      toast.error("Email field is empty")
    }
  }




  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center antialiased px-4">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="relative z-10 bg-gradient-to-b from-neutral-100 to-neutral-300 bg-clip-text px-2 sm:px-4 md:px-8 text-center font-sans text-4xl font-bold text-transparent sm:text-5xl md:text-7xl">
          Join our Newsletter
        </h2>

        <p className="mt-4 px-2 sm:px-4 md:px-8 text-center text-sm text-neutral-300 sm:text-base">
          Get early access to a new era of news The Tulsi News. And as a newsletter subscriber you get to talk directly with developers and journalist in the team in case of any issue or you want to add any suggestion. Over 500 people are already joined us.
        </p>

        <div className="mt-8 flex flex-col gap-4 px-2 sm:px-4 md:flex-row md:px-8">
          <Input
            placeholder="youremail@email.com"
            className="z-10 h-12 flex-1 py-3 px-2"
            ref={inRef}
          />

          <Button
            variant="outline"
            className="h-12 w-full md:w-auto px-8 z-10"
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      </div>

      <BackgroundBeams />
    </div>
  );
}
