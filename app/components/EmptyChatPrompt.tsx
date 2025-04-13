import React from 'react'

interface EmptyChatPromptProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  uploadedFile: File | null
  youtubeLink: string
  setYoutubeLink: React.Dispatch<React.SetStateAction<string>>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
}

export default function EmptyChatPrompt({
  fileInputRef,
  uploadedFile,
  youtubeLink,
  setYoutubeLink,
  handleFileUpload,
  error
}: EmptyChatPromptProps) {
  return (
    <div className='flex h-full flex-col items-center justify-center space-y-4'>
      <div className='w-full max-w-md rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
        {!youtubeLink && !uploadedFile && (
          <>
            <p className='mb-4 text-gray-600 dark:text-white'>
              Upload an audio file or paste a YouTube link to begin
            </p>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept='audio/*,video/*'
              className='hidden'
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className='mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              Choose File
            </button>
            <input
              type='text'
              value={youtubeLink}
              onChange={e => setYoutubeLink(e.target.value)}
              placeholder='Or paste YouTube link here'
              className='w-full rounded-lg border p-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white'
            />
          </>
        )}

        {youtubeLink && !uploadedFile && (
          <>
            <div className='mb-4 break-words text-gray-700'>{youtubeLink}</div>
            <button
              onClick={() => handleFileUpload}
              className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
            >
              Generate Summary
            </button>
          </>
        )}

        {uploadedFile && !youtubeLink && (
          <>
            <div className='mb-2 text-gray-700'>{uploadedFile.name}</div>
            <button
              onClick={() => handleFileUpload}
              className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
            >
              Generate Summary
            </button>
          </>
        )}

        {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
      </div>
    </div>
  )
}
