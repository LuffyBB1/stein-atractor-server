const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const direccionSchema = new Schema(
  {
    codCli: {
      type: String,
      required: true,
    },
    numero: {
      type: Number,
      required: true,
    },
    domicilio: {
      type: String,
    },
    poblacion: {
      type: String,
    },
    provincia: {
      type: String,
    },
    cp: {
      type: String,
    },
    tipoDireccion: {
      type: String,
    },
    usuario: {
      type: String,
    },
    personaContacto: {
      type: String,
    },
    codPais: {
      type: String,
    },
    telefono: {
      type: String,
    },
    fax: {
      type: String,
    },
    email: {
      type: String,
    },
    funcion: {
      type: String,
    },
    codZod: {
      type: String,
    },
  },
  {
    _id: false, // Deshabilita la creación automática de _id para este esquema embebido
  }
);

const cuentasContablesTbl = new Schema({
  codcue: {
    type: String,
    required: true,
    unique: true,
  },
});

const clienteSchema = new Schema({
  codcli: {
    type: String,
    required: true,
    unique: true,
  },
  descli: {
    type: String,
    required: true,
  },
  establecimiento: {
    type: String,
  },
  direcciones: [direccionSchema],
  codpag: {
    type: String,
  },
  codage: {
    type: String,
  },
  codcue: [cuentasContablesTbl],
});

const albaranesSchema = new Schema({
  codemp: {
    type: String,
    required: true,
    unique: true,
  },
  periodo: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  codSerie: {
    type: String,
    required: true,
  },
  numLab: {
    type: Number,
    required: true,
  },
  periodoNumFac: {
    type: Number,
  },
  codSerieNumFac: {
    type: Number,
  },
  numFac: {
    type: Number,
    required: true,
  },
  cif: {
    type: String,
  },
  incoterms: {
    type: String,
  },
  codEtar: {
    type: String,
  },
  codVisa: {
    type: String,
    required: true,
  },
  descuento: {
    type: Number,
    required: true,
    default: 0,
  },
  importe1: {
    type: Number,
    required: true,
    default: 0,
  },
  importe2: {
    type: Number,
    required: true,
    default: 0,
  },
  importe3: {
    type: Number,
    required: true,
    default: 0,
  },
  importe4: {
    type: Number,
    required: true,
    default: 0,
  },
  grupoIva: {
    type: Number,
    required: true,
  },
  iva: {
    type: String,
    required: true,
    default: "S",
  },
  recargo: {
    type: String,
    required: true,
    default: "N",
  },
  envio: {
    type: String,
  },
  bultos: {
    type: Number,
    required: true,
    default: 0,
  },
  observaciones: {
    type: String,
  },
  numProy: {
    type: String,
  },
  usuario: {
    type: String,
  },
  tipoFactura: {
    type: String,
    default: "N",
  },
  descripcion: {
    type: String,
  },
  codTipoPre: {
    type: String,
  },
  codTrans: {
    type: String,
  },
  preferenciaCobro: {
    type: String,
  },
  tipoPortes: {
    type: String,
  },
  tipoIva1: {
    type: String,
  },
  tipoIva2: {
    type: String,
  },
  tipoIva3: {
    type: String,
  },
  tipoIva4: {
    type: String,
  },
  codOpe: {
    type: String,
  },
  codAgeExp: {
    type: String,
  },
  codCliExp: {
    type: String,
  },
  codCliFactura: {
    type: String,
    required: true,
  },
  codRuta: {
    type: String,
  },
  desRuta: {
    type: String,
  },
  codAplicacion: {
    type: String,
    required: true,
    default: "VENT",
  },
  codConAlm: {
    type: String,
    required: true,
    default: "0000",
  },
  fechaRecepcion: {
    type: String,
  },
  idTratImpuesto: {
    type: Number,
    required: true,
    default: 0,
  },
  ss: {
    type: String,
    required: true,
    default: "N",
  },
});

const generalClientSchema = new Schema({
  clienteSchema: clienteSchema,
  albaranesSchema: albaranesSchema,
});
const Client = pkg.model("Cliente", generalClientSchema);

export default Client;
