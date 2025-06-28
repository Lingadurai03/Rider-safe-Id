'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function StepWrapper({
    stepKey,
    children,
}: {
    stepKey: string;
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={stepKey}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
