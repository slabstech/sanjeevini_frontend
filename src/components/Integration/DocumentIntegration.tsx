// src/components/DocumentIntegration.tsx
import React, { useEffect, useRef } from 'react';


interface DocumentIntegrationProps {
  url: string;
}

const DocumentIntegration: React.FC<DocumentIntegrationProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  return <canvas ref={canvasRef} />;
};

export default DocumentIntegration;
