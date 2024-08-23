import { executeQuery } from "../config/dbOracle.js";

export async function fetchDataFromTable(table) {
  return await executeQuery(`SELECT * FROM ${table}`)
}