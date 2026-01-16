$(document).ready(function () {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Intersection Observer for Counters
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $counter = $(entry.target);
                const target = parseInt($counter.attr('data-target'));

                // Animate
                $({ countNum: 0 }).animate({
                    countNum: target
                },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $counter.text(Math.ceil(this.countNum));
                        },
                        complete: function () {
                            $counter.text(this.countNum);
                        }
                    });

                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all .counter elements
    $('.counter').each(function () {
        counterObserver.observe(this);
    });

    // Smooth scrolling for navigation links
    $("a.nav-link, .btn").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);

            // Close mobile menu if open
            $('.navbar-collapse').collapse('hide');
        }
    });
});
