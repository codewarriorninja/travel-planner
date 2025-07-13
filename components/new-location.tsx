"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { FormEvent } from "react";


async function addLocationApi({
  tripId,
  address,
}: {
  tripId: string;
  address: string;
}) {
  const formData = new FormData();
  formData.set("address", address);

  const res = await fetch(`/api/trips/${tripId}/locations`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? "Failed to add location");
  }

  return (await res.json()) as { redirect: string };
}


export default function NewLocationClient({ tripId }: { tripId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: addLocationApi,
    onSuccess: ({ redirect }) => {
      
      queryClient.invalidateQueries({ queryKey: ["trip", tripId, "locations"] });


      router.push(redirect);
    },
  });

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = (
      e.currentTarget.elements.namedItem("address") as HTMLInputElement
    ).value.trim();

    if (!address) return;

    mutate({ tripId, address });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Add New Location
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                name="address"
                type="text"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding…" : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
