import pkg from 'mongoose'
const { Schema } = pkg

const proyectoSchema = new Schema({
  desProy: {
    type: String,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
  },
  codCli: {
    type: String,
  },
  codOpe: {
    type: String,
    required: true
  },
  estado: {
    type: Number,
    required: true
  },
  fechaEstado: {
    type: Date,
    required: true
  },
  domicilio: {
    type: String
  },
  poblacion: {
    type: String
  },
  provincia: {
    type: String
  },
  codPage: {
    type: String,
  },
  codAgente: {
    type: String
  },
  codTipoPre: {
    type: String
  },
  codTar: {
    type: String
  },
  codAna: {
    type: String
  },
  codSerie: {
    type: String,
  },
  numProyPadre: {
    type: String,
  }
}, { _id: false })

const gastosShema = new Schema({
  codGas: {
    type: String,
    required: true
  },
  desGas: {
    type: String
  },
  importe: {
    type: Number
  },
  linea: {
    type: Number,
    required: true
  }
}, { _id: false })

const horasShema = new Schema({
  linea: {
    type: Number,
    required: true
  },
  codCat: {
    type: String,
    required: true
  },
  codHor: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
}, { _id: false })

const materialesSchema = new Schema({
  linea: {
    type: Number,
    required: true
  },
  codArt: {
    type: String,
    required: true
  },
  desArt: {
    type: String,
  },
  cantidad: {
    type: Number,
  },
  precio: {
    type: Number,
  },
  lineaPpi: {
    type: Number,
  },
  lineaPpiOp: {
    type: Number,
  },
  desPpi: {
    type: String
  },
  desPpiOp: {
    type: String
  }
}, { _id: false })

const subcontSchema = new Schema({
  linea: {
    type: Number,
    required: true
  },
  codPro: {
    type: String,
    required: true
  },
  concepto: {
    type: String
  },
  precio: {
    type: Number
  }
}, { _id: false })

const projectTableSchema = new Schema({
  _id: String, 
  projectHeader: proyectoSchema,
  projectExpenses: [gastosShema],
  projectHours: [horasShema],
  projectMaterials: [materialesSchema],
  projectSubconts: [subcontSchema]
}, {versionKey: false })

const Project = pkg.model('Proyecto', projectTableSchema)

export default Project