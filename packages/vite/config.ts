/**
 * @type {import('vite').UserConfig}
 */
const viteConfig = (pathResolver: (path: string) => string) => {
  return {
    resolve: {
      alias: [{ find: '@', replacement: pathResolver('./src') }],
    },
  };
};

export default viteConfig;
