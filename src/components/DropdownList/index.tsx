import classNames from "classnames";
import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import useOutsideClick from 'use-outside-click-react-hook';

interface DropdownListProps {
    id?: string;
    className?: string;
    defaultValue: string;
    options: Array<string>;
    onSelect: (value: string) => void;
}

// FIXME: max height, should scroll.
export default function DropdownList({ id, defaultValue, className, options, onSelect }: DropdownListProps) {
    const [isOpenState, setIsOpenState] = useState(false);
    const [selectedOptionState, setSelectedOptionState] = useState<string>(defaultValue);

    // React ref used to access menu poup div to apply click outside logic.
    const menuPopupDivRef = useRef(null);

    useOutsideClick(menuPopupDivRef, () => {
        // close menu when click ouside Dropdown list menu.
        setIsOpenState(false);
    });

    const handleOptionSelect = (option: string) => {
        // set state for current selection.
        setSelectedOptionState(option);
        // trigger onSelect callback
        onSelect(option);
        // close options menu
        setIsOpenState(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            // close menu when Escape key is down
            setIsOpenState(false);
        }

        if (e.key === "Enter" || e.key === " ") {
            // Prevent the default behavior of scrolling the page
            e.preventDefault();

            // If the dropdown is open and an option is focused, select it
            if (isOpenState && document.activeElement?.getAttribute("role") === "option") {
                const selectedOption = document.activeElement.getAttribute("data-option") as string;
                handleOptionSelect(selectedOption);
            }
        }
    };

    return <div className={classNames(className, "relative inline-block")} >
        <button
            id={id}
            onClick={() => {
                setIsOpenState(!isOpenState);
            }}
            aria-haspopup="listbox" aria-expanded={isOpenState}
            className="relative rounded border border-input-border-color inline-flex p-1 overflow-hidden bg-white"
        >
            <span className="inline-block min-w-48 text-left">
                {selectedOptionState}
            </span>
            <span className="absolute right-0 top-0 w-6 bg-dropdown-action-color border-l border-input-border-color h-full flex justify-center items-center">
                <IoMdArrowDropdown className="inline-block text-dropdown-icon-color" />
            </span>
        </button>
        {isOpenState && (
            <div ref={menuPopupDivRef} onKeyDown={handleKeyDown} role="listbox"
                aria-labelledby={`${id}-selected-option`} className="absolute z-10 mt-1 bg-white border border-input-border-color rounded w-full overflow-y-scroll" tabIndex={0}>
                {options.map((option) => (
                    <div
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="cursor-pointer hover:bg-gray-200 py-2 px-4 border-b last:border-0 border-input-border-color"
                        role="option"
                        aria-selected={selectedOptionState === option}
                        tabIndex={0}
                        data-option={option}
                    >
                        {option}
                    </div>
                ))}
            </div>
        )}
    </ div>

}
