const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Minimal pure Node PNG generator using standard built-in zlib
function createPNG(width, height, isMaskable = false) {
  // RGBA buffer: each row has 1 filter byte + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Base gradient: Emerald Green (#064e3b to #059669 to #0f766e)
      const gradT = (x + y) / (width + height);
      let r = Math.floor(6 + gradT * 9);
      let g = Math.floor(78 + gradT * 72);
      let b = Math.floor(59 + gradT * 51);
      let a = 255;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Maskable doesn't round outer corners, standard can have rounded corners
      if (!isMaskable && dist > radius * 1.15) {
        // Soft rounded corners
        const cornerDist = Math.max(Math.abs(dx), Math.abs(dy));
        if (cornerDist > cx - 20) {
          // rounded square margin
          const rx = Math.max(0, Math.abs(dx) - (cx - 40));
          const ry = Math.max(0, Math.abs(dy) - (cy - 40));
          if (Math.sqrt(rx * rx + ry * ry) > 40) {
            a = 0;
          }
        }
      }

      // Draw 3D Shopping Cart & Box Icon in center
      // Center icon is within 60% of width
      const nx = (x - cx) / (width * 0.5);
      const ny = (y - cy) / (height * 0.5);

      // Cart basket: ny between 0.0 and 0.4, nx between -0.4 and 0.4
      if (ny > 0.0 && ny < 0.4 && nx > -0.45 && nx < 0.45) {
        // Sloped basket
        const basketY = (nx + 0.45) * 0.2;
        if (Math.abs(ny - 0.2 - basketY) < 0.06 || Math.abs(ny - 0.35) < 0.04) {
          r = 255; g = 255; b = 255; // White cart wire
        }
      }

      // 3D Isometric Cube floating on top: ny between -0.5 and 0.0
      // Isometric diamond: |nx| + |ny + 0.25| * 1.5 < 0.35
      if (Math.abs(nx) + Math.abs(ny + 0.25) * 1.4 < 0.35) {
        // 3D faces
        if (ny + 0.25 < -Math.abs(nx) * 0.5) {
          // Top face: bright cyan-emerald
          r = 110; g = 231; b = 183;
        } else if (nx < 0) {
          // Left face: emerald
          r = 16; g = 185; b = 129;
        } else {
          // Right face: cyan
          r = 6; g = 182; b = 212;
        }
      }

      // Wheels: circles at ny = 0.55, nx = -0.2 and nx = 0.25
      const wheel1 = Math.sqrt((nx + 0.2) ** 2 + (ny - 0.55) ** 2);
      const wheel2 = Math.sqrt((nx - 0.25) ** 2 + (ny - 0.55) ** 2);
      if (wheel1 < 0.1 || wheel2 < 0.1) {
        r = 52; g = 211; b = 153;
        if (wheel1 < 0.04 || wheel2 < 0.04) {
          r = 6; g = 78; b = 59;
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // Compress using zlib Deflate
  const compressed = zlib.deflateSync(rawData);

  // Build PNG chunks
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: RGBA (6)
  ihdr[10] = 0; // Compression method: deflate
  ihdr[11] = 0; // Filter method: standard
  ihdr[12] = 0; // Interlace: none

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeInt32BE(crc, 8 + len);
  return chunk;
}

// Standard CRC32 table implementation
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return c ^ -1;
}

const publicDir = path.resolve(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, false));

console.log('✅ All PWA PNG icons successfully generated in /public/');
