import { WorkStatus } from "../../shared/types";
import { useState, useRef, useEffect } from "react";

type Props = {
  value: WorkStatus;
  onChange: (val: WorkStatus) => void;
  className?: string;
};

const OPTIONS: { value: WorkStatus; label: string }[] = [
  { value: "looking", label: "Currently looking for work" },
  { value: "passive", label: "Passively looking for work" },
  { value: "not_looking", label: "Don't want to hear about work" },
];

export const WorkStatusSelect = ({ value, onChange, className = "" }: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (focusedIdx === null) return;
    const el = optionRefs.current[focusedIdx];
    el?.focus();
  }, [focusedIdx]);

  const handleSelect = (val: WorkStatus) => {
    onChange(val);
    setOpen(false);
  };

  const currentLabel = OPTIONS.find((o) => o.value === value)?.label || "Select";

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      const idx = OPTIONS.findIndex((o) => o.value === value);
      setFocusedIdx(idx >= 0 ? idx : 0);
    }
  };

  return (
    <div ref={rootRef} className={`relative inline-block text-left ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex justify-between items-center w-full rounded-md shadow-sm max-w-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{currentLabel}</span>
        <svg className="ml-3 h-4 w-4 text-black" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
          <div
            className="absolute shadow-lg rounded-md border border-gray-200"
            role="menu"
            aria-orientation="vertical"
            aria-label="Work status options"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setFocusedIdx((cur) => {
                  const next = cur === null ? 0 : Math.min(OPTIONS.length - 1, cur + 1);
                  return next;
                });
                return;
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setFocusedIdx((cur) => {
                  const prev = cur === null ? OPTIONS.length - 1 : Math.max(0, cur - 1);
                  return prev;
                });
                return;
              }
              if (e.key === "Enter") {
                e.preventDefault();
                if (focusedIdx !== null) handleSelect(OPTIONS[focusedIdx].value);
                return;
              }
            }}
          >
            <h4 className="py-1.5 px-2 font-medium text-left">
              Update your availability for new opportunities:
            </h4>
            <ul className="m-0 pb-2 list-none space-y-2 bg-white rounded-md shadow-sm">
              {OPTIONS.map((opt, idx) => (
                <li key={opt.value} className=" px-2">
                  <button
                    ref={(el) => { optionRefs.current[idx] = el; }}
                    type="button"
                    role="menuitem"
                    tabIndex={-1}
                    className="w-full rounded-md cursor-pointer !bg-white hover:!bg-gray-100 !border-none text-left"
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
      )}
    </div>
  );
};
