import path from "path";
import fs from "fs";
import { transformAsync } from "@babel/core";
import bytenodeCore from "bytenode";

const DEFAULT_INCLUDES = /[^\\.]+(\.jsc)\..+/;

const shouldCompileWithBytenode = (file = "", includes: RegExp) => {
    if (!file) {
        return false;
    }
    return includes.test(file);
};

export default function ByteNodePlugin() {
  return {
    name: 'vite-plugin-bytenode',
    apply: "build",
    async closeBundle() {
      // await compiler(options)
    },
    async writeBundle(outputOptions: any, bundles: any) {
      // console.log('outputOptions, bundles', outputOptions, bundles)
      const { dir = process.cwd() } = outputOptions;
      console.log('dir', dir)
      for (const key of Object.keys(bundles)) {
        const { facadeModuleId, fileName } = bundles[key] as any;
        console.log('facadeModuleId, fileName', facadeModuleId, fileName)
        if (shouldCompileWithBytenode(facadeModuleId, DEFAULT_INCLUDES)) {
          const destFilename = path.resolve(dir, fileName);
          console.log('destFilename', destFilename)
          if (fs.existsSync(destFilename)) {
              // fix bytenode arrow function bug
              const result = await transformAsync(
                fs.readFileSync(destFilename).toString(),
                {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        modules: "commonjs",
                      },
                    ],
                  ],
                  plugins: [
                    "@babel/plugin-transform-arrow-functions",
                  ],
                }
              );
              console.log('result', result)
              fs.writeFileSync(destFilename, result!.code!);
          }

          await bytenodeCore.compileFile({
              filename: destFilename,
              compileAsModule: true,
              electron: false,
          });
        }
      }
    }
  }
}
