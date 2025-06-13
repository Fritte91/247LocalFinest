import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('images');

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    if (images.length > 4) {
      return NextResponse.json(
        { error: 'Maximum 4 images allowed' },
        { status: 400 }
      );
    }

    console.log('Starting image upload process...');
    console.log('Number of images to upload:', images.length);

    const uploadPromises = images.map(async (image: any) => {
      try {
        // Convert the image to base64
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

        console.log('Uploading image to Cloudinary...');
        const result = await cloudinary.uploader.upload(base64Image, {
          folder: '237localfinest',
          resource_type: 'auto',
        });

        console.log('Image uploaded successfully:', result.secure_url);
        return result.secure_url;
      } catch (error: any) {
        console.error('Error uploading individual image:', error);
        throw error;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    console.log('All images uploaded successfully');
    
    return NextResponse.json({ urls: uploadedUrls });
  } catch (error: any) {
    console.error('Error in upload route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload images',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 