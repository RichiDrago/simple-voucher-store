import { useTranslation } from "react-i18next";

// Icons
import searchIcon from "/icons/search.svg";

const TRANSLATION_NAMESPACE = "components.filter";

type FilterProps = {
    children: React.ReactNode;
    resetFilters?: () => void;
    onSearch?: () => void;
};

export const Filter = ({ children, resetFilters, onSearch }: FilterProps) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                {/* Titlw */}
                <p className="text-xl font-bold"> {t(`${TRANSLATION_NAMESPACE}.filterBy`)} </p>
                {/* Buttons */}
                <div className="flex items-center space-x-4">
                    {/* Reset button */}
                    <button className="rounded-lg p-2" onClick={resetFilters}>
                        <span className="text-sm font-medium text-red-500 hover:underline"> {t(`${TRANSLATION_NAMESPACE}.resetFilters`)} </span>
                    </button>
                    {/* Search button */}
                    <button className="rounded-lg p-2 hover:bg-gray-200" onClick={onSearch}>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </div>
            </div>
            {/* Filters */}
            <div className="grid grid-cols-4 gap-2">{children}</div>
        </div>
    );
};
