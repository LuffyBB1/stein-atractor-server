import { promises as fs } from "fs"

export const getMapping = async (tableName) => {
  const fieldFile = await fs.readFile(`src/db/${tableName}FieldMapping.json`, 'utf-8')
  const headerFile = await fs.readFile(`src/db/${tableName}HeaderMapping.json`, 'utf-8')
  const headerMapping = await JSON.parse(headerFile)
  const fieldMapping = await JSON.parse(fieldFile)
  return { headerMapping, fieldMapping }
}
