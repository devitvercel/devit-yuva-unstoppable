import fs from 'fs';
import https from 'https';
import path from 'path';

const assetsDir = path.resolve('public/assets/pages/home');

// Ensure directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const images = [
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    name: 'beliefs-potential.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1598550476439-6847785fce6e?auto=format&fit=crop&w=800&q=80',
    name: 'beliefs-beyond.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    name: 'beliefs-community.jpg'
  }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  for (const img of images) {
    const dest = path.join(assetsDir, img.name);
    console.log(`Downloading ${img.url} to ${dest}...`);
    try {
      await download(img.url, dest);
      console.log(`Successfully downloaded ${img.name}`);
    } catch (err) {
      console.error(`Failed to download ${img.name}:`, err);
    }
  }
}

run();
