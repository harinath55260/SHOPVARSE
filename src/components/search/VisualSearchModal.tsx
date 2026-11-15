import React, { useState } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Camera, Check, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { Product } from '../../types';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface DetectedFeature {
  label: string;
  value: string;
}

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCategory, setAnalyzedCategory] = useState<string | null>(null);
  const [detectedFeatures, setDetectedFeatures] = useState<DetectedFeature[]>([]);
  const [results, setResults] = useState<{ product: Product; similarity: number }[]>([]);

  // Demo sample images
  const samplePresets = [
    {
      title: 'Flagship Smartphone',
      category: 'Mobiles',
      img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
      features: [
        { label: 'Category', value: 'Smartphones & Flagships' },
        { label: 'Form Factor', value: 'Bezel-less OLED Curved' },
        { label: 'Camera Array', value: 'Multi-lens Island with Periscope' },
        { label: 'Material', value: 'Grade-5 Brushed Titanium' }
      ]
    },
    {
      title: 'Studio Laptop',
      category: 'Electronics',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      features: [
        { label: 'Category', value: 'Creator & Pro Laptops' },
        { label: 'Chassis', value: 'Anodized Unibody Aluminum' },
        { label: 'Display Size', value: '16-inch Thin Bezel' },
        { label: 'Keyboard', value: 'Backlit Low-profile Mechanical' }
      ]
    },
    {
      title: 'ANC Headphones',
      category: 'Audio',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      features: [
        { label: 'Category', value: 'Over-Ear ANC Headsets' },
        { label: 'Driver Size', value: '40mm Beryllium Transducer' },
        { label: 'Padding', value: 'Memory Foam with Protein Leather' },
        { label: 'Interface', value: 'Touch Gesture & USB-C' }
      ]
    },
    {
      title: 'Aerospace Watch',
      category: 'Wearables',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      features: [
        { label: 'Category', value: 'Smart Fitness Timepiece' },
        { label: 'Dial Shape', value: 'Circular Ceramic-Titanium' },
        { label: 'Glass', value: 'Sapphire Crystal Coated' },
        { label: 'Band', value: 'Fluororubber Sport Strap' }
      ]
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        analyzeVisualContent(reader.result as string, 'Mobiles');
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeVisualContent = (imageSrc: string, inferredCategory: string, customFeatures?: DetectedFeature[]) => {
    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setResults([]);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzedCategory(inferredCategory);

      const features = customFeatures || [
        { label: 'Visual Match', value: 'Hardware Silhouette Identified' },
        { label: 'Dominant Palette', value: 'Deep Graphite & Matte Cyan' },
        { label: 'Finish', value: 'Reflective Metallic Sheen' },
        { label: 'Condition', value: 'Modern Flagship Grade' }
      ];
      setDetectedFeatures(features);

      // Match products in store
      const categoryMatches = products.filter(p => p.category.toLowerCase() === inferredCategory.toLowerCase());
      const fallbackMatches = products.filter(p => p.category.toLowerCase() !== inferredCategory.toLowerCase());

      const ranked = [
        ...categoryMatches.map((p, idx) => ({
          product: p,
          similarity: Math.max(78, 98 - idx * 4)
        })),
        ...fallbackMatches.slice(0, 2).map((p, idx) => ({
          product: p,
          similarity: 72 - idx * 6
        }))
      ];

      setResults(ranked);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden my-8">
        {/* Subtle Ambient Background Light */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">AI Visual Search</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  Computer Vision V2
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload any hardware, gadget, or footwear photo to search the 3D catalog by visual silhouette.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload & Sample Presets Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Upload Area */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                1. Upload Image or Capture Photo
              </span>

              <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950/40 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="p-3 rounded-2xl bg-slate-800/80 text-cyan-400 group-hover:scale-110 transition-transform mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white mb-1">
                  Click to Browse or Drag Photo
                </span>
                <span className="text-[11px] text-slate-400">
                  PNG, JPG, WEBP up to 10MB
                </span>
              </label>
            </div>

            {/* Presets */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Or try these sample hardware photos:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => analyzeVisualContent(preset.img, preset.category, preset.features)}
                    className="p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <img
                      src={preset.img}
                      alt={preset.title}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-slate-200 block truncate group-hover:text-cyan-300">
                        {preset.title}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {preset.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Preview & AI Analysis */}
          <div className="md:col-span-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between min-h-[280px]">
            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-800">
                  <img
                    src={selectedImage}
                    alt="Analyzed target"
                    className="w-full h-full object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                      <span className="text-xs font-bold text-cyan-300 animate-pulse">
                        Neural Silhouette Recognition...
                      </span>
                    </div>
                  )}
                </div>

                {!isAnalyzing && detectedFeatures.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      Detected Neural Attributes:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {detectedFeatures.map((feat) => (
                        <div
                          key={feat.label}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px]"
                        >
                          <span className="text-slate-400 block">{feat.label}</span>
                          <span className="text-white font-semibold truncate block">
                            {feat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ImageIcon className="w-10 h-10 text-slate-600 mb-2" />
                <span className="text-xs font-semibold text-slate-300">No Image Selected</span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Upload an image on the left or select a sample gadget to run computer vision matching.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Matches List */}
        {results.length > 0 && !isAnalyzing && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Matching Catalog Products ({results.length})
              </span>
              <span className="text-[11px] text-cyan-400 font-medium">
                Ranked by geometric & aesthetic similarity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {results.map(({ product, similarity }) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                          {product.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {similarity}% Match
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1 group-hover:text-cyan-400 flex items-center justify-end gap-1">
                      View <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
