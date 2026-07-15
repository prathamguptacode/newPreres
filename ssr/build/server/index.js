import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { Input } from "@base-ui/react/input";
import { z } from "zod";
import axios from "axios";
import { useInView } from "react-intersection-observer";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
			info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
			warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
			error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
			loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		toastOptions: { classNames: { toast: "cn-toast" } },
		...props
	});
};
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	},
	{
		rel: "icon",
		href: "icon.png"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(Toaster$1, { position: "top-center" }),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region components/ui/hero-parallax.tsx
var HeroParallax = ({ products }) => {
	const firstRow = products.slice(0, 5);
	const secondRow = products.slice(5, 10);
	const thirdRow = products.slice(10, 15);
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const springConfig = {
		stiffness: 300,
		damping: 30,
		bounce: 100
	};
	const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1e3]), springConfig);
	const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1e3]), springConfig);
	const rotateX = useSpring(useTransform(scrollYProgress, [0, .2], [15, 0]), springConfig);
	const opacity = useSpring(useTransform(scrollYProgress, [0, .2], [.2, 1]), springConfig);
	const rotateZ = useSpring(useTransform(scrollYProgress, [0, .2], [20, 0]), springConfig);
	const translateY = useSpring(useTransform(scrollYProgress, [0, .2], [-700, 500]), springConfig);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]",
		children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(motion.div, {
			style: {
				rotateX,
				rotateZ,
				translateY,
				opacity
			},
			className: "",
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: "flex flex-row-reverse space-x-reverse space-x-20 mb-20",
					children: firstRow.map((product) => /* @__PURE__ */ jsx(ProductCard, {
						product,
						translate: translateX
					}, product.title))
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "flex flex-row  mb-20 space-x-20 ",
					children: secondRow.map((product) => /* @__PURE__ */ jsx(ProductCard, {
						product,
						translate: translateXReverse
					}, product.title))
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "flex flex-row-reverse space-x-reverse space-x-20",
					children: thirdRow.map((product) => /* @__PURE__ */ jsx(ProductCard, {
						product,
						translate: translateX
					}, product.title))
				})
			]
		})]
	});
};
var Header = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0",
		children: [/* @__PURE__ */ jsxs("h1", {
			className: "text-4xl md:text-7xl font-bold dark:text-white",
			children: [
				"The Ultimate ",
				/* @__PURE__ */ jsx("br", {}),
				" ad-free ",
				/* @__PURE__ */ jsx("strong", { children: "FREE" }),
				" News"
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200",
			children: "We are building a beautiful Digital Newspaper which is free of ads and free of bloat, you find on Times of India Website. And the most amazing part is you dont have to pay anything extra to get started. We are a small team of passionate developers and journalist that love to build and write."
		})]
	});
};
var ProductCard = ({ product, translate }) => {
	return /* @__PURE__ */ jsxs(motion.div, {
		style: { x: translate },
		whileHover: { y: -20 },
		className: "group/product h-96 w-[30rem] relative shrink-0",
		children: [
			/* @__PURE__ */ jsx("a", {
				href: product.link,
				className: "block group-hover/product:shadow-2xl ",
				children: /* @__PURE__ */ jsx("img", {
					src: product.thumbnail,
					height: "600",
					width: "600",
					className: "object-cover object-left-top absolute h-full w-full inset-0",
					alt: product.title
				})
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" }),
			/* @__PURE__ */ jsx("h2", {
				className: "absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white",
				children: product.title
			})
		]
	}, product.title);
};
//#endregion
//#region app/components/Scrolltext.tsx
gsap.registerPlugin(ScrollTrigger);
var ScrollReveal = ({ children, scrollContainerRef, enableBlur = true, baseOpacity = .1, baseRotation = 3, blurStrength = 4, containerClassName = "", textClassName = "", rotationEnd = "bottom bottom", wordAnimationEnd = "bottom bottom" }) => {
	const containerRef = useRef(null);
	const splitText = useMemo(() => {
		return (typeof children === "string" ? children : "").split(/(\s+)/).map((word, index) => {
			if (word.match(/^\s+$/)) return word;
			return /* @__PURE__ */ jsx("span", {
				className: "inline-block word",
				children: word
			}, index);
		});
	}, [children]);
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
		gsap.fromTo(el, {
			transformOrigin: "0% 50%",
			rotate: baseRotation
		}, {
			ease: "none",
			rotate: 0,
			scrollTrigger: {
				trigger: el,
				scroller,
				start: "top bottom",
				end: rotationEnd,
				scrub: true
			}
		});
		const wordElements = el.querySelectorAll(".word");
		gsap.fromTo(wordElements, {
			opacity: baseOpacity,
			willChange: "opacity"
		}, {
			ease: "none",
			opacity: 1,
			stagger: .05,
			scrollTrigger: {
				trigger: el,
				scroller,
				start: "top bottom-=20%",
				end: wordAnimationEnd,
				scrub: true
			}
		});
		if (enableBlur) gsap.fromTo(wordElements, { filter: `blur(${blurStrength}px)` }, {
			ease: "none",
			filter: "blur(0px)",
			stagger: .05,
			scrollTrigger: {
				trigger: el,
				scroller,
				start: "top bottom-=20%",
				end: wordAnimationEnd,
				scrub: true
			}
		});
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [
		scrollContainerRef,
		enableBlur,
		baseRotation,
		baseOpacity,
		rotationEnd,
		wordAnimationEnd,
		blurStrength
	]);
	return /* @__PURE__ */ jsx("h2", {
		ref: containerRef,
		className: `my-5 ${containerClassName}`,
		children: /* @__PURE__ */ jsx("p", {
			className: `text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`,
			children: splitText
		})
	});
};
//#endregion
//#region app/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region components/ui/background-beams.tsx
var BackgroundBeams = React.memo(({ className }) => {
	const paths = [
		"M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
		"M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
		"M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
		"M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
		"M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
		"M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
		"M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
		"M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
		"M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
		"M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
		"M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
		"M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
		"M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
		"M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
		"M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
		"M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
		"M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
		"M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
		"M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
		"M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
		"M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
		"M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
		"M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
		"M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
		"M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
		"M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
		"M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
		"M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
		"M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
		"M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
		"M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
		"M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
		"M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
		"M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
		"M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
		"M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
		"M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
		"M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
		"M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
		"M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
		"M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
		"M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547",
		"M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
		"M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
		"M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
		"M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
		"M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
		"M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
		"M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
		"M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483"
	];
	return /* @__PURE__ */ jsx("div", {
		className: cn("absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]", className),
		children: /* @__PURE__ */ jsxs("svg", {
			className: "pointer-events-none absolute z-0 h-full w-full",
			width: "100%",
			height: "100%",
			viewBox: "0 0 696 316",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419",
					stroke: "url(#paint0_radial_242_278)",
					strokeOpacity: "0.05",
					strokeWidth: "0.5"
				}),
				paths.map((path, index) => /* @__PURE__ */ jsx(motion.path, {
					d: path,
					stroke: `url(#linearGradient-${index})`,
					strokeOpacity: "0.4",
					strokeWidth: "0.5"
				}, `path-` + index)),
				/* @__PURE__ */ jsxs("defs", { children: [paths.map((path, index) => /* @__PURE__ */ jsxs(motion.linearGradient, {
					id: `linearGradient-${index}`,
					initial: {
						x1: "0%",
						x2: "0%",
						y1: "0%",
						y2: "0%"
					},
					animate: {
						x1: ["0%", "100%"],
						x2: ["0%", "95%"],
						y1: ["0%", "100%"],
						y2: ["0%", `${93 + Math.random() * 8}%`]
					},
					transition: {
						duration: Math.random() * 10 + 10,
						ease: "easeInOut",
						repeat: Infinity,
						delay: Math.random() * 10
					},
					children: [
						/* @__PURE__ */ jsx("stop", {
							stopColor: "#18CCFC",
							stopOpacity: "0"
						}),
						/* @__PURE__ */ jsx("stop", { stopColor: "#18CCFC" }),
						/* @__PURE__ */ jsx("stop", {
							offset: "32.5%",
							stopColor: "#6344F5"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "100%",
							stopColor: "#AE48FF",
							stopOpacity: "0"
						})
					]
				}, `gradient-${index}`)), /* @__PURE__ */ jsxs("radialGradient", {
					id: "paint0_radial_242_278",
					cx: "0",
					cy: "0",
					r: "1",
					gradientUnits: "userSpaceOnUse",
					gradientTransform: "translate(352 34) rotate(90) scale(555 1560.62)",
					children: [
						/* @__PURE__ */ jsx("stop", {
							offset: "0.0666667",
							stopColor: "#d4d4d4"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "0.243243",
							stopColor: "#d4d4d4"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "0.43594",
							stopColor: "white",
							stopOpacity: "0"
						})
					]
				})] })
			]
		})
	});
});
BackgroundBeams.displayName = "BackgroundBeams";
//#endregion
//#region app/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region app/components/ui/input.tsx
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region app/api.ts
var api = axios.create({ baseURL: "http://localhost/api" });
//#endregion
//#region app/components/Signup.tsx
function BackgroundBeamsDemo() {
	const inRef = useRef(null);
	const emailSch = z.object({ email: z.email() });
	async function submit() {
		const str = inRef.current?.value;
		if (str) {
			const val = emailSch.safeParse({ email: str });
			if (val.success == false) {
				toast.error("Invalid email");
				return;
			}
			toast("Your email has been submitted", {
				description: (/* @__PURE__ */ new Date()).toLocaleString(),
				action: {
					label: "Undo",
					onClick: () => {}
				}
			});
			await api.post("/email", { email: val.data.email });
		} else toast.error("Email field is empty");
	}
	async function focusIn() {
		await api.get("/stats/click");
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen w-full flex-col items-center justify-center bg-neutral-950 antialiased px-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-full max-w-2xl",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "relative z-10 bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text px-2 sm:px-4 md:px-8 text-center font-sans text-4xl font-bold text-transparent sm:text-5xl md:text-7xl",
					children: "Join the waitlist"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 px-2 sm:px-4 md:px-8 text-center text-sm text-neutral-300 sm:text-base",
					children: "Get early access to a new era of News. And as a early member you get to talk directly with developers and journalist in the team in case of any issue or you want to add any suggestion. Over 500 people are already waiting to join us."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-col gap-4 px-2 sm:px-4 md:flex-row md:px-8",
					children: [/* @__PURE__ */ jsx(Input$1, {
						placeholder: "youremail@email.com",
						className: "z-10 h-12 flex-1 py-3 px-2",
						ref: inRef,
						onFocus: focusIn
					}), /* @__PURE__ */ jsx(Button$1, {
						variant: "outline",
						className: "h-12 w-full md:w-auto px-8 z-10",
						onClick: submit,
						children: "Submit"
					})]
				})
			]
		}), /* @__PURE__ */ jsx(BackgroundBeams, {})]
	});
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "Newspaper" }, {
		name: "description",
		content: "Welcome to your newspaper!"
	}];
}
var products = [
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
	}
];
var home_default = UNSAFE_withComponentProps(function Home() {
	const { ref: heroRef, inView: heroIn } = useInView();
	const { ref: talkRef, inView: talkIn } = useInView();
	const { ref: contactRef, inView: contanctIn } = useInView();
	useEffect(() => {
		(async () => {
			if (heroIn) await api.get("/stats/hero");
			if (talkIn) try {
				await api.get("/stats/talk");
			} catch (error) {
				console.log("hi");
				console.log(error);
			}
			if (contanctIn) await api.get("/stats/contact");
		})();
	}, [
		heroIn,
		talkIn,
		contanctIn
	]);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("div", {
			ref: heroRef,
			children: /* @__PURE__ */ jsx(HeroParallax, { products })
		}),
		/* @__PURE__ */ jsx("div", {
			className: "py-100 px-8 sm:px-16 pb-40",
			ref: talkRef,
			children: /* @__PURE__ */ jsx(ScrollReveal, {
				baseOpacity: .1,
				enableBlur: true,
				baseRotation: 4,
				blurStrength: 4,
				children: "News, Designed for Humans by Humans. We believe the experience of reading news matters just as much as the news itself. For too long, news websites have optimized for clicks instead of readers. Every decision has been driven by advertising, engagement metrics, and endless distractions—not by the people trying to stay informed. We're taking a different path. Our obsession is design. Every interaction, every screen, every line of text is crafted to feel simple, fast, and intentional. We believe technology should disappear into the background, allowing journalism to take center stage. We don't want people to remember our interface. We want them to remember how it felt focused and effortless. That's the experience we're building. One that respects your time, values your attention, and makes reading the news something you actually look forward to."
			})
		}),
		/* @__PURE__ */ jsx("div", {
			ref: contactRef,
			children: /* @__PURE__ */ jsx(BackgroundBeamsDemo, {})
		})
	] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-DucSRZf_.js",
		"imports": ["/assets/jsx-runtime-DArO8pFj.js", "/assets/errorBoundaries-Bnb3KYmM.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-DZJc-3wY.js",
			"imports": [
				"/assets/jsx-runtime-DArO8pFj.js",
				"/assets/errorBoundaries-Bnb3KYmM.js",
				"/assets/dist-DAC3tZTf.js"
			],
			"css": ["/assets/root-DcZkl5X9.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-PThu9jwi.js",
			"imports": ["/assets/jsx-runtime-DArO8pFj.js", "/assets/dist-DAC3tZTf.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-8d012841.js",
	"version": "8d012841",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = { "unstable_optimizeDeps": false };
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
