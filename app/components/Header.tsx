import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

interface HeaderProps {
  clearChat: () => void
}

export default function Header({ clearChat }: HeaderProps) {
  return (
    <header className='flex items-center justify-between bg-white p-4 shadow-sm dark:bg-gray-800'>
      <div>
        <h1 className='px-2 text-xl font-semibold text-gray-800 dark:text-gray-100'>
          EchoWizard
        </h1>
      </div>
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to clear the chat?')) {
            clearChat()
          }
        }}
        className='rounded-full p-2 transition-colors hover:bg-gray-100 dark:bg-green-500 dark:hover:bg-green-600'
        aria-label='Clear chat'
      >
        <FiTrash2 size={20} />
      </button>
    </header>
  )
}
