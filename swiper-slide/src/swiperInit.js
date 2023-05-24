// Initialize Swiper
const swiper = new Swiper(".wp-swiper-slider", {
	spaceBetween: 15,
	freeMode: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		640: {
			slidesPerView: 1,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});
