const fs = require('fs');
const mime = require('mime');
const path = require('path');

const { getMetadataSync } = require('../common/helpers');

module.exports = function assetsEndpoint (req, res) {
  console.log('获取资源文件', req.url);
  const { asset: assetName, runtimeVersion, platform } = req.query;

  if (!assetName) {
    res.statusCode = 400;
    res.json({ error: 'No asset name provided.' });
    return;
  }

  if (!platform) {
    res.statusCode = 400;
    res.json({ error: 'No platform provided. Expected "ios" or "android".' });
    return;
  }

  if (!runtimeVersion) {
    res.statusCode = 400;
    res.json({ error: 'No runtimeVersion provided.' });
    return;
  }

  const updateBundlePath = `updates/${runtimeVersion}`;
  const { metadataJson } = getMetadataSync({
    updateBundlePath,
    runtimeVersion,
  });

  const assetPath = path.resolve('public/', assetName);
  const withoutDe = assetName.replace(`updates/${runtimeVersion}/`, '')
    .replace('\\\\', '\\');
  const assetMetadata = metadataJson.fileMetadata[platform].assets.find((asset) => {
    return asset.path === withoutDe;
  });
  const isLaunchAsset =
    metadataJson.fileMetadata[platform].bundle === withoutDe;

  if (!fs.existsSync(assetPath)) {
    res.statusCode = 404;
    res.json({ error: `Asset "${assetName}" does not exist.` });
    return;
  }

  try {
    const asset = fs.readFileSync(assetPath, null);

    res.statusCode = 200;
    res.setHeader(
      'content-type',
      isLaunchAsset ? 'application/javascript' : mime.getType(assetMetadata.ext)
    );
    res.end(asset);
  } catch (error) {
    console.log('获取资产失败', error);
    res.statusCode = 500;
    res.json({ error });
  }
};
