export const buildFileTree = (files) => {
  const tree = {};

  files.forEach((file) => {
    // Support Windows and Linux paths
    const parts = file.relativePath
      .replace(/\\/g, "/")
      .split("/");

    let current = tree;

    parts.forEach((part, index) => {
      const isFile =
        index === parts.length - 1;

      if (isFile) {
        current[part] = file;
      } else {
        if (!current[part]) {
          current[part] = {};
        }

        current = current[part];
      }
    });
  });

  return tree;
};