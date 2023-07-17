import {Project} from "ts-morph";

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles();


function isAbsolute(val: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    if (layers.some(layer => val.startsWith(layer))) {
        return true;
    }
}

files.forEach(sourceFile => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach(importDeclaration => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier('@/' + value);
        }
    })
})

project.save();
