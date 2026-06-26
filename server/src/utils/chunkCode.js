const chunkCode = (
  content,
  chunkSize = 500
) => {
  const chunks = [];

  for (
    let i = 0;
    i < content.length;
    i += chunkSize
  ) {
    chunks.push(
      content.slice(
        i,
        i + chunkSize
      )
    );
  }

  return chunks;
};

module.exports = chunkCode;