/**
 * Spanish translations of the quiz question content.
 *
 * Mirrors the shape of the English content in quizContent.ts. A selector in
 * quizContent.ts returns the right set based on the active language.
 */

import type {
  AgeBand,
  CaregivingImpact,
  Condition,
  DiagnosisStatus,
  HelpType,
  IncomeBand,
  InsuranceStatus,
  LivingSituation,
  ResidencyStatus,
  SpecificNeed,
  SupportLevel,
} from "../../core/types.ts";
import type { Option, QuizStepMeta } from "./quizContent.ts";

export const AGE_OPTIONS_ES: Option<AgeBand>[] = [
  { value: "under3", label: "Menor de 3 años", description: "De recién nacido a 2 años" },
  { value: "3to5", label: "3 a 5 años", description: "Edad preescolar" },
  { value: "6to12", label: "6 a 12 años", description: "Primaria o secundaria" },
  { value: "13to17", label: "13 a 17 años", description: "Escuela preparatoria" },
  { value: "18to22", label: "18 a 22 años", description: "Transición a la adultez" },
];

export const CONDITION_OPTIONS_ES: Option<Condition>[] = [
  { value: "autism", label: "Trastorno del espectro autista (TEA)", description: "Diferencias en la comunicación social, el comportamiento o el procesamiento sensorial." },
  { value: "adhd", label: "TDAH", description: "Dificultad con la atención, el enfoque o el control de los impulsos." },
  { value: "idd", label: "Discapacidad intelectual o del desarrollo", description: "Diferencias importantes en el aprendizaje y las habilidades diarias que comenzaron en la niñez." },
  { value: "sensory", label: "Diferencias de procesamiento sensorial", description: "Reacciones fuertes a sonidos, texturas, luces u otros estímulos." },
  { value: "learning", label: "Discapacidad de aprendizaje", description: "Por ejemplo, dislexia (lectura) o discalculia (matemáticas)." },
  { value: "speech", label: "Retraso del habla o del lenguaje", description: "Dificultad para hablar o entender el lenguaje." },
  { value: "other", label: "Otra condición del neurodesarrollo", description: "Algo que no aparece en la lista." },
  { value: "suspected", label: "Aún sin diagnóstico, pero tenemos preocupaciones", description: "Ha notado señales pero no ha comenzado una evaluación formal." },
];

export const SUPPORT_OPTIONS_ES: Option<SupportLevel>[] = [
  { value: "mild", label: "Un poco de ayuda adicional", description: 'Por ejemplo, "Mi hijo se viste y come solo, pero necesita recordatorios para concentrarse."' },
  { value: "moderate", label: "Apoyo diario regular", description: 'Por ejemplo, "Mi hijo necesita ayuda con las tareas diarias o tiene mucha dificultad para comunicar lo que necesita."' },
  { value: "significant", label: "Apoyo constante y directo", description: 'Por ejemplo, "Mi hijo necesita a alguien con él en todo momento por seguridad y no puede hacer la mayoría de las tareas solo."' },
];

export const INCOME_OPTIONS_ES: Option<IncomeBand>[] = [
  { value: "under2000", label: "Menos de $2,000 al mes", description: "Probablemente califica para la mayoría de los programas por ingresos." },
  { value: "2000to4000", label: "$2,000 a $4,000 al mes", description: "Probablemente califica para muchos programas por ingresos." },
  { value: "4000to6000", label: "$4,000 a $6,000 al mes", description: "Puede calificar para algunos programas por ingresos." },
  { value: "6000to8000", label: "$6,000 a $8,000 al mes", description: "Puede calificar para algunos programas por ingresos." },
  { value: "over8000", label: "Más de $8,000 al mes", description: "Aún es elegible para muchos programas que no miran los ingresos." },
  { value: "preferNotToSay", label: "Prefiero no decir", description: "Está bien. Mostraremos todos los programas y señalaremos cuáles dependen de los ingresos." },
];

