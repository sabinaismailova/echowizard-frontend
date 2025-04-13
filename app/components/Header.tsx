import React from 'react'

interface HeaderProps {
  clearChat: () => void
}

export default function Header({ clearChat }: HeaderProps) {
  return (
    <header className='flex items-center justify-between bg-white p-4 shadow-sm dark:bg-gray-800'>
      <div>
        <h1 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
          EchoWizard
        </h1>
      </div>
      <button
        onClick={clearChat}
        className='rounded-full p-2 transition-colors hover:bg-gray-100 dark:bg-blue-500 dark:hover:bg-blue-600'
        aria-label='Clear chat'
      >
        🗑️
      </button>
    </header>
  )
}
