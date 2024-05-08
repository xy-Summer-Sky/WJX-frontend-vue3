// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///F:/CODE/GIThub/WenJuanXing/WebAPP/WJX-frontend-vue3/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/CODE/GIThub/WenJuanXing/WebAPP/WJX-frontend-vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///F:/CODE/GIThub/WenJuanXing/WebAPP/WJX-frontend-vue3/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    host: "localhost",
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  // 添加 configureServer 钩子
  configureServer(server) {
    server.listen(8081, () => {
      console.log("Server is running at http://localhost:8081");
    });
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDT0RFXFxcXEdJVGh1YlxcXFxXZW5KdWFuWGluZ1xcXFxXZWJBUFBcXFxcV0pYLWZyb250ZW5kLXZ1ZTNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENPREVcXFxcR0lUaHViXFxcXFdlbkp1YW5YaW5nXFxcXFdlYkFQUFxcXFxXSlgtZnJvbnRlbmQtdnVlM1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovQ09ERS9HSVRodWIvV2VuSnVhblhpbmcvV2ViQVBQL1dKWC1mcm9udGVuZC12dWUzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICAgIHBvcnQ6IDgwODEsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODEnLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gICAvLyBcdTZERkJcdTUyQTAgY29uZmlndXJlU2VydmVyIFx1OTRBOVx1NUI1MFxyXG4gICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICBzZXJ2ZXIubGlzdGVuKDgwODEsICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1NlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MScpXHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICBcclxuXHJcbn0pXHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsZUFBZSxXQUFXO0FBRTFYLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUh5TSxJQUFNLDJDQUEyQztBQU0xUSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVDLGdCQUFnQixRQUFRO0FBQ3ZCLFdBQU8sT0FBTyxNQUFNLE1BQU07QUFDeEIsY0FBUSxJQUFJLDRDQUE0QztBQUFBLElBQzFELENBQUM7QUFBQSxFQUNIO0FBSUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
