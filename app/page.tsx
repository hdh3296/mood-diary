'use client'

import { DiaryEditor } from '@/components/DiaryEditor'
import { DiaryList } from '@/components/DiaryList'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleDiarySubmit = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <motion.h1 
          className="text-4xl font-bold text-center text-purple-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          오늘의 기분 일기
        </motion.h1>
        
        <motion.section 
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">일기 작성</h2>
          <DiaryEditor onSubmitSuccess={handleDiarySubmit} />
        </motion.section>
        
        <motion.section 
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">일기 목록</h2>
          <DiaryList key={refreshKey} />
        </motion.section>
      </div>
    </main>
  )
}