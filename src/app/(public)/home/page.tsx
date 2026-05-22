import * as motion from "motion/react-client"
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <motion.div
                whileHover={{
                    scale: 1.2,
                    rotate: 10
                }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.34 }}
            >
                <div className="w-30 h-30 bg-accent rounded-2xl p-4 flex items-center justify-center">
                    <Link href="login">Login!</Link>
                </div>
            </motion.div>
        </div>
    )
}