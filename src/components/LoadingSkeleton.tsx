import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg w-64 mx-auto"></div>
        <div className="h-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-96 mx-auto"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-1/2"></div>
              </div>
            </div>

            {/* Content Lines */}
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-full"></div>
              <div className="h-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-5/6"></div>
              <div className="h-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded w-4/6"></div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full w-16"></div>
              <div className="h-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton; 