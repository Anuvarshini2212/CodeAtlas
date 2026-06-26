const Chunk = require("../../models/Chunk");
const chunkCode = require("../../utils/chunkCode");

const saveChunks = async (
  projectId,
  sourceFiles
) => {
  for (const file of sourceFiles) {
    const chunks = chunkCode(
      file.content
    );

    for (
      let i = 0;
      i < chunks.length;
      i++
    ) {
      await Chunk.create({
        projectId,
        fileName: file.name,
        content: chunks[i],
        chunkIndex: i,
      });
    }
  }
};

module.exports = saveChunks;