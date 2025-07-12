"use client";

import React from "react";

export function DashboardSkeletonLoader() {
  return (
    <div className="w-full h-full p-4">
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="animate-pulse-slow">
        {/* Header Section */}
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-4 md:mb-0"></div>
          <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded-md w-24"></div>
            <div className="h-10 bg-gray-200 rounded-md w-32"></div>
          </div>
        </div> */}

        {/* Legal Case Cards */}
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Case Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>

              {/* Case Title */}
              <div className="mb-3">
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              </div>

              {/* Case Details Row */}
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-blue-100 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>

              {/* Expandable Content Preview */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>

              {/* Load More Button */}
              <div className="mt-4 pt-2">
                <div className="h-8 bg-blue-100 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Cases Button */}
        <div className="mt-6 flex justify-center">
          <div className="h-10 bg-blue-100 rounded-md w-40"></div>
        </div>
      </div>
    </div>
  );
}
