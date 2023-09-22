import React from "react";

export default function Loading () {
  return (
    <div class="h-[85%] flex items-center justify-center">
      <div class="animate-spin h-6 w-6 border-t-2 border-zinc-200 rounded-full"></div>
    </div>
  )
}