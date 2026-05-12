import Link from "next/link";

interface SimpleDropdownProps {
  topClassName?: string;
  ulClassName?: string;
  title: string;
  titleURL?: string;
  options: { label: string; url?: string }[];
  id: string;
}

export default function SimpleDropdown({
  topClassName = "",
  ulClassName = "",
  title,
  titleURL,
  options,
  id,
}: SimpleDropdownProps) {
  return (
    <div className={"simpleDropDown " + topClassName}>
      <label className="flex items-center gap-2 cursor-pointer">
        {titleURL ? <Link href={titleURL}>{title}</Link> : <span>{title}</span>}
        <div className="w-4 h-4 border border-current simpleDropDownArrow">
          <input type="checkbox" className="absolute hidden" id={id} />
        </div>
      </label>

      <ul className={`flex flex-col w-full ${ulClassName}`}>
        {options.map((option, i) => (
          <li key={i}>
            {option.url ? (
              <Link href={option.url}>{option.label}</Link>
            ) : (
              <span>{option.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
