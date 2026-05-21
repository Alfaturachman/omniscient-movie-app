import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden px-4 border-t border-slate-200 dark:border-white/10">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="z-10 text-center space-y-10"
            >
                <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none">
                    OMNISCIENT<span className="text-primary">.</span>
                </h2>
                <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-3xl mx-auto">
                    The ultimate movie discovery experience.
                    <br className="hidden md:block" />
                    Built with React, Tailwind v4, and Framer Motion.
                </p>

                <div className="pt-16 flex flex-wrap items-center justify-center gap-8 text-xl font-bold">
                    <a
                        href="https://github.com/abdulrazak97/react-app-cinescope"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        Portfolio
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </motion.div>

            <div className="absolute bottom-10 text-slate-500 font-semibold text-base tracking-wide">
                &copy; {new Date().getFullYear()} OMNISCIENT. Developed by
                Alfaturachman Maulana Pahlevi.
            </div>
        </footer>
    );
}
