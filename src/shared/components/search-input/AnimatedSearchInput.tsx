'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/shared/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Send,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from 'lucide-react'
import useDebounce from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  short?: string
  end?: string
}

interface SearchResult {
  actions: Action[]
}

const allActions = [
  {
    id: '1',
    label: 'Book tickets',
    icon: <PlaneTakeoff className='h-4 w-4 text-blue-500' />,
    description: 'Operator',
    short: '⌘K',
    end: 'Agent',
  },
  {
    id: '2',
    label: 'Summarize',
    icon: <BarChart2 className='h-4 w-4 text-orange-500' />,
    description: 'gpt-4o',
    short: '⌘cmd+p',
    end: 'Command',
  },
  {
    id: '3',
    label: 'Screen Studio',
    icon: <Video className='h-4 w-4 text-purple-500' />,
    description: 'gpt-4o',
    short: '',
    end: 'Application',
  },
  {
    id: '4',
    label: 'Talk to Jarvis',
    icon: <AudioLines className='h-4 w-4 text-green-500' />,
    description: 'gpt-4o voice',
    short: '',
    end: 'Active',
  },
  {
    id: '5',
    label: 'Translate',
    icon: <Globe className='h-4 w-4 text-blue-500' />,
    description: 'gpt-4o',
    short: '',
    end: 'Command',
  },
]

function AnimatedSearchInput({
  className,
  placeholder,
  actions = allActions,
}: {
  className?: string
  placeholder?: string
  actions?: Action[]
}) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      return
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions })
      return
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    const filteredActions = allActions.filter((action) => {
      const searchableText = action.label.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })

    setResult({ actions: filteredActions })
  }, [debouncedQuery, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsTyping(true)
  }

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Reset selectedAction when focusing the input
  const handleFocus = () => {
    setSelectedAction(null)
    setIsFocused(true)
  }

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'relative flex flex-col items-center justify-start',
          isFocused ? 'min-h-[300px]' : '',
        )}
      >
        <div className='sticky top-0 z-10 w-full bg-header pb-1 pt-4'>
          {/* <div className='sticky top-0 z-10 w-full max-w-sm bg-header pb-1 pt-4'> */}
          <div className='relative'>
            <Input
              type='text'
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className='h-9 rounded-lg py-1.5 pl-3 pr-9 text-sm focus-visible:ring-offset-0'
            />
            <div className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2'>
              <AnimatePresence mode='popLayout'>
                {query.length > 0 ? (
                  <motion.div
                    key='send'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className='h-4 w-4 text-gray-400 dark:text-gray-500' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='search'
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className='h-4 w-4 text-gray-400 dark:text-gray-500' />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className='relative w-full max-w-sm'>
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className={cn(
                  'absolute mt-1 w-full overflow-hidden rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-black',
                  isFocused ? 'z-[9999]' : 'z-0',
                )}
                variants={container}
                initial='hidden'
                animate='show'
                exit='exit'
              >
                <motion.ul>
                  {result.actions.map((action) => (
                    <motion.li
                      key={action.id}
                      className='flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-900'
                      variants={item}
                      layout
                      onClick={() => setSelectedAction(action)}
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-gray-500'>{action.icon}</span>
                          <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {action.label}
                          </span>
                          <span className='text-xs text-gray-400'>
                            {action.description}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-400'>
                          {action.short}
                        </span>
                        <span className='text-right text-xs text-gray-400'>
                          {action.end}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className='mt-2 border-t border-gray-100 px-3 py-2 dark:border-gray-800'>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>Press ⌘K to open commands</span>
                    <span>ESC to cancel</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AnimatedSearchInput
