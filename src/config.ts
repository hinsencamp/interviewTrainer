const devConfig = {
  elasticURL: "http://localhost:9200",
  frontendURL: "http://localhost:3001",
  authURL: "http://localhost:3005/api"
};

const basicConfig = {
  port: 3000,
  mode: process.env.NODE_ENV || "development"
};

const prodConfig = {
  elasticURL: process.env.ELASTIC_PORT || "",
  frontendURL: "",
  authURL: ""
};

const config =
  basicConfig.mode === "development"
    ? { ...basicConfig, ...devConfig }
    : { ...basicConfig, ...prodConfig };

export default config;

export interface Config {
  elasticURL: string;
  frontendURL: string;
  port: number;
  mode: string;
}
