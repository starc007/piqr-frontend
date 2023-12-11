import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  cls?: string;
  labelCls?: string;
  error?: string | null;
  isRequired?: boolean;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  cls?: string;
  labelCls?: string;
  error?: string;
  isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { cls, id, name, label, labelCls, error, isRequired = false, ...props },
    ref
  ) {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <div className="flex justify-between items-end">
            <label
              id={id}
              className={`text-gray-500  text-sm font-medium ${labelCls}`}
            >
              {" "}
              {label}{" "}
              {isRequired ? <span className="text-red-600">*</span> : null}
            </label>
            {error && <label className="text-sm text-red-500">{error}</label>}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          {...props}
          className={`focus:outline-none ${cls} placeholder:text-sm rounded-xl focus:border-transparent focus:ring-1 focus:ring-primary  border border-1 py-2.5 px-4 transition duration-300 text-gray-800`}
        />
      </div>
    );
  }
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function Input(
    { cls, label, id, labelCls, isRequired = false, ...props },
    ref
  ) {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            id={id}
            className={`text-gray-500 text-sm font-medium ${labelCls}`}
          >
            {" "}
            {label}{" "}
            {isRequired ? <span className="text-red-600">*</span> : null}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          {...props}
          className={`focus:outline-none ${cls} placeholder:text-sm rounded-xl border border-gray-300 border-1 py-2.5 px-4 transition duration-300 text-gray-800`}
        />
      </div>
    );
  }
);
