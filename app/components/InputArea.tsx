import React from 'react'
import { FiSend } from "react-icons/fi";

interface InputAreaProps {
  inputMessage: string
  setInputMessage: React.Dispatch<React.SetStateAction<string>>
  handleSend: () => void
  fileInputRef: React.RefObject<HTMLDivElement | null>
}

export default function InputArea({
  inputMessage,
  setInputMessage,
  handleSend
}: InputAreaProps) {
  return (
    <div className='border-t bg-white p-4 dark:bg-gray-900'>
      <div className='mx-auto flex max-w-4xl items-center space-x-4'>
        <input
          type='text'
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder='Ask a question...'
          className='flex-1 rounded-lg border p-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white'
        />
        <button
          onClick={handleSend}
          className='rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 dark:bg-green-500 dark:hover:bg-green-600'
        >
          <FiSend size={20}/>
        </button>
      </div>
    </div>
  )
}
