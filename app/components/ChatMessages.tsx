import React, { useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { FiCheckSquare } from 'react-icons/fi'

type Message =
  | {
      id: number
      text: string
      sender: 'user'
    }
  | { id: number; text: string; sender: 'bot' }

interface ChatMessagesProps {
  messages: Message[] | null
  isTyping: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export default function ChatMessages({
  messages,
  isTyping,
  messagesEndRef
}: ChatMessagesProps) {
  const [copied, setCopied] = useState(false)

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }
  return (
    <>
      {messages?.map(message => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`group max-w-[70%] rounded-lg p-8 ${
              message.sender === 'user'
                ? 'rounded-br-none bg-blue-600 text-white dark:bg-gray-700'
                : 'rounded-bl-none bg-gray-200 text-black dark:bg-gray-800 dark:text-white'
            } shadow-sm`}
          >
            <p className='break-words whitespace-pre-line'>{message.text}</p>

            <button
              onClick={() => copyMessage(message.text)}
              className={`mt-2 py-2 text-xs underline opacity-0 group-hover:opacity-100`}
            >
              {copied ? (
                <FiCheckSquare size={16} color={'green'} />
              ) : (
                <FiCopy size={16} />
              )}
            </button>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className={`flex justify-start p-2`}>
          <div
            className={`flex max-w-[70%] rounded-lg rounded-bl-none bg-gray-200 p-8 text-black shadow-sm dark:bg-gray-800 dark:text-white`}
          >
            <p className='mr-2'>EchoWizard is typing</p>
            <div className='flex items-center space-x-2'>
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.2s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.4s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.6s]' />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  )
}
