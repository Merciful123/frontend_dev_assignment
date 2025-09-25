"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { memo } from "react";


const WorkerCard = memo(function WorkerCard({ worker }: { worker: WorkerType }) {
  return (
    <div className="border border-violet-200 rounded-lg overflow-hidden shadow hover:shadow-2xl transition-all duration-300 bg-white ">
      <div className="w-full h-48 relative">
        <Image
          sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw, 
               33vw"
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          unoptimized={true} 
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk6Meob1o3UwkUeeJpJYei6kYb6q8W36jL2uJ4hzNaz/2Q=="
        />
      </div>
      <div className="p-4">
        <h2 className="text-md font-semibold line-clamp-1">{worker.name}</h2>
        <p className="text-gray-500 text-sm mt-2">
          <span className="p-1 bg-violet-100 rounded-md">{worker.service}</span>
        </p>
        <p className="mt-2 text-sm font-medium text-violet-600">
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </p>
      </div>
    </div>
  );
});

WorkerCard.displayName = 'WorkerCard';

export default WorkerCard;