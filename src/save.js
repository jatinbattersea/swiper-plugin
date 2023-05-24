/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

export default function Save({ attributes }) {
	const { slides } = attributes;

	const generateRatingStars = (rating) => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating - fullStars !== 0;
	
		const stars = [];
	
		for (let i = 1; i <= 5; i++) {
		  if (i <= fullStars) {
			stars.push(<label key={i} className="full"><span></span></label>);
		  } else if (i === fullStars + 1 && hasHalfStar) {
			stars.push(<label key={i} className="half"><span></span></label>);
		  } else {
			stars.push(<label key={i}><span></span></label>);
		  }
		}
	
		return stars;
	};
  
	return (
		<div className="wp-swiper-slider swiper mySwiper simple-product">
			<div class="heading-products">
				<span>Similar <b>Products</b></span>
			</div>
			<div className="swiper-wrapper">
				{slides.map((slide, index) => (
					<div key={index} className="swiper-slide">
						<div className="item sim-product">
							<div className="plr-5">
								<div className="card-sec">
									<div className='img'>
										<div className="blog-img">
											<img
												src={slide.imgLink}
												className="img-fluid wp-post-image"
											/>
										</div>
									</div>
									<div className="blog-content">
										<div className="rating-main">
											{
												(slide.rating) &&
													(
														<>
															<div className="rate">
																{generateRatingStars(slide.rating)}
															</div>
															<span className="rate_no">
																{slide.rating}
															</span>
														</>
													)
											}
										</div>
										<h2>{slide.heading}</h2>
										<a href={slide.link} className="btn">View Product</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
	);
  }
  