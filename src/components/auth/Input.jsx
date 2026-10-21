import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  ...props
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mt-6 w-full first:mt-0">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-semibold leading-[18px] text-[#0A0847]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className="h-12 w-full rounded-[4px] border border-[#E8E8E8] bg-white px-5 text-sm font-semibold text-[#0A0847] outline-none transition placeholder:font-semibold placeholder:text-[#0A0847]/60 focus:border-[#001984]"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0A0847]"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <PiEye size={18} /> : <PiEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}