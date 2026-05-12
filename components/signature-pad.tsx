"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type SignaturePadVariant = "default" | "outline";
type SignaturePadSize = "sm" | "md" | "lg";

interface SignaturePadProps {
  variant?: SignaturePadVariant;
  size?: SignaturePadSize;
  onSave?: (dataUrl: string) => void;
  onChange?: (dataUrl: string | null) => void;
  onSignature?: (signed: boolean) => void;
  className?: string;
}

const sizeClasses: Record<SignaturePadSize, string> = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

const COVERAGE_SAMPLE_STEP = 10;
const COVERAGE_THRESHOLD = 0.01;

function checkCoverage(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width / window.devicePixelRatio,
    canvas.height / window.devicePixelRatio,
  );
  const data = imageData.data;
  let painted = 0;
  let total = 0;
  for (let y = 0; y < imageData.height; y += COVERAGE_SAMPLE_STEP) {
    for (let x = 0; x < imageData.width; x += COVERAGE_SAMPLE_STEP) {
      total++;
      const i = (y * imageData.width + x) * 4;
      if (data[i + 3] > 0) painted++;
    }
  }
  return total > 0 && painted / total >= COVERAGE_THRESHOLD;
}

export default function SignaturePad({
  variant = "default",
  size = "md",
  onSave,
  onChange,
  onSignature,
  className,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const point = getCoordinates(e);
    if (!point) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    lastPoint.current = point;
    setIsDrawing(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const point = getCoordinates(e);
    if (!point) return;
    const ctx = getCanvasContext();
    if (!ctx || !lastPoint.current) return;

    const midX = (lastPoint.current.x + point.x) / 2;
    const midY = (lastPoint.current.y + point.y) / 2;
    ctx.quadraticCurveTo(lastPoint.current.x, lastPoint.current.y, midX, midY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    lastPoint.current = point;
    setHasSignature(true);

    const canvas = canvasRef.current;
    if (canvas && onChange) {
      onChange(canvas.toDataURL());
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPoint.current = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = getCanvasContext();
    if (ctx) {
      ctx.beginPath();
    }

    if (canvas && onSave) {
      onSave(canvas.toDataURL());
    }

    const isCovered = checkCoverage(canvas);
    onSignature?.(isCovered);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onChange?.(null);
    onSignature?.(false);
  };

  const isOutline = variant === "outline";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "relative w-full rounded-lg border-2 border-dashed",
          isOutline
            ? "border-muted-foreground/50"
            : "border-border bg-white",
          sizeClasses[size],
        )}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none rounded-lg"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm text-muted-foreground select-none">
              Sign here
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearSignature}
          disabled={!hasSignature}
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
}
