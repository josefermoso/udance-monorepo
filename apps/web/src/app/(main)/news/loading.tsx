export default function NewsLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
      </div>

      {/* Featured Section Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow border">
              <div className="aspect-video bg-gray-200 rounded-t-lg animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Articles Skeleton */}
      <div>
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow border">
              <div className="aspect-video bg-gray-200 rounded-t-lg animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
