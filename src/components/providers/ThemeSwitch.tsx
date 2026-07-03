"use client";

import { Icon } from "@components/Icon";
import { Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ThemeSwitch() {
    const { resolvedTheme, setTheme } = useTheme();
    const [hovered, setHovered] = useState(false);

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed right-0 bottom-0 m-2 overflow-hidden flex items-center gap-2 h-11"
        >
            <Icon name="Brush" />
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            width: 0,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            width: "auto",
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            width: 0,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                        className="overflow-hidden"
                    >
                        <Chip>
                            Toggle {isDark ? "Light" : "Dark"} Mode
                        </Chip>
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}