export const LIVING_OPTIONS_ES: Option<LivingSituation>[] = [
  { value: "withParents", label: "Vive con uno de sus padres", description: "En el hogar familiar." },
  { value: "withRelative", label: "Vive con un familiar", description: "Por ejemplo, un abuelo, tía o tío es el cuidador principal." },
  { value: "foster", label: "En cuidado de crianza (foster)", description: "Ubicado con una familia de crianza." },
  { value: "other", label: "Otra situación", description: "Por ejemplo, un hogar grupal o residencial." },
];

export const HELP_OPTIONS_ES: Option<HelpType>[] = [
  { value: "health", label: "Seguro de salud o atención médica" },
  { value: "therapy", label: "Terapia (ABA, habla, ocupacional, física)" },
  { value: "cash", label: "Ayuda en efectivo o apoyo económico" },
  { value: "school", label: "Apoyo escolar (IEP, 504, educación especial)" },
  { value: "respite", label: "Un descanso del cuidado (respiro)" },
  { value: "savings", label: "Ahorrar para el futuro sin perder los beneficios" },
  { value: "navigation", label: "Alguien que me ayude a entenderlo todo" },
];

export const DIAGNOSIS_OPTIONS_ES: Option<DiagnosisStatus>[] = [
  { value: "diagnosed", label: "Sí, tenemos un diagnóstico formal", description: "Un médico o especialista dio un diagnóstico por escrito." },
  { value: "inProcess", label: "Estamos en proceso de obtenerlo", description: "Por ejemplo, estamos en lista de espera o en medio de evaluaciones." },
  { value: "none", label: "Todavía no, pero tenemos preocupaciones", description: "Ha notado cosas pero no ha comenzado una evaluación formal." },
];

export const NEEDS_OPTIONS_ES: Option<SpecificNeed>[] = [
  { value: "behavior", label: "Comportamientos intensos o crisis", description: "Por ejemplo, grandes reacciones, agresión o escaparse (fuga)." },
  { value: "communication", label: "Dificultad para comunicarse", description: "Por ejemplo, su hijo no habla o tiene muy poco lenguaje." },
  { value: "safety", label: "Necesita supervisión constante por seguridad", description: "Por ejemplo, no puede salir del cuarto con seguridad." },
  { value: "sleep", label: "Problemas serios de sueño", description: "Por ejemplo, despertarse seguido o dormir muy poco, afectando a toda la familia." },
  { value: "feeding", label: "Dificultades para comer o alimentarse", description: "Por ejemplo, una dieta muy limitada o problemas para comer con seguridad." },
  { value: "medical", label: "Necesidades médicas complejas", description: "Por ejemplo, equipo, alimentación por sonda o atención médica frecuente." },
  { value: "mobility", label: "Apoyo físico o de movimiento", description: "Por ejemplo, ayuda para caminar, sentarse o usar las manos." },
];

export const CAREGIVING_OPTIONS_ES: Option<CaregivingImpact>[] = [
  { value: "cannotWork", label: "No puedo trabajar por el cuidado", description: "Cuidar a su hijo requiere tanto que trabajar no es posible ahora." },
  { value: "reducedWork", label: "Tuve que reducir mi trabajo", description: "Redujo horas o cambió de trabajo para poder cuidar." },
  { value: "worksFully", label: "Trabajo tiempo completo", description: "El cuidado no ha cambiado mucho su trabajo." },
  { value: "notApplicable", label: "Esto no aplica a nosotros", description: "Prefiere no responder, o no es relevante." },
];

export const INSURANCE_OPTIONS_ES: Option<InsuranceStatus>[] = [
  { value: "appleHealthAlready", label: "Ya tenemos Apple Health (Medicaid)", description: "Su hijo está inscrito en Apple Health de Washington." },
  { value: "privateOnly", label: "Solo tenemos seguro privado", description: "Por ejemplo, cobertura por un trabajo o comprada por su cuenta." },
  { value: "uninsured", label: "Su hijo no tiene seguro ahora", description: "No cuenta con cobertura actualmente." },
  { value: "notSure", label: "No estoy seguro", description: "Está bien. Igual le mostraremos sus opciones." },
];

