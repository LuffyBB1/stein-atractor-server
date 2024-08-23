import transformData from '../utils/transformData.js'
import Project from '../models/proyectosModel.js'
import { getMapping } from '../utils/mapping.js'
import { fetchDataFromTable } from './sqlService.js'

export async function saveToMongoFromOracle(project) {
  const { headerMapping, fieldMapping } = await getMapping('project')
  const id = project.AT_CAB_PROYECTOS_TBL.NUMPROY
  const dataTransformed = transformData(project, fieldMapping, headerMapping, id)
  const projectFormatted = await new Project(dataTransformed)
  await projectFormatted.save()
}

export async function fetchFromOracle() {
  const projectsTable = []
  const projectsData = await fetchDataFromTable('AT_CAB_PROYECTOS_TBL')
  const expensesData = await fetchDataFromTable('AT_GASTOS_PROYECTO_TBL')
  const materialsData = await fetchDataFromTable('AT_MATERIALES_PROYECTO_TBL')
  const hoursData = await fetchDataFromTable('AT_HORAS_PROYECTO_TBL')
  const subcontsData = await fetchDataFromTable('AT_SUBCONT_PROYECTO_TBL')

  projectsData.forEach((proyecto) => {
    projectsTable.push({
      AT_CAB_PROYECTOS_TBL: proyecto,
      AT_GASTOS_PROYECTO_TBL: [],
      AT_MATERIALES_PROYECTO_TBL: [],
      AT_HORAS_PROYECTO_TBL: [],
      AT_SUBCONT_PROYECTO_TBL: []
    })
  })

  expensesData.forEach((gasto) => {
    const { NUMPROY } = gasto
    projectsTable.find(({ AT_CAB_PROYECTOS_TBL }) => AT_CAB_PROYECTOS_TBL.NUMPROY == NUMPROY).AT_GASTOS_PROYECTO_TBL.push(gasto)
  })

  materialsData.forEach((material) => {
    const { NUMPROY } = material
    projectsTable.find(({ AT_CAB_PROYECTOS_TBL }) => AT_CAB_PROYECTOS_TBL.NUMPROY == NUMPROY).AT_MATERIALES_PROYECTO_TBL.push(material)
  })

  hoursData.forEach((hora) => {
    const { NUMPROY } = hora
    projectsTable.find(({ AT_CAB_PROYECTOS_TBL }) => AT_CAB_PROYECTOS_TBL.NUMPROY == NUMPROY).AT_HORAS_PROYECTO_TBL.push(hora)
  })

  subcontsData.forEach((subcont) => {
    const { NUMPROY } = subcont
    projectsTable.find(({ AT_CAB_PROYECTOS_TBL }) => AT_CAB_PROYECTOS_TBL.NUMPROY == NUMPROY).AT_SUBCONT_PROYECTO_TBL.push(subcont)
  })
  return projectsTable
}

export async function migrateFromOracle() {
  const projectsTable = await fetchFromOracle()
  console.log('Proyectos obtenidos: ', projectsTable.length)
  for (let p of projectsTable) {
    await saveToMongoFromOracle(p)
  }
  console.log('Data migrada')
}