import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = "primary", disabled = false, className = "", type = "button" }) => {
    const baseStyle = "w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
    const variants = {
        primary: "bg-orange-600 hover:bg-orange-700 text-white shadow-md",
        secondary: "bg-teal-600 hover:bg-teal-700 text-white shadow-md",
        outline: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {children}
        </button>
    );
};
