import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const s3BucketName = 'sitproto'; // Replace with your S3 bucket name
  const awsRegion = 'us-east-2'; // Replace with your S3 bucket's region

  // Create S3 Client with access key and secret key
  const s3Client = new S3Client({
    region: awsRegion,
    credentials: {
      accessKeyId: '', // Replace with your access key
      secretAccessKey: '', // Replace with your secret key
    },
  });

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file.');
      return;
    }

    const uploadPromises = selectedFiles.map(async (file) => {
      const params = {
        Bucket: s3BucketName,
        Key: file.name,
        Body: file,
      };

      try {
        // Upload file to S3
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('File uploaded successfully:', data.Location);

        // Call the Semantic Image Tagger API
        const response = await fetch(`https://semantic-image-tagger.vercel.app/upload/${file.name}`, {
          method: 'GET',
        });

        const result = await response.json();
        return { fileName: file.name, tags: result.tags || [] };
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file.');
        return { fileName: file.name, tags: [] };
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const allTags = results.flatMap((result) => result.tags);
      setTags([...new Set(allTags)]); // Store unique tags
      alert('Files uploaded successfully and tags fetched!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload & Tag</button>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          {selectedFiles.map((file, index) => (
            <div key={index}>
              <p>{file.name}</p>
              <p>Tags: {tags.filter((tag) => tag.fileName === file.name).map(tag => tag.join(', ')).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
