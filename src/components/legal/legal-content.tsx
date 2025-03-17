"use client"

import { motion } from "framer-motion"

interface Section {
  title: string
  content: string
}

interface LegalContentProps {
  content: {
    title: string
    lastUpdated: string
    sections: Section[]
  }
}

export default function LegalContent({ content }: LegalContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-sm p-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-muted-foreground">Last Updated: {content.lastUpdated}</p>
      </motion.div>

      <motion.div className="space-y-6">
        {content.sections.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

