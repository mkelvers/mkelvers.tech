import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type SectionListProps = {
    title: string,
    items: {
        title: string,
        href: string,
        role: string,
        period?: string,
        description: string,
    }[],
    viewAll?: {
        href: string,
        label: string,
    },
    showTitle?: boolean,
}

export function SectionList(props: SectionListProps) {
    const { title, items, viewAll, showTitle = true } = props;

    return (
        <section className="mb-16">
            {showTitle &&
                <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
                    <span className="text-accent mr-2 font-mono">*</span> {title}
                </h2>
            }
            <div className="space-y-8">
                {items.map((item) => (
                    <div key={item.title} className="group">
                        <Link
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-200">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2">
                                {item.role} {item.period && `(${item.period})`}
                            </p>
                            <p className="text-gray-300">{item.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {viewAll && (
                <Link
                    href={viewAll.href}
                    className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
                >
                    {viewAll.label}{" "}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
            )}
        </section>
    )
}