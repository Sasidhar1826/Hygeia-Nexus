// Script to update all imports of api.js and mockApi.js to use apiService.js
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Directory to search
const rootDir = path.join(__dirname, "client/src");
const servicesDir = path.join(rootDir, "services");

// Function to find all JS/JSX files recursively
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (
      (file.endsWith(".js") || file.endsWith(".jsx")) &&
      file !== "api.js" &&
      file !== "mockApi.js" &&
      file !== "apiService.js"
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to calculate relative path from file to services directory
function getRelativePath(filePath) {
  const fileDir = path.dirname(filePath);
  const relativePath = path.relative(fileDir, servicesDir);
  return relativePath.replace(/\\/g, "/");
}

// Function to update imports in a file
async function updateImports(filePath) {
  try {
    // Read the file content
    const content = await readFile(filePath, "utf-8");

    // Check if the file imports api.js or mockApi.js
    const apiRegex =
      /import\s+(\w+)\s+from\s+(['"])\.\.\/(?:\.\.\/)*services\/api\2/;
    const mockApiRegex =
      /import\s+(\w+)\s+from\s+(['"])\.\.\/(?:\.\.\/)*services\/mockApi\2/;

    const apiMatch = content.match(apiRegex);
    const mockApiMatch = content.match(mockApiRegex);

    if (apiMatch || mockApiMatch) {
      console.log(`Updating imports in ${filePath}`);

      let updatedContent = content;

      // Remove both imports
      if (apiMatch) {
        const apiImport = new RegExp(
          `import\\s+${apiMatch[1]}\\s+from\\s+(['"])\\.\\.\/(?:\\.\\.\/)*services\/api\\1[;\\s]*\\n?`,
          "g"
        );
        updatedContent = updatedContent.replace(apiImport, "");
      }

      if (mockApiMatch) {
        const mockApiImport = new RegExp(
          `import\\s+${mockApiMatch[1]}\\s+from\\s+(['"])\\.\\.\/(?:\\.\\.\/)*services\/mockApi\\1[;\\s]*\\n?`,
          "g"
        );
        updatedContent = updatedContent.replace(mockApiImport, "");
      }

      // Add the new import using the variable name from api.js or mockApi.js
      const importName = apiMatch
        ? apiMatch[1]
        : mockApiMatch
        ? mockApiMatch[1]
        : "api";

      // Calculate the correct relative path
      const relativePath = getRelativePath(filePath);

      // Add new import at the beginning of the file after all other imports
      // Find the last import statement
      const lastImportIndex = updatedContent.lastIndexOf("import");
      if (lastImportIndex !== -1) {
        const endOfImports = updatedContent.indexOf("\n", lastImportIndex) + 1;
        updatedContent =
          updatedContent.slice(0, endOfImports) +
          `import ${importName} from "${relativePath}/apiService";\n` +
          updatedContent.slice(endOfImports);
      }

      // Write the updated content back to the file
      await writeFile(filePath, updatedContent, "utf-8");
      console.log(`Updated imports in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error);
  }
}

// Main function
async function main() {
  const files = findFiles(rootDir);
  console.log(`Found ${files.length} files to check for import statements`);

  // Update imports in all files
  for (const file of files) {
    await updateImports(file);
  }

  console.log("Import update complete!");
}

main().catch(console.error);
