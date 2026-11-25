"use client";

import {SearchIcon, XIcon} from "lucide-react";
import {useEffect, useRef, useState} from "react";

interface MediaSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  resultCount: number;
  /** Delay (ms) before the typed value is pushed to the filter. */
  debounceMs?: number;
}

/**
 * Controlled, client-side search box. Filtering happens in-memory against the
 * already-loaded card catalog — typing never triggers a navigation or reload.
 * The visible input updates instantly while `onChange` is debounced so the
 * (potentially large) filter only runs once the visitor pauses typing.
 */
function MediaSearch({
  value,
  onChange,
  placeholder,
  resultCount,
  debounceMs = 250,
}: MediaSearchProps) {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the field in sync when the query is reset/changed from the outside.
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const pushChange = (next: string, immediate = false) => {
    setInputValue(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (immediate) {
      onChange(next);
      return;
    }
    timerRef.current = setTimeout(() => onChange(next), debounceMs);
  };

  const appliedQuery = value.trim();

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="search"
        className="flex w-full items-center rounded-full border border-[#241E1926] bg-white px-4 py-2 shadow-[0_6px_24px_rgba(36,30,25,0.05)] transition focus-within:border-primary-red/50 focus-within:shadow-[0_8px_28px_rgba(36,30,25,0.09)] sm:px-5"
      >
        <SearchIcon
          className="mr-3 size-5 shrink-0 text-[#6B6761]"
          aria-hidden="true"
        />
        <label htmlFor="media-search" className="sr-only">
          Search
        </label>
        <input
          id="media-search"
          type="text"
          value={inputValue}
          onChange={(event) => pushChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 font-sans text-sm text-[#241E19] outline-none placeholder:text-[#6B6761]/70 sm:text-base"
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => pushChange("", true)}
            aria-label="Clear search"
            className="ml-2 rounded-full p-1 text-[#6B6761] transition hover:bg-[#F7F5F2] hover:text-primary-red"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      {appliedQuery && (
        <p
          className="px-2 font-sans text-xs text-[#6B6761] sm:text-sm"
          aria-live="polite"
        >
          {resultCount} {resultCount === 1 ? "result" : "results"} for “
          {appliedQuery}”
        </p>
      )}
    </div>
  );
}

export default MediaSearch;
