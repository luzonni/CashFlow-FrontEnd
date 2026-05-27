"use client";

import { Spinner } from "@heroui/react";
import { motion } from "motion/react";

export default function LoadingScreen() {
    return (
        <section className="h-screen bg-background p-5 overflow-hidden">
            <div className="w-full h-full bg-background-tertiary flex items-center justify-center rounded-2xl">
                
                <motion.div
                    initial={{
                        y: -300,
                        rotate: -12,
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        y: 0,
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.9,
                        type: "spring",
                        stiffness: 120,
                        damping: 10,
                        mass: 1.2,
                    }}
                    className="flex flex-row justify-center items-center gap-2 bg-background p-5 rounded-2xl shadow-xl"
                >
                    <Spinner />
                    Loading...
                </motion.div>

            </div>
        </section>
    );
}