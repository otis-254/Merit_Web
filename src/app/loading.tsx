export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary-500"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
} 