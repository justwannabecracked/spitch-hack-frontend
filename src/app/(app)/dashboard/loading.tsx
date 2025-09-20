export default function Loading() {
  return (
    <div className="flex flex-col h-screen items-center p-4">
      <div className="w-full max-w-md space-y-3 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
