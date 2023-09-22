window.onload = () => {
	const galleries = Array.from(
		document.querySelectorAll(".wp-block-cosmicblocks-piccy-gallery")
	);

	// ad event listener to each gallery
	galleries.forEach((gallery) => {
		const thumbnails = Array.from(gallery.querySelectorAll(".thumb"));
		if (thumbnails?.[0]) {
			thumbnails[0].classList.add("selected");
			const imagePreview = Array.from(
				gallery.getElementsByClassName("image-preview")
			);
			imagePreview[0].src = thumbnails[0].dataset.largeSize;
		}

		thumbnails.forEach((thumb) => {
			thumb.addEventListener("click", (e) => {
				const selected = Array.from(
					gallery.getElementsByClassName("thumb selected")
				);
				selected.forEach((thumb) => thumb.classList.remove("selected"));
				thumb.classList.add("selected");
				const imagePreview = Array.from(
					gallery.getElementsByClassName("image-preview")
				);
				imagePreview[0].src = thumb.dataset.largeSize;
			});
		});
	});
};
