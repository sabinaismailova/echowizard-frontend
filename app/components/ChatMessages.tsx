import React from 'react'

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
  copyMessage: (text: string) => void
}

export default function ChatMessages({
  messages,
  isTyping,
  messagesEndRef,
  copyMessage
}: ChatMessagesProps) {
  return (
    <>
      {messages?.map(message => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === 'user'
                ? 'rounded-br-none bg-blue-600 text-white dark:bg-gray-700'
                : 'rounded-bl-none bg-gray-200 text-black dark:bg-gray-800 dark:text-white'
            } shadow-sm`}
          >
            <p className='break-words whitespace-pre-line'>{message.text}</p>

            <button
              onClick={() => copyMessage(message.text)}
              className='mt-2 text-xs underline'
            >
              Copy
            </button>
          </div>
        </div>
      ))}
      {isTyping && <div className='text-gray-500 italic'>EchoWizard is typing...</div>}
      <div ref={messagesEndRef} />
    </>
  )
}
