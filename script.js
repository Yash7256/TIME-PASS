document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Image paths for all available images
    const imagePaths = [
        'assets/img-1.jpeg',
        'assets/img-2.jpeg',
        'assets/img-3.jpeg',
        'assets/img-4.jpeg',
        'assets/img-5.jpeg',
        'assets/img-6.jpeg',
        'assets/img-7.jpeg',
        'assets/img-8.jpeg',
        'assets/img-9.jpeg',
        'assets/img-10.jpeg',
        'assets/img-11.jpeg',
        'assets/img-12.jpeg',
        'assets/WhatsApp Image 2025-12-06 at 6.45.52 PM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.50 PM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.50 PM (2).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.50 PM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.51 PM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.51 PM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.52 PM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.52 PM (2).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.52 PM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.53 PM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.53 PM (2).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.53 PM (3).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 8.54.53 PM.jpeg'
    ];

    // Preload all images
    const preloadImages = () => {
        imagePaths.forEach(path => {
            const img = new Image();
            img.src = path;
        });
    };

    preloadImages();

    // Create image elements dynamically
    const stickySection = document.querySelector(".sticky");
    const galleryContainer = document.querySelector(".gallery");

    // Clear existing content and create new image elements
    galleryContainer.innerHTML = '';
    
    imagePaths.forEach((path, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = `img-${index + 1}`;
        imgDiv.innerHTML = `<img src="${path}" alt="Gallery Image ${index + 1}">`;
        galleryContainer.appendChild(imgDiv);
    });

    const totalStickyHeight = window.innerHeight * (imagePaths.length + 1);
    const newSectionHeight = window.innerHeight; // Height of the new section

    // lenis smooth scroll
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // helper func: split text into letters
    const introParagraphs = document.querySelectorAll(".intro-col p");
    introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        paragraph.innerHTML = text
            .split(/(\s+)/)
            .map((part) => {
                if (part.trim() === "") {
                    return part;
                } else {
                    return part
                        .split("")
                        .map(
                            (char) =>
                                `<span style="opacity: 0; display: inline-block;">${char}</span>`
                        )
                        .join("");
                }
            })
            .join("");
    });

    // flicker animation: intro text
    function flickerAnimation(targets, toOpacity) {
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.05,
            stagger: {
                amount: 0.3,
                from: "random",
            },
        });
    }

    // Flicker animation for intro text (adjusted for new section)
    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation(".intro-col p span", 1),
        onLeave: () => flickerAnimation(".intro-col p span", 0),
        onEnterBack: () => flickerAnimation(".intro-col p span", 1),
        onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
    });

    // scrolltrigger animations
    // pin the sticky section (accounting for new section)
    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        pin: true,
        pinSpacing: true,
    });

    // Dynamic scaling factor based on viewport
    const getMaxScale = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        return aspectRatio > 1.5 ? 1.5 : 2.0; // Reduce scale on wider screens
    };

    // Create animations for each image
    imagePaths.forEach((_, index) => {
        const imgSelector = `.img-${index + 1}`;
        const imgElement = document.querySelector(imgSelector);
        
        if (!imgElement) return;

        // First image (img-1) - gentle scale animation
        if (index === 0) {
            gsap.to(`${imgSelector} img`, {
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: "top top",
                    end: () => `+=${window.innerHeight}`,
                    scrub: true,
                },
            });
        }
        // Second image (img-2) - clip-path and moderate scale animation
        else if (index === 1) {
            // Animate clip-path
            gsap.to(imgSelector, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: "top top",
                    end: () => `+=${window.innerHeight}`,
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.set(imgSelector, {
                            clipPath: `polygon(
                                ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                                ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                                ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
                                ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%
                            )`,
                        });
                    },
                },
            });

            // Moderate scale animation
            gsap.to(`${imgSelector} img`, {
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: "top top",
                    end: () => `+=${window.innerHeight}`,
                    scrub: true,
                },
            });

            // Continue with reduced scale
            gsap.fromTo(
                `${imgSelector} img`,
                { scale: 1.15 },
                {
                    scale: 1.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: stickySection,
                        start: () => `${window.innerHeight * 3}`,
                        end: () => `${window.innerHeight * 4}`,
                        scrub: true,
                    },
                }
            );
        }
        // Third image (img-3) - diamond reveal with controlled zoom
        else if (index === 2) {
            const maxScale = getMaxScale();
            
            // Diamond clip-path animation
            gsap.to(imgSelector, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: () => `${window.innerHeight * 3}`,
                    end: () => `${window.innerHeight * 4}`,
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.set(imgSelector, {
                            clipPath: `polygon(
                                ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                                ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                                ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%,
                                ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%
                            )`,
                        });
                    },
                },
            });

            // Controlled scale animation
            gsap.to(`${imgSelector} img`, {
                scale: maxScale,
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: () => `${window.innerHeight * 3}`,
                    end: () => `${window.innerHeight * 4}`,
                    scrub: true,
                },
            });

            // Gentle reset scale
            gsap.fromTo(
                `${imgSelector} img`,
                { scale: maxScale },
                {
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: stickySection,
                        start: () => `${window.innerHeight * 4}`,
                        end: () => `${window.innerHeight * 6}`,
                        scrub: true,
                    },
                }
            );
        }
        // Remaining images (img-4 to img-13) - gentle fade and scale animations
        else {
            const startPosition = window.innerHeight * (index + 1);
            const endPosition = window.innerHeight * (index + 2);
            
            // Smooth fade in animation
            gsap.fromTo(
                imgSelector,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stickySection,
                        start: () => `${startPosition - window.innerHeight * 0.3}`,
                        end: () => `${startPosition + window.innerHeight * 0.3}`,
                        scrub: true,
                    },
                }
            );

            // Very subtle scale animation
            gsap.to(`${imgSelector} img`, {
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                    trigger: stickySection,
                    start: () => `${startPosition}`,
                    end: () => `${endPosition}`,
                    scrub: true,
                },
            });
        }
    });

    // final copy reveal
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * (imagePaths.length + 0.5)}`,
            end: () => `${window.innerHeight * (imagePaths.length + 1.5)}`,
            scrub: true,
            toggleActions: "play reverse play reverse",
        },
    });

    tl.to(".copy", {
        display: "block",
        rotateY: 0,
        scale: 1,
        duration: 1,
    });
});