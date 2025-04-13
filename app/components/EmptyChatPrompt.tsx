import React from 'react'
import { FiUpload } from 'react-icons/fi'

interface EmptyChatPromptProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  uploadedFile: File | null
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>
  youtubeLink: string
  setYoutubeLink: React.Dispatch<React.SetStateAction<string>>
  handleFileUpload: () => void
  loading: boolean
  error: string
}

export default function EmptyChatPrompt({
  fileInputRef,
  uploadedFile,
  setUploadedFile,
  youtubeLink,
  setYoutubeLink,
  handleFileUpload,
  loading,
  error
}: EmptyChatPromptProps) {
  return (
    <>
      {loading ? (
        <div className={`flex justify-start p-2`}>
          <div
            className={`flex max-w-[70%] rounded-lg rounded-bl-none bg-gray-200 p-8 text-black shadow-sm dark:bg-gray-800 dark:text-white`}
          >
            <p className='mr-2'>EchoWizard is summarizing the audio</p>
            <div className='flex items-center space-x-2'>
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.2s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.4s]' />
              <div className='h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:.6s]' />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex h-full flex-col items-center justify-center space-y-4'>
          <div className='flex w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
            {!youtubeLink && !uploadedFile && (
              <>
                <p className='mb-4 text-gray-600 dark:text-white'>
                  Upload an audio file to begin
                </p>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={e => {
                    setUploadedFile(
                      e.target.files?.[0] as React.SetStateAction<File | null>
                    )
                  }}
                  accept='audio/*,video/*'
                  className='hidden'
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='mb-4 h-14 w-14 rounded-lg bg-green-500 p-4 font-bold text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                >
                  <FiUpload size={24} />
                </button>
                <input
                  type='text'
                  value={youtubeLink}
                  onChange={e => setYoutubeLink(e.target.value)}
                  placeholder='Or paste YouTube link here'
                  className='w-full rounded-lg border p-2 text-white dark:bg-gray-800 dark:text-white'
                />
              </>
            )}

            {youtubeLink && !uploadedFile && (
              <>
                <div className='mb-8 rounded-lg border-1 px-2 py-1 break-words dark:bg-gray-800 dark:text-white'>
                  {youtubeLink}
                </div>
                <button
                  onClick={handleFileUpload}
                  className='rounded-lg bg-green-500 px-4 py-2 transition-colors hover:bg-green-500 dark:text-white'
                >
                  Generate Summary
                </button>
              </>
            )}

            {uploadedFile && !youtubeLink && (
              <>
                <div className='mb-8 rounded-lg border-1 px-2 py-1 dark:bg-gray-800 dark:text-white'>
                  {uploadedFile.name}
                </div>
                <button
                  onClick={handleFileUpload}
                  className='rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-500'
                >
                  Generate Summary
                </button>
              </>
            )}

            {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
          </div>
        </div>
      )}
    </>
  )
}
