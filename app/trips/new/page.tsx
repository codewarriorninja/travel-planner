'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTripApi } from "@/lib/api/createTrip";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateTrip = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const {mutate, isPending} = useMutation({
    mutationFn: createTripApi,
    onSuccess: () => router.push("/trips")
  })
  
  function handleSubmit() {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    if(imageUrl) data.append("imageUrl", imageUrl);
    mutate(data); 
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.title && formData.description && formData.startDate && formData.endDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Your Journey
          </h1>
          <p className="text-slate-600 text-lg">Plan your next adventure with style</p>
        </div>

        {/* Main Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">New Trip</h2>
                <p className="text-blue-100 opacity-90">Fill in the details below</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Title Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3 transition-colors group-focus-within:text-blue-600">
                  Trip Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="My Amazing Adventure..."
                  className={cn(
                    "w-full border-2 border-slate-200 px-4 py-4 rounded-xl",
                    "focus:border-blue-500 focus:outline-none transition-all duration-200",
                    "placeholder:text-slate-400 text-slate-700 font-medium",
                    "hover:border-slate-300 bg-slate-50/50 hover:bg-white/80"
                  )}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3 transition-colors group-focus-within:text-blue-600">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your exciting journey..."
                  rows={4}
                  className={cn(
                    "w-full border-2 border-slate-200 px-4 py-4 rounded-xl",
                    "focus:border-blue-500 focus:outline-none transition-all duration-200",
                    "placeholder:text-slate-400 text-slate-700 font-medium resize-none",
                    "hover:border-slate-300 bg-slate-50/50 hover:bg-white/80"
                  )}
                  required
                />
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3 transition-colors group-focus-within:text-blue-600">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className={cn(
                      "w-full border-2 border-slate-200 px-4 py-4 rounded-xl",
                      "focus:border-blue-500 focus:outline-none transition-all duration-200",
                      "text-slate-700 font-medium hover:border-slate-300 bg-slate-50/50 hover:bg-white/80"
                    )}
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3 transition-colors group-focus-within:text-blue-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className={cn(
                      "w-full border-2 border-slate-200 px-4 py-4 rounded-xl",
                      "focus:border-blue-500 focus:outline-none transition-all duration-200",
                      "text-slate-700 font-medium hover:border-slate-300 bg-slate-50/50 hover:bg-white/80"
                    )}
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Trip Image
                </label>
                
                {imageUrl ? (
                  <div className="relative mb-6 group overflow-hidden rounded-xl">
                    <Image
                      src={imageUrl}
                      alt="Trip Preview"
                      className="w-full rounded-xl shadow-lg max-h-64 object-cover transition-all duration-300 group-hover:scale-105"
                      width={600}
                      height={256}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <p className="text-white font-medium">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center mb-6 hover:border-blue-400 transition-all duration-200 bg-slate-50/50 hover:bg-blue-50/50 group">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-600 font-medium text-lg mb-2">Upload a beautiful image</p>
                    <p className="text-slate-500 text-sm">Make your trip memorable with a stunning photo</p>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <UploadButton
                    endpoint={'imageUploader'}
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.ufsUrl) setImageUrl(res[0].ufsUrl);
                    }}
                    onUploadError={(err) => console.error("Upload error:", err)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={isPending || !isFormValid} 
                  className={cn(
                    "w-full py-4 text-lg font-semibold rounded-xl",
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                    "shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
                    "border-0 text-white"
                  )}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Your Trip...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Create Trip</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500">
          <p>Ready to explore the world? Let's make it happen! ✈️</p>
        </div>
      </div>
    </div>
  )
}

export default CreateTrip