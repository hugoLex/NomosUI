// "use client";

import React from "react";

export function DashboardSkeletonLoader({
  fullscreen,
}: {
  fullscreen?: boolean;
}) {
  return (
    <div className="w-full h-full p-4 animate-pulse">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="h-8 bg-gray-200 rounded-md w-48 mb-4 md:mb-0"></div>
        <div className="flex space-x-2">
          <div className="h-10 bg-gray-200 rounded-md w-24"></div>
          <div className="h-10 bg-gray-200 rounded-md w-24"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 h-32">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="flex items-center">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-6 ml-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div
        className={`mt-6 ${
          fullscreen && "h-[60vh]"
        } bg-gray-100 rounded-lg p-4`}
      >
        <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
          {fullscreen &&
            [...Array(5)].map((_, index) => (
              <div key={index} className="grid mt-10 grid-cols-4 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          {fullscreen &&
            [...Array(5)].map((_, index) => (
              <div key={index} className="grid mt-10 grid-cols-4 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          {fullscreen &&
            [...Array(5)].map((_, index) => (
              <div key={index} className="grid mt-10 grid-cols-4 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