export const RESIDENCY_OPTIONS_ES: Option<ResidencyStatus>[] = [
  { value: "citizenOrLpr", label: "Ciudadano de EE. UU. o residente con green card", description: "Su hijo es ciudadano o residente permanente legal." },
  { value: "otherStatus", label: "Otro estatus migratorio", description: "Muchos programas aún ayudan a los niños sin importar su estatus." },
  { value: "preferNotToSay", label: "Prefiero no decir", description: "Está bien. Señalaremos qué programas tienen reglas de estatus." },
];

export const STEP_META_ES: QuizStepMeta[] = [
  {
    title: "¿Qué edad tiene su hijo?",
    helper: "Elija el rango que corresponda. Es un punto de partida, no una edad exacta.",
    whyWeAsk: "Algunos programas son solo para ciertas edades. Por ejemplo, la terapia temprana es para menores de 3 años, y los servicios escolares comienzan a los 3 años.",
    multi: false,
  },
  {
    title: "¿Qué describe mejor a su hijo?",
    helper: "Elija todas las que apliquen. Si no está seguro, elija la última opción.",
    whyWeAsk: "Algunos programas son para condiciones específicas, como la terapia para el autismo. No siempre se requiere un diagnóstico, pero nos ayuda a hacer coincidencias.",
    multi: true,
  },
  {
    title: "¿Cuánta ayuda diaria necesita su hijo?",
    helper: "Piense en un día normal. No hay respuesta incorrecta.",
    whyWeAsk: "Algunos programas, como el dinero del SSI, requieren mostrar que una discapacidad afecta seriamente la vida diaria.",
    multi: false,
  },
  {
    title: "¿Cuánto gana aproximadamente su hogar al mes?",
    helper: "Un rango aproximado está bien. Nunca lo guardamos.",
    whyWeAsk: "Algunos programas son para familias bajo cierto ingreso. Otros no miran los ingresos, así que esto solo nos ayuda a ordenar los resultados.",
    multi: false,
  },
  {
    title: "¿Con quién vive su hijo?",
    helper: "Elija la opción que mejor corresponda.",
    whyWeAsk: "Algunos programas son para situaciones específicas. Por ejemplo, algunos apoyan a los familiares que están criando a un niño.",
    multi: false,
  },
  {
    title: "¿Qué tipo de ayuda está buscando?",
    helper: "Elija todas las que apliquen. Esto nos ayuda a poner primero los programas más útiles.",
    whyWeAsk: "Usamos esto para priorizar sus resultados. No elimina ningún programa para el que pueda calificar.",
    multi: true,
  },
  {
    title: "¿Su hijo ya tiene un diagnóstico?",
    helper: "No hay respuesta incorrecta. Muchos programas ayudan incluso sin uno.",
    whyWeAsk: "Algunos programas, como cierta terapia para el autismo, necesitan un diagnóstico formal. Muchos otros, como la terapia temprana y las evaluaciones escolares, ayudan incluso antes de un diagnóstico.",
    multi: false,
  },
  {
    title: "¿En qué necesita más ayuda su hijo día a día?",
    helper: "Elija todas las que apliquen. Omita las que no correspondan.",
    whyWeAsk: "Esto nos ayuda a resaltar los programas más relevantes, como el respiro para familias que necesitan un descanso, o el apoyo con la alimentación.",
    multi: true,
  },
  {
    title: "¿Cuidar a su hijo afecta su capacidad de trabajar?",
    helper: "Sea honesto. Esto puede habilitar apoyo adicional.",
    whyWeAsk: "Si el cuidado le impide trabajar, algunos programas de dinero pueden eximir su requisito de trabajo para que igual reciba ayuda.",
    multi: false,
  },
  {
    title: "¿Cuál es el seguro de salud de su hijo ahora?",
    helper: "Elija la opción más cercana.",
    whyWeAsk: "Esto nos ayuda a guiarle sobre Apple Health, que puede ser la cobertura principal o llenar vacíos del seguro privado, y que habilita otros servicios.",
    multi: false,
  },
  {
    title: "¿Cuál es el estatus de ciudadanía de su hijo?",
    helper: "Esto es opcional. Muchos programas ayudan a todos los niños sin importar su estatus.",
    whyWeAsk: "Algunos programas de dinero tienen reglas federales de ciudadanía. La cobertura de salud para niños y los servicios escolares ayudan sin importar el estatus migratorio.",
    multi: false,
  },
];
