/* =========================================================
   BRYAN — PORTFOLIO
   MASTER JAVASCRIPT
========================================================= */

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");
    const heroPhoto = document.querySelector(".hero-photo img");

    const aboutBackground =
        document.querySelector(".about-background-text");

    const workBackground =
        document.querySelector(".work-background-text");

    const contactBackground =
        document.querySelector(".contact-background");

    const projectPreviews =
        document.querySelectorAll(".project-preview");

    const workProjects =
        document.querySelectorAll(".work-project");


    /* =====================================================
       2. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(`
        .about-label,
        .section-label,
        .about-title,
        .about-bottom,
        .section-header,
        .project-preview,
        .manifesto-number,
        .manifesto-content,
        .contact-content,
        .work-hero-content,
        .work-project
    `);

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       3. WORK PROJECT IMAGE REVEAL
    ===================================================== */

    if (workProjects.length) {

        const projectObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        workProjects.forEach((project) => {
            projectObserver.observe(project);
        });

    }


    /* =====================================================
       4. NAVBAR SCROLL EFFECT
    ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.style.position = "fixed";

            navbar.style.background =
                "rgba(2, 11, 20, 0.82)";

            navbar.style.backdropFilter =
                "blur(18px)";

            navbar.style.webkitBackdropFilter =
                "blur(18px)";

            navbar.style.borderBottom =
                "1px solid rgba(255,255,255,.08)";

        } else {

            navbar.style.position = "absolute";

            navbar.style.background =
                "transparent";

            navbar.style.backdropFilter =
                "none";

            navbar.style.webkitBackdropFilter =
                "none";

            navbar.style.borderBottom =
                "1px solid rgba(255,255,255,.07)";

        }

    };


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       5. HERO PHOTO PARALLAX
    ===================================================== */

    let ticking = false;

    const updateHeroParallax = () => {

        if (!hero || !heroPhoto) {
            ticking = false;
            return;
        }

        if (window.innerWidth < 768) {
            ticking = false;
            return;
        }

        const heroRect =
            hero.getBoundingClientRect();

        if (
            heroRect.bottom < 0 ||
            heroRect.top > window.innerHeight
        ) {
            ticking = false;
            return;
        }

        const scrollY =
            Math.max(0, window.scrollY);

        const movement =
            Math.min(scrollY * 0.035, 28);

        heroPhoto.style.transform =
            `translateX(7%) translateY(${movement}px) scale(1.08)`;

        ticking = false;

    };


    const requestParallax = () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroParallax
            );

            ticking = true;

        }

    };


    window.addEventListener(
        "scroll",
        requestParallax,
        { passive: true }
    );


    /* =====================================================
       6. BACKGROUND TYPOGRAPHY PARALLAX
    ===================================================== */

    const moveBackgroundWord = (
        element,
        speed,
        direction = 1
    ) => {

        if (!element) return;

        const parent =
            element.parentElement;

        if (!parent) return;

        const rect =
            parent.getBoundingClientRect();

        if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight
        ) return;

        const progress =
            window.innerHeight - rect.top;

        const movement =
            progress * speed * direction;

        element.style.transform =
            `translate3d(${movement}px, 0, 0)`;

    };


    const updateBackgroundTypography = () => {

        if (window.innerWidth < 768) return;

        moveBackgroundWord(
            aboutBackground,
            0.025,
            1
        );

        moveBackgroundWord(
            workBackground,
            0.018,
            -1
        );

        /*
        contact-background already uses
        translate(-50%, -50%) in CSS.

        We intentionally don't override its transform.
        */

    };


    window.addEventListener(
        "scroll",
        () => {

            window.requestAnimationFrame(
                updateBackgroundTypography
            );

        },
        { passive: true }
    );


    /* =====================================================
       7. PROJECT HOVER — DESKTOP ONLY
    ===================================================== */

    if (
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        projectPreviews.forEach((project) => {

            const arrow =
                project.querySelector(
                    ".project-arrow"
                );


            project.addEventListener(
                "mouseenter",
                () => {

                    if (!arrow) return;

                    arrow.style.transform =
                        "rotate(45deg) scale(1.08)";

                }
            );


            project.addEventListener(
                "mouseleave",
                () => {

                    if (!arrow) return;

                    arrow.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       8. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) return;


                const target =
                    document.querySelector(href);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       9. MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(`
            .primary-btn,
            .nav-cta,
            .contact-btn
        `);


    if (
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        magneticButtons.forEach((button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.12}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       10. HERO MOUSE DEPTH
    ===================================================== */

    if (
        hero &&
        heroPhoto &&
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.scrollY > 150) return;

                const x =
                    event.clientX /
                    window.innerWidth -
                    0.5;

                const y =
                    event.clientY /
                    window.innerHeight -
                    0.5;


                const moveX =
                    7 + x * 0.7;

                const moveY =
                    y * 4;


                heroPhoto.style.transform =
                    `translateX(${moveX}%) translateY(${moveY}px) scale(1.08)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroPhoto.style.transform =
                    "translateX(7%) scale(1.08)";

            }
        );

    }


    /* =====================================================
       11. ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach((link) => {

        const linkPage =
            link
                .getAttribute("href")
                ?.split("#")[0];


        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /*
       When opening locally:
       /folder/ may return an empty filename.
    */

    if (
        currentPage === "" ||
        currentPage === "index.html"
    ) {

        const homeLink =
            document.querySelector(
                '.nav-links a[href="index.html"]'
            );

        if (homeLink) {
            homeLink.classList.add("active");
        }

    }


    /* =====================================================
       12. INITIAL STATES
    ===================================================== */

    updateBackgroundTypography();
    updateHeroParallax();


    /* =====================================================
       13. WINDOW RESIZE RESET
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                heroPhoto &&
                window.innerWidth < 768
            ) {

                heroPhoto.style.transform = "";

            }

            if (window.innerWidth < 768) {

                if (aboutBackground) {
                    aboutBackground.style.transform = "";
                }

                if (workBackground) {
                    workBackground.style.transform = "";
                }

            }

        }
    );


    /* =====================================================
       14. PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});