'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Moved templates data to a separate file for better organization
import { templates } from './components/templates-data';

// Animation variants
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 15 
    } 
  },
  hover: { 
    scale: 1.01, 
    boxShadow: "0 12px 25px rgba(37, 99, 235, 0.3)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.97 },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 10, 
    transition: { duration: 0.25 } 
  },
};

const filterVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  },
};

const headerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    }
  }
};

const headerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(templates.map(t => t.category))];
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Background shapes with reduced blur for better performance */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full blur-xl opacity-10 bg-blue-500" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-3xl blur-lg opacity-10 bg-blue-500" />
        <div className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full blur-xl opacity-10 bg-blue-500" />
      </div>

      <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          {/* Badge */}
          <motion.div
            variants={headerItem}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 12px rgba(37, 99, 235, 0.5)" 
            }}
            className="inline-flex items-center px-5 py-3 rounded-full bg-white shadow-lg text-blue-600 font-medium mb-8 cursor-default select-none"
            aria-label="New template collection"
          >
            <FiZap className="mr-2 animate-pulse" />
            Koleksi Template Terbaru
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={headerItem}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-gray-900">Temukan Template</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Link in Bio <span className="text-gray-900">Sempurna</span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={{
              ...headerItem,
              visible: { 
                ...headerItem.visible,
                transition: { duration: 0.6, delay: 0.1 } 
              }
            }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Transformasikan link Anda menjadi pengalaman digital yang memukau dengan koleksi template premium kami
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.6, 
                  ease: "easeOut" 
                } 
              }
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="#templates"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              aria-label="Explore templates"
            >
              Jelajahi Sekarang <FiArrowRight className="inline ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </header>

      <main id="templates">
        <section className="py-12 px-6 max-w-7xl mx-auto">
          {/* Category filters */}
          <motion.div
            className="flex overflow-x-auto pb-8 mb-12 scrollbar-hide"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0, y: -20 },
              animate: { 
                opacity: 1, 
                y: 0, 
                transition: { staggerChildren: 0.08 } 
              }
            }}
            role="list"
            aria-label="Filter templates by category"
          >
            <AnimatePresence initial={false}>
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all mx-2 first:ml-0 last:mr-0
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}
                  `}
                  variants={filterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  aria-pressed={activeCategory === category}
                  role="listitem"
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Template grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
            key={activeCategory}
            role="grid"
            aria-label="Template cards"
          >
            <AnimatePresence>
              {filteredTemplates.map((template) => (
                <motion.article
                  key={template.url}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  className="group h-full rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col bg-white transition-all duration-300"
                  role="article"
                  aria-labelledby={`template-${template.name.replace(/\s+/g, '-').toLowerCase()}-title`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={template.image}
                      alt={`Preview of ${template.name} template`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103 hover:rotate-1"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={filteredTemplates.indexOf(template) < 4} // Only prioritize first few images
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 
                      id={`template-${template.name.replace(/\s+/g, '-').toLowerCase()}-title`}
                      className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                    >
                      {template.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={template.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                      aria-label={`View ${template.name} template details`}
                    >
                      Lihat Demo
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
              Siap Membuat Link in Bio <span className="text-blue-600">Profesional?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Mulai dalam 1 menit tanpa perlu keterampilan teknis
            </p>
            <motion.a
              href="https://sanzy.bio/get-started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get started for free"
            >
              Mulai Sekarang Gratis
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}