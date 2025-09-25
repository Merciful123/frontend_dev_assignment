"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import("../../workers.json");
        setWorkersData(response.default);
      } catch (error) {
        console.error("Failed to load workers:", error);
      }
    };
    loadData();
    loadData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 bg-violet-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Workers</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {workersData
          .filter((worker) => worker.pricePerDay > 0)
          .filter((worker) => worker.id !== null)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((worker: WorkerType) => (
            <div
              key={worker.id}
              className="border border-violet-200 rounded-lg overflow-hidden shadow hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className="object-cover"
                  priority={worker.id <= 10}
                />
              </div>
              <div className="p-4">
                <h2 className="text-md">{worker.name}</h2>
                <p className="text-gray-500 text-sm">
                  <span className="p-1 bg-violet-100 rounded-md">{worker.service}</span>
                </p>
                <p className="mt-2 text-sm">
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
