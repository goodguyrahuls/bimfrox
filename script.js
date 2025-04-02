var navLinks = document.getElementById("navLinks");

        function showMenu() {
            navLinks.style.right = "0";
        }
        function hideMenu() {
            navLinks.style.right = "-200px";
        }

        var swiper = new Swiper(".mySwiper", {
            loop: true,  // Infinite loop
            autoplay: {
                delay: 2500,  // Auto slide every 2.5 seconds
                disableOnInteraction: false,
            },
            effect: "fade", // Smooth transition effect
        });