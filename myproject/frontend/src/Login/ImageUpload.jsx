import React, { useState } from 'react';

const ImageUpload = ({ onNext }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Calculate how many more images we can add
    const remainingSlots = 5 - uploadedImages.length;
    
    if (remainingSlots <= 0) {
      setError('You can only upload up to 5 images');
      return;
    }
    
    // Only take the number of files that fit within the limit
    const filesToProcess = imageFiles.slice(0, remainingSlots);
    
    if (imageFiles.length > remainingSlots) {
      setError(`Only ${remainingSlots} more image(s) can be added. You can upload up to 5 images total.`);
    }

    filesToProcess.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Each image must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name
        };
        
        setUploadedImages(prev => [...prev, newImage]);
        if (filesToProcess.length <= remainingSlots && imageFiles.length <= remainingSlots) {
          setError('');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    setError('');
  };

  const handleSubmit = () => {
    if (uploadedImages.length < 2) {
      setError('Please upload at least 2 images');
      return;
    }

    // Convert images to base64 or handle file upload logic here
    const imageData = uploadedImages.map(img => ({
      name: img.name,
      data: img.preview // This would be the base64 data
    }));

    onNext(imageData);
  };

  const datingBgStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: `
      linear-gradient(135deg, #ff6b9d 0%, #c44569 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%),
      radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.3) 0%, transparent 50%)
    `,
    backgroundSize: '400% 400%, 100% 100%, 100% 100%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
    paddingTop: '100px',
    paddingBottom: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 32,
    boxShadow: '0 20px 60px rgba(255, 107, 157, 0.2)',
    padding: 40,
    maxWidth: 700,
    width: 'calc(100% - 40px)',
    margin: '0 20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 16,
  };

  const subtitleStyle = {
    color: '#6c757d',
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 1.5,
  };

  const uploadAreaStyle = {
    border: `3px dashed ${dragActive ? '#ff6b9d' : 'rgba(255, 107, 157, 0.3)'}`,
    borderRadius: 20,
    padding: 40,
    marginBottom: 24,
    background: dragActive ? 'rgba(255, 107, 157, 0.05)' : 'rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    border: 'none',
    borderRadius: 16,
    padding: '16px 32px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(255, 107, 157, 0.3)',
    transition: 'all 0.3s ease',
    marginTop: 24,
  };

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 16,
    marginBottom: 24,
  };

  const imageItemStyle = {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: '1',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const removeButtonStyle = {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: 24,
    height: 24,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: '#ff4757',
  };

  return (
    <div style={datingBgStyle}>
      <div style={cardStyle}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
        }}>
          <span style={{ fontSize: '24px', color: 'white' }}>📸</span>
        </div>

        <h2 style={titleStyle}>Show Your Best Self</h2>
        <p style={subtitleStyle}>
          Upload 2-5 photos that represent you. Your first photo will be your main profile picture.
        </p>

        {error && (
          <div style={{
            color: '#e53e3e',
            background: 'rgba(229, 62, 62, 0.1)',
            padding: '12px 16px',
            borderRadius: 12,
            marginBottom: 20,
            border: '1px solid rgba(229, 62, 62, 0.2)',
          }}>
            {error}
          </div>
        )}

        <div
          style={{
            ...uploadAreaStyle,
            opacity: uploadedImages.length >= 5 ? 0.5 : 1,
            cursor: uploadedImages.length >= 5 ? 'not-allowed' : 'pointer',
          }}
          onDragEnter={uploadedImages.length < 5 ? handleDrag : undefined}
          onDragLeave={uploadedImages.length < 5 ? handleDrag : undefined}
          onDragOver={uploadedImages.length < 5 ? handleDrag : undefined}
          onDrop={uploadedImages.length < 5 ? handleDrop : undefined}
          onClick={() => uploadedImages.length < 5 && document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            multiple={uploadedImages.length < 5}
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            disabled={uploadedImages.length >= 5}
          />
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <h3 style={{ color: '#ff6b9d', marginBottom: 8 }}>
            {uploadedImages.length >= 5 ? 'Maximum 5 photos reached' : 'Drag & drop your photos here'}
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>
            {uploadedImages.length >= 5 
              ? 'Remove a photo to add more' 
              : 'or click to browse (JPG, PNG, GIF up to 5MB each)'
            }
          </p>
        </div>

        {uploadedImages.length > 0 && (
          <div style={imageGridStyle}>
            {uploadedImages.map((image, index) => (
              <div key={image.id} style={imageItemStyle}>
                <img
                  src={image.preview}
                  alt={`Upload ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    background: 'rgba(255, 107, 157, 0.9)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                  }}>
                    MAIN
                  </div>
                )}
                <button
                  style={removeButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{
          color: '#6c757d',
          fontSize: 14,
          marginBottom: 16
        }}>
          {uploadedImages.length}/5 photos uploaded
          {uploadedImages.length > 0 && uploadedImages.length < 2 &&
            ` (${2 - uploadedImages.length} more required)`
          }
        </div>

        <button
          style={{
            ...buttonStyle,
            opacity: uploadedImages.length < 2 ? 0.5 : 1,
            cursor: uploadedImages.length < 2 ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmit}
          disabled={uploadedImages.length < 2}
        >
          Complete Profile 💕
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;