import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/lib/i18n";

export function LanguageToggle() {
	const { i18n } = useTranslation();

	return (
		<button
			type="button"
			onClick={() => changeLanguage(i18n.language === "da" ? "en" : "da")}
			className="fixed top-4 right-4 z-40 p-2"
			aria-label={
				i18n.language === "da" ? "Switch to English" : "Skift til dansk"
			}
		>
			<img
				src={i18n.language === "da" ? "/flags/en.svg" : "/flags/da.svg"}
				alt=""
				className="size-6"
			/>
		</button>
	);
}
