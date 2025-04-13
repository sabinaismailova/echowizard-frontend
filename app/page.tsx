'use client'
import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatMessages from './components/ChatMessages'
import EmptyChatPrompt from './components/EmptyChatPrompt'
import InputArea from './components/InputArea'
import YoutubeEmbedVideo from 'youtube-embed-video'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
  file?: File | null
  link?: string
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [youtubeLink, setYoutubeLink] = useState<string>('')
  const [summaryFileUri, setSummaryFileUri] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>('')
  const [mimeType, setMimeType] = useState<string>('')
  const [fileUrl, setFileUrl] = useState<string>('')

  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const [error, setError] = useState<string>('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleFileUpload = async () => {
    let file = uploadedFile
    try {
      setIsTyping(true)

      const formData = new FormData()

      if (file) {
        formData.append('audio', file)
      } else if (youtubeLink) {
        formData.append('youtubeUrl', youtubeLink)
      } else {
        setError('Please upload a valid audio or video file')
      }

      const summary = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/summarize-upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!summary.ok) {
        throw new Error('Failed to get summary from server')
      }

      const data = await summary.json()

      setTranscript(data.transcript)
      setSummaryFileUri(data.fileUri)
      setMimeType(data.mimeType)

      const botResponse: Message = {
        id: Date.now(),
        text: data.summary,
        sender: 'bot'
      }

      if (youtubeLink) {
        setError('')
      } else if (file) {
        console.log('regularFile: ', data.fileUri)
        setUploadedFile(file)
        setFileUrl(URL.createObjectURL(file))
        setError('')
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error getting summary:', error)
      setError('Failed to generate summary')
    } finally {
      setIsTyping(false)
    }
  }

  function extractYouTubeId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleSend = async () => {
    if (!inputMessage) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    console.log('messages: ', messages)
    console.log('user messages: ', userMessage)
    console.log('file uri: ', summaryFileUri)

    try {
      if (!summaryFileUri || !transcript || !mimeType) {
        setError('Missing summary data. Please generate a summary first.')
        return
      }

      const formData = new FormData()

      formData.append('fileUri', summaryFileUri)
      formData.append('transcript', transcript)
      formData.append('mimeType', mimeType)
      formData.append('question', userMessage.text)

      const answer = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/answer`,
        {
          method: 'POST',
          body: formData
        }
      )

      const answerData = await answer.json()

      const botMessage: Message = {
        id: Date.now() + 1,
        text: answerData,
        sender: 'bot'
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error fetching answer:', error)
      setError('Something went wrong while answering your question.')
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className='dark flex h-screen max-h-[100%] w-screen flex-1 flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <Header
        clearChat={() => {
          setMessages([])
          setUploadedFile(null)
          setYoutubeLink('')
        }}
      />
      <div className='flex-1 space-y-4 bg-gray-50 p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100 px-10'>
        {messages.length === 0 ? (
          <EmptyChatPrompt
            fileInputRef={fileInputRef}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            youtubeLink={youtubeLink}
            setYoutubeLink={setYoutubeLink}
            handleFileUpload={handleFileUpload}
            error={error}
          />
        ) : (
          <>
            {uploadedFile ? (
              <div className="max-w-[70%] w-fit rounded-lg p-8 rounded-bl-none bg-gray-200 text-black dark:bg-gray-800 dark:text-white shadow-sm">
                <p>{uploadedFile.name}</p>
                <audio controls className="py-1">
                  <source src={fileUrl} type='audio/mpeg' />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="max-w-[70%] w-fit rounded-lg p-8 rounded-bl-none bg-gray-200 text-black dark:bg-gray-800 dark:text-white shadow-sm">
                <YoutubeEmbedVideo
                  videoId={extractYouTubeId(youtubeLink)}
                  suggestions={false}
                />
              </div>
            )}
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              copyMessage={text => navigator.clipboard.writeText(text)}
            />
          </>
        )}
      </div>
      <InputArea
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSend={handleSend}
        fileInputRef={fileInputRef}
      />
    </div>
  )
}
