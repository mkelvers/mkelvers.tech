import { useState } from "react";
import { cn } from "@/lib/utils";

export type ImageModalState = {
	images: readonly string[];
	index: number;
} | null;

type ImageModalProps = {
	state: ImageModalState;
	onClose: () => void;
};

export function ImageModal({ state, onClose }: ImageModalProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!state) return null;

	const { images } = state;

	const prev = () =>
		setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
	const next = () =>
		setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowLeft") prev();
		if (e.key === "ArrowRight") next();
		if (e.key === "Escape") onClose();
	};

	return (
		<div
			role="dialog"
			aria-label="Image gallery"
			aria-modal="true"
			tabIndex={-1}
			className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4"
			onClick={onClose}
			onKeyDown={handleKeyDown}
		>
			<div
				role="document"
				className="relative max-w-4xl w-full"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Close"
				>
					<svg
						aria-hidden="true"
						className="size-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{images.length > 0 && (
					<img
						src={images[currentIndex]}
						alt={`Screenshot ${currentIndex + 1} of ${images.length}`}
						className="w-full rounded-lg"
					/>
				)}

				{images.length > 1 && (
					<>
						<button
							type="button"
							onClick={prev}
							className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Previous image"
						>
							<svg
								aria-hidden="true"
								className="size-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							type="button"
							onClick={next}
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Next image"
						>
							<svg
								aria-hidden="true"
								className="size-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>

						<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
							{images.map((src, i) => (
								<button
									key={src}
									type="button"
									onClick={() => setCurrentIndex(i)}
									className={cn(
										"size-2 rounded-full transition-colors",
										i === currentIndex ? "bg-accent" : "bg-muted-foreground/50",
									)}
									aria-label={`Go to image ${i + 1}`}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
