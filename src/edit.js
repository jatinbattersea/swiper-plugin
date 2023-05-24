/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	RichText, 
	AlignmentControl, 
	BlockControls,
} from '@wordpress/block-editor';

import { Toolbar, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const { slides } = attributes;

	const blockProps = useBlockProps();

	const handleAddSlide = () => {
		const newSlide = {
			heading: '',
			imgLink: '',
			link: '',
			rating: '',
		};

		setAttributes({
			slides: [...slides, newSlide],
		});
	};

	const handleRemoveSlide = () => {
		const updatedSlides = slides.slice(0, -1);
		setAttributes({
			slides: updatedSlides,
		});
	};
	return (
		<div {...blockProps}>
			<BlockControls>
				<Toolbar className='swipe-toolbar' label="Options">
					<Button
						className="components-toolbar__control"
						label={__('Add Row', 'swiper-slider')}
						onClick={handleAddSlide}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg>
					</Button>
					<Button
						className="components-toolbar__control"
						label={__('Remove Row', 'swiper-slider')}
						onClick={handleRemoveSlide}
						disabled={slides.length === 1}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg>
					</Button>
				</Toolbar>
			</BlockControls>
			<table className='table table-bordered table-striped'>
				<thead>
					<tr>
						<th>Heading</th>
						<th>Image URI</th>
						<th>Affiliate Link</th>
						<th>Rating (out of 5)</th>
					</tr>
				</thead>
				<tbody>
					{slides.map((slide, index) => (
						<tr key={index}>
							<RichText
								tagName="td"
								value={slide.heading}
								onChange={(newHeading) => {
									const updatedSlides = [...slides];
									updatedSlides[index].heading = newHeading;
									setAttributes({ slides: updatedSlides });
								}}
								placeholder="Heading goes here..."
								allowedFormats={['core/bold', 'core/italic', 'core/link']}
							/>
							<td>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											const updatedSlides = [...slides];
											updatedSlides[index].imgLink = media.url;
											setAttributes({ slides: updatedSlides });
										}}
										render={({ open }) => (
											<Button
												onClick={open}
												className="components-button editor-post-featured-image__toggle"
												label={slide.imgLink ? __('Edit', 'swiper-slider') : __('Set Image', 'swiper-slider')}
											>
												{(!slide.imgLink) ? (
													__('Set Image', 'swiper-slider')
												) : (
													<img src={slide.imgLink} alt={slide.heading} />
												)}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</td>
							<RichText
								tagName="td"
								value={slide.link}
								onChange={(newLink) => {
									const updatedSlides = [...slides];
									updatedSlides[index].link = newLink;
									setAttributes({ slides: updatedSlides });
								}}
								placeholder="Affiliate link goes here..."
								allowedFormats={['core/bold', 'core/italic', 'core/link']}
							/>
							<RichText
								tagName="td"
								value={slide.rating}
								onChange={(newRating) => {
									const updatedSlides = [...slides];
									updatedSlides[index].rating = newRating;
									setAttributes({ slides: updatedSlides });
								}}
								placeholder="Rating goes here..."
								allowedFormats={['core/bold', 'core/italic', 'core/link']}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

  