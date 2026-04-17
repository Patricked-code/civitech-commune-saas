function sanitizeFilename(filename) {
  return String(filename || 'document.bin').replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function prepareUpload(payload) {
  const filename = sanitizeFilename(payload.originalFilename);
  const uploadId = 'upl_' + Date.now();
  const storageKey = `uploads/${payload.tenantId || 'tenant'}/${uploadId}-${filename}`;

  return {
    uploadId,
    storageKey,
    originalFilename: filename,
    mimeType: payload.mimeType || 'application/octet-stream',
    maxSizeBytes: 10 * 1024 * 1024,
    uploadMode: 'simulated_prepare',
    uploadUrl: `/simulated-upload/${storageKey}`,
    expiresInSeconds: 900,
  };
}

module.exports = {
  prepareUpload,
};
