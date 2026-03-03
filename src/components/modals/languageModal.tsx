import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/lib/i18n";

type LanguageModalProps = {
	open: boolean;
	onClose: () => void;
};

export function LanguageModal({ open, onClose }: LanguageModalProps) {
	const { t } = useTranslation();

	if (!open) return null;

	const select = (lang: string) => {
		changeLanguage(lang);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="bg-surface border border-border rounded-lg p-8 max-w-sm w-full mx-4 space-y-6">
				<div className="text-center space-y-2">
					<h2 className="text-xl font-medium">{t("language_modal.title")}</h2>
					<p className="text-sm text-muted-foreground">
						{t("language_modal.subtitle")}
					</p>
				</div>
				<div className="flex gap-4">
					<button
						type="button"
						onClick={() => select("da")}
						className="flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
					>
						<img src="/flags/da.svg" alt="Dansk" className="size-8" />
						<span className="font-medium">Dansk</span>
					</button>
					<button
						type="button"
						onClick={() => select("en")}
						className="flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
					>
						<img src="/flags/en.svg" alt="English" className="size-8" />
						<span className="font-medium">English</span>
					</button>
				</div>
			</div>
		</div>
	);
}
