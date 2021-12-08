module.exports = function fileExtensionHeader(req, res, next) {
  let contentType;

  const match = ["image/png", "image/jpeg", "image/gif"];

  if (req.path.match(/\.png/)) {
    contentType = "image/png";
  } else if (req.path.match(/\.jpge/)) {
    contentType = "imge/jpeg";
  } else if (req.path.match(/\.gif/)) {
    contentType = "imge/gif";
  }

  if (contentType) {
    req.headers["Content-Type"] = contentType;
    req.headers.accept = `${contentType},${req.headers.accept}`; // this line did the trick
  }
  next();
};
