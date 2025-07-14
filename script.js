const materias = [
  { codigo: "D1001", nombre: "Matemática para ingeniería", requisitos: [] },
  { codigo: "F1301", nombre: "Matemática A", requisitos: ["D1001"] },
  { codigo: "M1602", nombre: "Gráfica para Ingeniería", requisitos: [] },
  { codigo: "A1101", nombre: "Introducción a la Ingeniería Aeroespacial", requisitos: [] },
  { codigo: "F1302", nombre: "Matemática B", requisitos: ["F1301"] },
  { codigo: "F1303", nombre: "Física", requisitos: ["F1301"] },
  { codigo: "U1901", nombre: "Química para ingeniería", requisitos: [] },
  { codigo: "F1304", nombre: "Matemática C", requisitos: ["F1302"] },
  { codigo: "F1305", nombre: "Física", requisitos: ["F1302", "F1303"] },
  { codigo: "F1315", nombre: "Probabilidades y Estadística", requisitos: ["F1302"] },
  { codigo: "F1306", nombre: "Matemática D", requisitos: ["F1304"] },
  { codigo: "F1316", nombre: "Intro a la Programación y Análisis Numérico", requisitos: ["F1304"] },
  { codigo: "C1151", nombre: "Estructuras I", requisitos: ["F1303"] },
  { codigo: "M1603", nombre: "Materiales", requisitos: ["U1901"] },
  { codigo: "A1102", nombre: "Materiales Aeroespaciales", requisitos: ["M1603"] },
  { codigo: "A1006", nombre: "Ensayos no Destructivos", requisitos: ["M1603", "F1305"] },
  { codigo: "M1604", nombre: "Termodinámica", requisitos: ["F1302", "F1303", "U1901"] },
  { codigo: "C1153", nombre: "Estructuras II", requisitos: ["C1151", "F1302", "M1603"] },
  { codigo: "A1009", nombre: "Mecánica Racional", requisitos: ["F1303", "F1304"] },
  { codigo: "A1010", nombre: "Electrotecnia y Sistemas Eléctricos", requisitos: ["F1304", "F1305"] },
  { codigo: "A1011", nombre: "Mecánica de los Fluidos I", requisitos: ["F1306", "F1316", "M1604"] },
  { codigo: "A3016", nombre: "Mecanismos y Sistemas de Aeronaves", requisitos: ["A1009", "C1153"] },
  { codigo: "A1008", nombre: "Estructuras III", requisitos: ["C1153", "F1316"] },
  { codigo: "AFC1", nombre: "Formación Complementaria I", requisitos: ["APROB_10"] },
  { codigo: "A1013", nombre: "Estructuras IV", requisitos: ["A1102", "A1008"] },
  { codigo: "A1015", nombre: "Mecánica de los Fluidos II", requisitos: ["A1011", "F1315"] },
  { codigo: "A1012", nombre: "Sistemas Dinámicos", requisitos: ["F1305", "F1315", "A1009", "A1008", "F1316", "F1306"] },
  { codigo: "P1752", nombre: "Economía y Organización Industrial", requisitos: ["APROB_15"] },
  { codigo: "Electiva", nombre: "Electiva Humanística", requisitos: [] },
  { codigo: "AFC2", nombre: "Formación Complementaria II", requisitos: ["AFC1"] },
  { codigo: "A1017", nombre: "Motores a Reacción", requisitos: ["A1015"] },
  { codigo: "A1018", nombre: "Aerodinámica y Mecánica de Vuelo I", requisitos: ["A1015", "A1009"] },
  { codigo: "A1019", nombre: "Procesos de Fabricación", requisitos: ["A1102"] },
  { codigo: "A1014", nombre: "Estructuras V", requisitos: ["A1013"] },
  { codigo: "F1759", nombre: "Ingeniería Legal y Profesional", requisitos: ["APROB_20"] },
  { codigo: "AFC3", nombre: "Formación Complementaria III", requisitos: ["AFC2"] },
  { codigo: "M0001", nombre: "Inglés", requisitos: ["D1001"] },
  { codigo: "A1020", nombre: "Motores Alternativos", requisitos: ["A1012", "A1016", "M1604", "M0001"] },
  { codigo: "A1021", nombre: "Aerodinámica y Mecánica de Vuelo II", requisitos: ["A1018", "A1012", "M0001"] },
  { codigo: "A1022", nombre: "Mediciones e Instrumentos", requisitos: ["A1010", "A1016", "A1017", "M0001"] },
  { codigo: "A1028", nombre: "Aeropuertos y Operaciones", requisitos: ["A1018", "A1017", "M0001"] },
  { codigo: "AFC4", nombre: "Formación Complementaria IV", requisitos: ["AFC3"] },
  { codigo: "A1023", nombre: "Control y Guiado", requisitos: ["A1012", "A1021", "A1022", "M0001"] },
  { codigo: "A1024", nombre: "Talleres de Mantenimiento", requisitos: ["APROB_30", "M0001"] },
  { codigo: "A1026", nombre: "Sistemas y Equipos de Aeronaves", requisitos: ["A1022", "M0001"] },
  { codigo: "Optativa", nombre: "Optativa", requisitos: ["APROB_30"] },
  { codigo: "AFC5", nombre: "Formación Complementaria V", requisitos: ["AFC4"] },
  { codigo: "A1034", nombre: "Práctica Profesional Supervisada", requisitos: ["APROB_30", "M0001"] },
];

const container = document.getElementById('malla');
let aprobadas = new Set();

function crearMalla() {
  container.innerHTML = "";
  materias.forEach(mat => {
    const div = document.createElement("div");
    div.className = "materia";
    div.dataset.codigo = mat.codigo;
    div.innerHTML = `<h3>${mat.codigo}<br>${mat.nombre}</h3>`;
    if (!puedeDesbloquearse(mat)) {
      div.classList.add("bloqueada");
    } else if (aprobadas.has(mat.codigo)) {
      div.classList.add("aprobada");
    }
    div.onclick = () => toggleAprobada(mat, div);
    container.appendChild(div);
  });
}

function puedeDesbloquearse(mat) {
  return mat.requisitos.every(req => {
    if (req.startsWith("APROB_")) {
      const cantidad = parseInt(req.split("_")[1]);
      return aprobadas.size >= cantidad;
    }
    return aprobadas.has(req);
  });
}

function toggleAprobada(mat, div) {
  if (div.classList.contains("bloqueada")) return;
  if (div.classList.contains("aprobada")) {
    aprobadas.delete(mat.codigo);
  } else {
    aprobadas.add(mat.codigo);
  }
  crearMalla(); // refrescar para desbloquear nuevas
}

crearMalla();
