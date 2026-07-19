"use client"

import { ReactNode, useCallback, useRef, useState } from "react";

type HoldButtonProps = {
    onConfirm: () => void;
    holdDuration?: number;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export default function HoldButton({
    onConfirm,
    holdDuration = 1000,
    children,
    className = "",
    disabled = false,
}: HoldButtonProps) {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    const cancelHold = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        startTimeRef.current = null;
        setIsHolding(false);
        setProgress(0);
    }, []);

    const tick = useCallback(
        (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }
            const elapsed = timestamp - startTimeRef.current;
            const pct = Math.min((elapsed / holdDuration) * 100, 100);
            setProgress(pct);

            if (pct >= 100) {
                setIsHolding(false);
                setIsCompleted(true);
                rafRef.current = null;
                onConfirm?.();
                return;
            }

            rafRef.current = requestAnimationFrame(tick);
        },
        [holdDuration, onConfirm]
    );

    const startHold = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            if (disabled) return;
            e.preventDefault();
            setIsHolding(true);
            startTimeRef.current = null;
            rafRef.current = requestAnimationFrame(tick);
        },
        [disabled, tick]
    );

    return (
        <button
            type="button"
            disabled={disabled}
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            onTouchCancel={cancelHold}
            onContextMenu={(e) => e.preventDefault()}
            className={[
                "relative overflow-hidden select-none px-5 py-2.5 rounded-full font-medium text-sm border transition-colors duration-150",
                disabled
                    ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400"
                    : isCompleted
                        ? "border-danger text-danger-foreground bg-danger"
                        : "text-foreground bg-danger",
                className,
            ].join(" ")}
        >
            {/* Barra de progresso preenchendo o botão */}
            <span
                aria-hidden="true"
                className={[
                    "absolute inset-y-0 left-0 pointer-events-none",
                    isCompleted ? "bg-danger" : "bg-black/50",
                    isHolding ? "" : "transition-[width] duration-200 ease-out",
                ].join(" ")}
                style={{ width: `${progress}%` }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {isCompleted ? "Confirmed" : children}
            </span>
        </button>
    );
}