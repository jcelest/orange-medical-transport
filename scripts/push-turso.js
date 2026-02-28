#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createClient } = require("@libsql/client");

const envPath = path.join(__dirname, "..", ".env");
if (!fs.existsSync(envPath)) {
  console.error("No .env file found. Create one with TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.");
  process.exit(1);
}

const env = fs.readFileSync(envPath, "utf8");
let url = "";
let token = "";
for (const line of env.split("\n")) {
  const urlMatch = line.match(/^TURSO_DATABASE_URL=(.+)$/);
  if (urlMatch) url = urlMatch[1].replace(/^["']|["']$/g, "").trim();
  const tokenMatch = line.match(/^TURSO_AUTH_TOKEN=(.+)$/);
  if (tokenMatch) token = tokenMatch[1].replace(/^["']|["']$/g, "").trim();
}

if (!url || !token) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env");
  process.exit(1);
}

const sql = fs.readFileSync(path.join(__dirname, "turso-setup.sql"), "utf8")
  .split("\n")
  .filter((l) => !l.trim().startsWith("--"))
  .join("\n")
  .trim();
const client = createClient({ url, authToken: token });

client.execute(sql).then(() => {
  console.log("Turso tables created successfully.");
}).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
