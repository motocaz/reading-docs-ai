"use client"

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Globe, X, File, Trash2 } from "lucide-react";

interface PostComposerMainProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNewPost: (post: any) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "file";
  name: string;
}

export function PostComposerMain({ onNewPost }: PostComposerMainProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFiles = 4;

  const handlePost = async () => {
    if ((!content.trim() && files.length === 0) || isPosting) return;

    setIsPosting(true);

    const newPost = {
      id: Date.now().toString(),
      user: {
        name: session?.user?.name || "User",
        email: session?.user?.email || "email", // Fixed from username to email
        avatar: session?.user?.image || "/placeholder.svg?height=48&width=48",
        verified: false,
      },
      content: content.trim(),
      attachments: files.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        url: file.previewUrl,
      })),
      timestamp: "now",
      likes: 0,
      retweets: 0,
      replies: 0,
    };

    setTimeout(() => {
      onNewPost(newPost);
      setContent("");
      setFiles([]);
      setIsPosting(false);
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: UploadedFile[] = [];
    const remainingSlots = maxFiles - files.length;

    Array.from(e.target.files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        const isImage = file.type.startsWith("image/");
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        newFiles.push({
          id,
          file,
          previewUrl: URL.createObjectURL(file),
          type: isImage ? "image" : "file",
          name: file.name,
        });
      });

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const characterCount = content.length;
  const maxCharacters = 280;
  const isOverLimit = characterCount > maxCharacters;
  const canPost =
    (content.trim().length > 0 || files.length > 0) &&
    !isOverLimit &&
    !isPosting;

  return (
    <div className="border-b border-slate-700 p-4">
      <div className="flex space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
          />
          <AvatarFallback className="bg-slate-700 text-slate-200">
            {session?.user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[60px] resize-none border-none bg-transparent p-0 text-xl text-slate-200 placeholder:text-slate-500 focus-visible:ring-0"
          />

          {/* File previews */}
          {files.length > 0 && (
            <div className="mt-4 mb-3">
              <div className="grid grid-cols-2 gap-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="relative group rounded-lg overflow-hidden border border-slate-700"
                  >
                    {file.type === "image" ? (
                      <div className="aspect-video bg-slate-800">
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-slate-800">
                        <File className="h-5 w-5 text-blue-400 mr-2" />
                        <div className="truncate text-sm text-slate-300">
                          {file.name}
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="absolute top-1 right-1 bg-slate-900/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="text-slate-500 text-sm">
                  {files.length} of {maxFiles} files selected
                </div>
                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="flex items-center text-red-400 hover:text-red-300 text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Everyone can reply indicator */}
          <div className="flex items-center space-x-2 mt-3 mb-4">
            <Globe className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              Everyone can reply
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef} // Now properly referenced
                className="hidden"
                multiple
                accept="image/*, .pdf, .doc, .docx, .txt"
                onChange={handleFileChange}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:bg-slate-800 p-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={files.length >= maxFiles}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              {content.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm ${isOverLimit ? "text-red-400" : "text-slate-500"
                      }`}
                  >
                    {maxCharacters - characterCount}
                  </span>
                  <div className="w-8 h-8 relative">
                    <svg
                      className="w-8 h-8 transform -rotate-90"
                      viewBox="0 0 32 32"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 14}`}
                        strokeDashoffset={`${2 *
                          Math.PI *
                          14 *
                          (1 - Math.min(characterCount / maxCharacters, 1))
                          }`}
                        className={
                          isOverLimit ? "text-red-400" : "text-blue-400"
                        }
                      />
                    </svg>
                  </div>
                </div>
              )}
              <Button
                onClick={handlePost}
                disabled={!canPost}
                className={`rounded-full px-6 py-2 font-bold ${canPost
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
                  }`}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}