/**
 * CLIENTE API CENTRALIZADO + MOTOR OPERATIVO STANDALONE (IN-BROWSER SPRING BOOT)
 * ------------------------------------------------------------------------------
 * Ejecuta todas las reglas de negocio reales de Campusland Ops (OperacionesService,
 * DataInitializer y AiOperationalService) directamente en el navegador con persistencia
 * en localStorage cuando no hay un servidor Java activo, permitiendo que la Live Demo
 * funcione al 100% en Netlify / GitHub Pages.
 */

const SESSION_KEY = 'campusland_ops_session';
const DB_KEY = 'campusland_ops_db_v1';

// Helper de Acceso Rápido para la Demo Interactiva
window.quickDemoLogin = function (correo, password) {
    const emailInput = document.getElementById('loginCorreo');
    const passInput = document.getElementById('loginPassword');
    const form = document.getElementById('loginForm');
    if (emailInput && passInput && form) {
        emailInput.value = correo;
        passInput.value = password;
        form.requestSubmit();
    }
};

export function saveSession(data) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

let activeRequests = 0;

function setLoading(active, message = 'Procesando operación...') {
    const overlay = document.getElementById('globalLoading');
    const label = document.getElementById('globalLoadingLabel');
    if (!overlay) return;
    if (active) {
        activeRequests++;
        if (label) label.textContent = message;
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-busy', 'true');
    } else {
        activeRequests = Math.max(0, activeRequests - 1);
        if (activeRequests === 0) {
            overlay.classList.add('hidden');
            overlay.setAttribute('aria-busy', 'false');
        }
    }
}

function nowFormatted() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function todayIso() {
    return new Date().toISOString().split('T')[0];
}

function buildInitialDb() {
    const usuarios = [
        { id: 1, nombre: 'Administración General Campuslands', correo: 'admin@campuslands.com', password: 'admin123', rol: 'ADMIN' },
        { id: 2, nombre: 'Trainer Principal Backend', correo: 'trainer@campuslands.com', password: 'trainer123', rol: 'TRAINER' },
        { id: 3, nombre: 'Trainer Arquitectura Software', correo: 'trainer2@campuslands.com', password: 'trainer123', rol: 'TRAINER' },
        { id: 4, nombre: 'Ingeniero de Soporte TI', correo: 'soporte@campuslands.com', password: 'soporte123', rol: 'SOPORTE' },
        { id: 5, nombre: 'Camper Ruta Java', correo: 'camper@campuslands.com', password: 'camper123', rol: 'CAMPER' }
    ];

    const espacios = [
        { id: 1, nombre: 'Auditorio', capacidad: 65, categoria: 'AUDITORIO_PRINCIPAL', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 2, nombre: 'Spooki', capacidad: 35, categoria: 'AULA_ENTRENAMIENTO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 3, nombre: 'Apolo', capacidad: 34, categoria: 'AULA_ENTRENAMIENTO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 4, nombre: 'Artemis', capacidad: 34, categoria: 'AULA_ENTRENAMIENTO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 5, nombre: 'Cosmos', capacidad: 29, categoria: 'LABORATORIO_COMPUTO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con HDMI + 29 Estaciones PC completas (Monitor, Mouse, Torre, Teclado)', motivoBloqueo: null, origenBloqueo: null },
        { id: 6, nombre: 'Skilab', capacidad: 21, categoria: 'LABORATORIO_COMPUTO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con HDMI + 21 Estaciones PC completas (Monitor, Mouse, Torre, Teclado)', motivoBloqueo: null, origenBloqueo: null },
        { id: 7, nombre: 'Sala Blanca', capacidad: 8, categoria: 'SALA_REUNIONES', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 8, nombre: 'Sala Azul', capacidad: 6, categoria: 'SALA_ESTUDIO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 9, nombre: 'Sala Amarilla', capacidad: 6, categoria: 'SALA_ESTUDIO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null },
        { id: 10, nombre: 'Sala Verde', capacidad: 6, categoria: 'SALA_ESTUDIO', estado: 'DISPONIBLE', resumenImplementos: '1 Televisor con su Cable HDMI', motivoBloqueo: null, origenBloqueo: null }
    ];

    let nextImplId = 1;
    const implementos = [];

    function addTvAndPcs(espacio, prefijo, cantidadPcs) {
        implementos.push({
            id: nextImplId++,
            espacioId: espacio.id,
            espacioNombre: espacio.nombre,
            tipo: 'TELEVISOR_HDMI',
            puestoNumero: 0,
            serialMonitor: `TV-${prefijo}-001`,
            serialMouse: 'N/A',
            serialTorre: 'N/A',
            serialTeclado: `HDMI-${prefijo}-001`,
            nombreImplemento: `Televisor 65" + Cable HDMI (${espacio.nombre})`,
            estado: 'DISPONIBLE',
            motivoInhabilitado: null,
            prestadoActualmente: false
        });
        for (let i = 1; i <= cantidadPcs; i++) {
            const num = String(i).padStart(2, '0');
            implementos.push({
                id: nextImplId++,
                espacioId: espacio.id,
                espacioNombre: espacio.nombre,
                tipo: 'ESTACION_PC',
                puestoNumero: i,
                serialMonitor: `MON-${prefijo}-${num}`,
                serialMouse: `MOU-${prefijo}-${num}`,
                serialTorre: `CPU-${prefijo}-${num}`,
                serialTeclado: `KB-${prefijo}-${num}`,
                nombreImplemento: `Estación PC #${num} (${espacio.nombre})`,
                estado: 'DISPONIBLE',
                motivoInhabilitado: null,
                prestadoActualmente: false
            });
        }
    }

    addTvAndPcs(espacios[0], 'AUD', 0);
    addTvAndPcs(espacios[1], 'SPK', 0);
    addTvAndPcs(espacios[2], 'APO', 0);
    addTvAndPcs(espacios[3], 'ART', 0);
    addTvAndPcs(espacios[4], 'COS', 29);
    addTvAndPcs(espacios[5], 'SKI', 21);
    addTvAndPcs(espacios[6], 'SBL', 0);
    addTvAndPcs(espacios[7], 'SAZ', 0);
    addTvAndPcs(espacios[8], 'SAM', 0);
    addTvAndPcs(espacios[9], 'SVR', 0);

    for (let i = 1; i <= 8; i++) {
        const num = String(i).padStart(2, '0');
        implementos.push({
            id: nextImplId++,
            espacioId: null,
            espacioNombre: 'Almacén Soporte TI (Préstamos)',
            tipo: 'PRESTAMO_CAMPER',
            puestoNumero: i,
            serialMonitor: `LAP-CAMP-${num}`,
            serialMouse: `MOU-CAMP-${num}`,
            serialTorre: `SER-CAMP-${num}`,
            serialTeclado: `CHG-CAMP-${num}`,
            nombreImplemento: `Portátil Desarrollo Camper #${num} + Cargador`,
            estado: 'DISPONIBLE',
            motivoInhabilitado: null,
            prestadoActualmente: false
        });
    }

    const hoy = todayIso();
    const reservas = [
        {
            id: 1,
            espacioId: 3,
            espacioNombre: 'Apolo',
            usuarioId: 2,
            usuarioNombre: 'Trainer Principal Backend',
            rolUsuario: 'TRAINER',
            fecha: hoy,
            horaInicio: '08:00',
            horaFin: '10:00',
            cantidadAsistentes: 28,
            motivo: 'Entrenamiento Intensivo Spring Boot 3 & Arquitectura Hexagonal',
            estado: 'APROBADA',
            implementosIncluidos: '1 Televisor con su Cable HDMI (1 unidades habilitadas)'
        },
        {
            id: 2,
            espacioId: 5,
            espacioNombre: 'Cosmos',
            usuarioId: 3,
            usuarioNombre: 'Trainer Arquitectura Software',
            rolUsuario: 'TRAINER',
            fecha: hoy,
            horaInicio: '14:00',
            horaFin: '16:00',
            cantidadAsistentes: 24,
            motivo: 'Laboratorio Práctico Microservicios y Seguridad JWT',
            estado: 'PENDIENTE',
            implementosIncluidos: '1 Televisor con HDMI + 29 Estaciones PC completas (30 unidades habilitadas)'
        },
        {
            id: 3,
            espacioId: 8,
            espacioNombre: 'Sala Azul',
            usuarioId: 5,
            usuarioNombre: 'Camper Ruta Java',
            rolUsuario: 'CAMPER',
            fecha: hoy,
            horaInicio: '10:00',
            horaFin: '12:00',
            cantidadAsistentes: 4,
            motivo: 'Sesión de estudio grupal — Proyecto Backend Java',
            estado: 'APROBADA',
            implementosIncluidos: '1 Televisor con su Cable HDMI (1 unidades habilitadas)'
        }
    ];

    const incidencias = [
        {
            id: 1,
            reportadoPorNombre: 'Trainer Principal Backend',
            rolReportante: 'TRAINER',
            espacioNombre: 'Skilab',
            descripcion: 'El cable HDMI principal del televisor de Skilab presenta falso contacto intermitente al proyectar.',
            categoriaIa: 'Audio y Video (TV / HDMI)',
            prioridadIa: 'MEDIA',
            recomendacionIa: 'Verificar el recurso reportado en \'Skilab\' y reemplazar el cable HDMI o validar el puerto de video del televisor.',
            bloqueoSalonAplicado: false,
            fechaHora: nowFormatted(),
            fuenteClasificacion: 'MODELO_IA',
            estado: 'ABIERTA'
        }
    ];

    const prestamos = [];

    return {
        usuarios,
        espacios,
        implementos,
        reservas,
        incidencias,
        prestamos,
        counters: {
            espacio: 11,
            implemento: nextImplId,
            reserva: 4,
            incidencia: 2,
            prestamo: 1
        }
    };
}

function loadDb() {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
        try {
            return JSON.parse(raw);
        } catch {
            // rebuild if corrupted
        }
    }
    const initial = buildInitialDb();
    saveDb(initial);
    return initial;
}

function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function seSolapanHorarios(inicio1, fin1, inicio2, fin2) {
    return inicio1 < fin2 && inicio2 < fin1;
}

function obtenerEspaciosDisponiblesEnHorario(db, fecha, horaInicio, horaFin) {
    return db.espacios
        .filter(e => e.estado === 'DISPONIBLE')
        .filter(e => {
            const reservas = db.reservas.filter(r => Number(r.espacioId) === Number(e.id) && r.fecha === fecha && r.estado !== 'RECHAZADA');
            return !reservas.some(r => seSolapanHorarios(horaInicio, horaFin, r.horaInicio, r.horaFin));
        });
}

function clasificarIncidenciaIa(descripcion, espacioSeleccionado, espacios) {
    const textoLower = (descripcion || '').toLowerCase();
    let espacioDetectado = espacioSeleccionado || 'General Campus';
    for (const e of espacios) {
        if (textoLower.includes(e.nombre.toLowerCase())) {
            espacioDetectado = e.nombre;
            break;
        }
    }

    const esCritica = ['quemado', 'humo', 'corto', 'agua', 'inund', 'no hay luz', 'electric', 'eléctric', 'caida total', 'caída total', 'crítico', 'critico', 'no encienden', 'incendio', 'chispa'].some(k => textoLower.includes(k));
    const esBaja = ['mouse', 'tecla', 'limpieza', 'silla', 'mesa'].some(k => textoLower.includes(k));

    const prioridad = esCritica ? 'CRITICA' : (esBaja ? 'BAJA' : 'MEDIA');
    const categoria = (textoLower.includes('luz') || textoLower.includes('quemado') || textoLower.includes('aire') || textoLower.includes('agua') || textoLower.includes('humo') || textoLower.includes('corto') || textoLower.includes('encienden'))
        ? 'Infraestructura / Eléctrico'
        : (textoLower.includes('hdmi') || textoLower.includes('televisor') || textoLower.includes('pantalla') || textoLower.includes('video'))
        ? 'Audio y Video (TV / HDMI)'
        : (textoLower.includes('silla') || textoLower.includes('mesa') || textoLower.includes('mobiliario'))
        ? 'Mobiliario'
        : 'Equipos de Cómputo';

    const recomendacion = esCritica
        ? `Protocolo de Seguridad IA: Se bloquea preventivamente el salón '${espacioDetectado}' por riesgo operativo crítico. Soporte TI debe aislar el circuito e inspeccionar de inmediato.`
        : `Protocolo Técnico IA: Verificar el recurso reportado en '${espacioDetectado}' (${categoria}) y actualizar su estado en el inventario de Soporte.`;

    return {
        espacioDetectado,
        categoria,
        prioridad,
        bloquearSalon: esCritica,
        recomendacion,
        fuente: 'MODELO_IA'
    };
}

function recomendarSalonOptimoIa(asistentes, fecha, horaInicio, horaFin, libres) {
    const candidatos = [...libres]
        .filter(e => e.capacidad >= asistentes)
        .sort((a, b) => a.capacidad - b.capacidad);

    if (candidatos.length === 0) {
        return {
            exito: false,
            fuente: 'MODELO_IA',
            mensaje: `No existe ningún salón disponible entre ${horaInicio} y ${horaFin} con capacidad suficiente para ${asistentes} personas.`
        };
    }

    const optimo50 = candidatos.find(e => asistentes >= Math.ceil(e.capacidad * 0.5));
    const elegido = optimo50 || candidatos[0];
    const ocupacion = Math.round((asistentes * 100) / elegido.capacidad);

    const mensaje = optimo50
        ? `Salón recomendado por IA: '${elegido.nombre}' (Capacidad: ${elegido.capacidad} | Implementos: ${elegido.resumenImplementos}). Con ${asistentes} asistentes alcanza un ${ocupacion}% de ocupación óptima (cumple regla >= 50%).`
        : `Se asigna '${elegido.nombre}' (Capacidad: ${elegido.capacidad} | Ocupación: ${ocupacion}%). Autorizado por excepción de disponibilidad en el bloque ${horaInicio}-${horaFin}.`;

    return {
        exito: true,
        espacioId: elegido.id,
        espacioNombre: elegido.nombre,
        capacidad: elegido.capacidad,
        implementos: elegido.resumenImplementos,
        ocupacionPorcentaje: ocupacion,
        fuente: 'MODELO_IA',
        mensaje
    };
}

async function handleMockApi(url, options = {}) {
    await new Promise(r => setTimeout(r, 180));
    const method = (options.method || 'GET').toUpperCase();
    const body = options.body ? JSON.parse(options.body) : {};
    const db = loadDb();
    const session = getSession();

    // 1. POST /api/auth/login
    if (url === '/api/auth/login' && method === 'POST') {
        const correo = (body.correo || '').trim().toLowerCase();
        const password = (body.password || '').trim();
        const user = db.usuarios.find(u => u.correo.toLowerCase() === correo);
        if (!user) {
            throw new Error(`Credenciales inválidas: El correo '${body.correo}' no se encuentra registrado.`);
        }
        if (user.password !== password) {
            throw new Error('Credenciales inválidas: La contraseña ingresada es incorrecta.');
        }
        return {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol,
            token: `jwt-demo-campusland-${user.id}-${Date.now()}`
        };
    }

    if (!session) {
        throw new Error('Sesión no válida o expirada. Inicia sesión nuevamente.');
    }

    // 2. GET /api/espacios
    if (url === '/api/espacios' && method === 'GET') {
        if (session.rol === 'CAMPER') {
            return db.espacios
                .filter(e => e.capacidad <= 8)
                .sort((a, b) => a.capacidad - b.capacidad);
        }
        return [...db.espacios].sort((a, b) => b.capacidad - a.capacidad);
    }

    // 3. POST /api/espacios (Crear o Editar Salón Admin)
    if (url === '/api/espacios' && method === 'POST') {
        if (session.rol !== 'ADMIN') {
            throw new Error('Acceso denegado: Solo el rol ADMINISTRADOR puede crear o modificar salones.');
        }
        const id = body.id ? Number(body.id) : null;
        const nombre = (body.nombre || '').trim();
        const capacidad = Number(body.capacidad || 0);
        const resumenImplementos = (body.resumenImplementos || '').trim() || '1 Televisor con su Cable HDMI';

        if (!nombre || capacidad <= 0) {
            throw new Error('El nombre del salón y una capacidad mayor a 0 son obligatorios.');
        }

        if (id) {
            const existente = db.espacios.find(e => Number(e.id) === id);
            if (!existente) throw new Error('Salón no encontrado.');
            existente.nombre = nombre;
            existente.capacidad = capacidad;
            existente.resumenImplementos = resumenImplementos;
            saveDb(db);
            return existente;
        } else {
            const nuevo = {
                id: db.counters.espacio++,
                nombre,
                capacidad,
                categoria: 'AULA_ENTRENAMIENTO',
                estado: 'DISPONIBLE',
                resumenImplementos,
                motivoBloqueo: null,
                origenBloqueo: null
            };
            db.espacios.push(nuevo);
            db.implementos.push({
                id: db.counters.implemento++,
                espacioId: nuevo.id,
                espacioNombre: nuevo.nombre,
                tipo: 'TELEVISOR_HDMI',
                puestoNumero: 1,
                serialMonitor: `TV-NEW-${nuevo.id}`,
                serialMouse: 'N/A',
                serialTorre: 'N/A',
                serialTeclado: `HDMI-NEW-${nuevo.id}`,
                nombreImplemento: nuevo.resumenImplementos,
                estado: 'DISPONIBLE',
                motivoInhabilitado: null,
                prestadoActualmente: false
            });
            saveDb(db);
            return nuevo;
        }
    }

    // 4. PATCH /api/espacios/{id}/estado
    const matchEstadoSalon = url.match(/^\/api\/espacios\/(\d+)\/estado$/);
    if (matchEstadoSalon && method === 'PATCH') {
        const espacioId = Number(matchEstadoSalon[1]);
        const salon = db.espacios.find(e => Number(e.id) === espacioId);
        if (!salon) throw new Error('Salón no encontrado.');
        const bloquear = String(body.estado).toUpperCase() === 'BLOQUEADO';
        salon.estado = bloquear ? 'BLOQUEADO' : 'DISPONIBLE';
        salon.motivoBloqueo = bloquear ? (body.motivo || `Inhabilitado manualmente por ${session.rol}`) : null;
        salon.origenBloqueo = bloquear ? 'MANUAL' : null;
        saveDb(db);
        return salon;
    }

    // 5. DELETE /api/espacios/{id}
    const matchDeleteSalon = url.match(/^\/api\/espacios\/(\d+)$/);
    if (matchDeleteSalon && method === 'DELETE') {
        const espacioId = Number(matchDeleteSalon[1]);
        const salon = db.espacios.find(e => Number(e.id) === espacioId);
        if (!salon) throw new Error('Salón no encontrado.');
        const activas = db.reservas.filter(r => Number(r.espacioId) === espacioId && r.estado !== 'RECHAZADA');
        if (activas.length > 0) {
            throw new Error(`Integridad de datos: No se puede eliminar '${salon.nombre}' porque tiene ${activas.length} reserva(s) o solicitud(es) activa(s). Cancélalas primero.`);
        }
        db.espacios = db.espacios.filter(e => Number(e.id) !== espacioId);
        db.implementos = db.implementos.filter(i => Number(i.espacioId) !== espacioId);
        saveDb(db);
        return { eliminado: true };
    }

    // 6. GET /api/espacios/{id}/implementos
    const matchImplSalon = url.match(/^\/api\/espacios\/(\d+)\/implementos$/);
    if (matchImplSalon && method === 'GET') {
        const espacioId = Number(matchImplSalon[1]);
        return db.implementos
            .filter(i => Number(i.espacioId) === espacioId)
            .sort((a, b) => a.puestoNumero - b.puestoNumero);
    }

    // 7. PATCH /api/implementos/{id}/estado
    const matchImplEstado = url.match(/^\/api\/implementos\/(\d+)\/estado$/);
    if (matchImplEstado && method === 'PATCH') {
        const implId = Number(matchImplEstado[1]);
        const item = db.implementos.find(i => Number(i.id) === implId);
        if (!item) throw new Error('Implemento no encontrado.');
        const nuevoEstado = String(body.estado).toUpperCase();
        item.estado = nuevoEstado;
        item.motivoInhabilitado = nuevoEstado === 'NO_DISPONIBLE' ? (body.motivo || 'Mantenimiento técnico') : null;
        saveDb(db);
        return item;
    }

    // 8. GET /api/reservas & POST /api/reservas
    if (url === '/api/reservas' && method === 'GET') {
        return [...db.reservas].sort((a, b) => b.id - a.id);
    }

    if (url === '/api/reservas' && method === 'POST') {
        const espacioId = Number(body.espacioId);
        const fecha = body.fecha;
        const horaInicio = body.horaInicio;
        const horaFin = body.horaFin;
        const cantidadAsistentes = Number(body.cantidadAsistentes);
        const motivo = (body.motivo || '').trim() || 'Sesión Académica / Estudio';

        const espacio = db.espacios.find(e => Number(e.id) === espacioId);
        if (!espacio) throw new Error('El salón seleccionado no existe.');
        if (espacio.estado === 'BLOQUEADO') {
            throw new Error(`Regla de Integridad: El salón '${espacio.nombre}' se encuentra BLOQUEADO (${espacio.motivoBloqueo || 'Incidencia activa'}).`);
        }
        if (cantidadAsistentes > espacio.capacidad) {
            throw new Error(`Regla de Aforo Máximo: Solicitas espacio para ${cantidadAsistentes} personas, superando la capacidad máxima de '${espacio.nombre}' (${espacio.capacidad} personas).`);
        }
        if (session.rol === 'CAMPER' && espacio.capacidad > 8) {
            throw new Error('Restricción de Rol CAMPER: Solo puedes reservar salas de estudio de hasta 8 personas.');
        }

        if (session.rol === 'TRAINER') {
            const minReq = Math.ceil(espacio.capacidad * 0.5);
            if (cantidadAsistentes < minReq) {
                const disp = obtenerEspaciosDisponiblesEnHorario(db, fecha, horaInicio, horaFin);
                const menores = disp.filter(e => e.capacidad < espacio.capacidad && e.capacidad >= cantidadAsistentes)
                    .sort((a, b) => a.capacidad - b.capacidad);
                if (menores.length > 0) {
                    const sug = menores[0];
                    throw new Error(`Regla Anti-Subutilización (50%): '${espacio.nombre}' tiene capacidad para ${espacio.capacidad} personas (mínimo requerido: ${minReq}). Para ${cantidadAsistentes} asistentes está disponible '${sug.nombre}' (Capacidad: ${sug.capacidad}) en ese horario.`);
                }
            }
        }

        const mismoDia = db.reservas.filter(r => Number(r.espacioId) === espacioId && r.fecha === fecha && r.estado !== 'RECHAZADA');
        for (const r of mismoDia) {
            if (seSolapanHorarios(horaInicio, horaFin, r.horaInicio, r.horaFin)) {
                throw new Error(`Conflicto de Horario: El salón '${espacio.nombre}' ya cuenta con una reserva/solicitud activa de ${r.horaInicio} a ${r.horaFin} registrada por ${r.usuarioNombre} (${r.estado}).`);
            }
        }

        const estadoInicial = session.rol === 'ADMIN' ? 'APROBADA' : 'PENDIENTE';
        const dispCount = db.implementos.filter(i => Number(i.espacioId) === espacioId && i.estado === 'DISPONIBLE').length;
        const nueva = {
            id: db.counters.reserva++,
            espacioId: espacio.id,
            espacioNombre: espacio.nombre,
            usuarioId: session.id,
            usuarioNombre: session.nombre,
            rolUsuario: session.rol,
            fecha,
            horaInicio,
            horaFin,
            cantidadAsistentes,
            motivo,
            estado: estadoInicial,
            implementosIncluidos: `${espacio.resumenImplementos} (${dispCount} unidades habilitadas)`
        };
        db.reservas.push(nueva);
        saveDb(db);
        return nueva;
    }

    // 9. PATCH /api/reservas/{id}/aprobacion
    const matchAprobacion = url.match(/^\/api\/reservas\/(\d+)\/aprobacion$/);
    if (matchAprobacion && method === 'PATCH') {
        const resId = Number(matchAprobacion[1]);
        const reserva = db.reservas.find(r => Number(r.id) === resId);
        if (!reserva) throw new Error('Solicitud no encontrada.');
        if (body.aprobar) {
            const salon = db.espacios.find(e => Number(e.id) === Number(reserva.espacioId));
            if (salon && salon.estado === 'BLOQUEADO') {
                throw new Error(`No se puede aprobar: El salón '${salon.nombre}' está BLOQUEADO.`);
            }
            reserva.estado = 'APROBADA';
        } else {
            reserva.estado = 'RECHAZADA';
        }
        saveDb(db);
        return reserva;
    }

    // 10. DELETE /api/reservas/{id}
    const matchDeleteReserva = url.match(/^\/api\/reservas\/(\d+)$/);
    if (matchDeleteReserva && method === 'DELETE') {
        const resId = Number(matchDeleteReserva[1]);
        db.reservas = db.reservas.filter(r => Number(r.id) !== resId);
        saveDb(db);
        return { eliminada: true };
    }

    // 11. POST /api/reservas/{id}/reubicar-ia
    const matchReubicarIa = url.match(/^\/api\/reservas\/(\d+)\/reubicar-ia$/);
    if (matchReubicarIa && method === 'POST') {
        const resId = Number(matchReubicarIa[1]);
        const reserva = db.reservas.find(r => Number(r.id) === resId);
        if (!reserva) throw new Error('Reserva no encontrada.');
        const falla = body.descripcionFalla || 'Falla técnica en el salón durante sesión académica';

        // Registrar incidencia con triaje IA
        const triaje = clasificarIncidenciaIa(falla, reserva.espacioNombre, db.espacios);
        let seBloqueo = false;
        if (triaje.prioridad === 'CRITICA' && triaje.bloquearSalon) {
            const espActual = db.espacios.find(e => e.nombre.toLowerCase() === reserva.espacioNombre.toLowerCase());
            if (espActual) {
                espActual.estado = 'BLOQUEADO';
                espActual.origenBloqueo = 'IA';
                espActual.motivoBloqueo = `Bloqueo automático por IA — Incidencia CRÍTICA: ${falla}`;
                seBloqueo = true;
            }
        }
        db.incidencias.push({
            id: db.counters.incidencia++,
            reportadoPorNombre: session.nombre,
            rolReportante: session.rol,
            espacioNombre: reserva.espacioNombre,
            descripcion: falla,
            categoriaIa: triaje.categoria,
            prioridadIa: triaje.prioridad,
            recomendacionIa: triaje.recomendacion,
            bloqueoSalonAplicado: seBloqueo,
            fechaHora: nowFormatted(),
            fuenteClasificacion: 'MODELO_IA',
            estado: 'ABIERTA'
        });

        const libres = obtenerEspaciosDisponiblesEnHorario(db, reserva.fecha, reserva.horaInicio, reserva.horaFin)
            .filter(e => Number(e.id) !== Number(reserva.espacioId));
        const rec = recomendarSalonOptimoIa(reserva.cantidadAsistentes, reserva.fecha, reserva.horaInicio, reserva.horaFin, libres);
        if (!rec.exito) {
            saveDb(db);
            throw new Error(rec.mensaje);
        }

        const nuevoSalon = db.espacios.find(e => Number(e.id) === Number(rec.espacioId));
        const salonAnterior = reserva.espacioNombre;
        reserva.espacioId = nuevoSalon.id;
        reserva.espacioNombre = nuevoSalon.nombre;
        reserva.implementosIncluidos = nuevoSalon.resumenImplementos;
        reserva.motivo = `${reserva.motivo} [Reubicado por IA desde ${salonAnterior}]`;
        saveDb(db);

        return {
            reservaActualizada: reserva,
            salonAnterior,
            nuevoSalon: nuevoSalon.nombre,
            explicacionIa: rec.mensaje
        };
    }

    // 12. Préstamos Camper
    if (url === '/api/prestamos/catalogo' && method === 'GET') {
        return db.implementos.filter(i => i.tipo === 'PRESTAMO_CAMPER');
    }

    if (url === '/api/prestamos/mis-prestamos' && method === 'GET') {
        return db.prestamos
            .filter(p => Number(p.camperId) === Number(session.id))
            .sort((a, b) => b.id - a.id);
    }

    if (url === '/api/prestamos' && method === 'POST') {
        const implementoId = Number(body.implementoId);
        const cantidad = Number(body.cantidad || 1);
        if (cantidad > 1) {
            throw new Error('Regla de Negocio (Bloqueo): No se permiten préstamos por lotes. Un CAMPER solo puede solicitar máximo 1 equipo tecnológico activo a la vez.');
        }
        const activos = db.prestamos.filter(p => Number(p.camperId) === Number(session.id) && p.estado === 'ACTIVO');
        if (activos.length >= 1) {
            throw new Error(`Regla de Negocio (Bloqueo): Ya posees un préstamo activo sin devolver ('${activos[0].nombreEquipo}'). Registra su devolución antes de solicitar otro recurso.`);
        }
        const equipo = db.implementos.find(i => Number(i.id) === implementoId);
        if (!equipo || equipo.prestadoActualmente || equipo.estado !== 'DISPONIBLE') {
            throw new Error('El equipo seleccionado no se encuentra disponible actualmente.');
        }
        equipo.prestadoActualmente = true;
        const nuevoPrestamo = {
            id: db.counters.prestamo++,
            camperId: session.id,
            camperNombre: session.nombre,
            implementoId: equipo.id,
            nombreEquipo: equipo.nombreImplemento,
            fechaHoraPrestamo: nowFormatted(),
            fechaHoraDevolucion: null,
            estado: 'ACTIVO'
        };
        db.prestamos.push(nuevoPrestamo);
        saveDb(db);
        return nuevoPrestamo;
    }

    const matchDevolver = url.match(/^\/api\/prestamos\/(\d+)\/devolver$/);
    if (matchDevolver && method === 'POST') {
        const prestamoId = Number(matchDevolver[1]);
        const prestamo = db.prestamos.find(p => Number(p.id) === prestamoId);
        if (!prestamo) throw new Error('Préstamo no encontrado.');
        prestamo.estado = 'DEVUELTO';
        prestamo.fechaHoraDevolucion = nowFormatted();
        const equipo = db.implementos.find(i => Number(i.id) === Number(prestamo.implementoId));
        if (equipo) equipo.prestadoActualmente = false;
        saveDb(db);
        return prestamo;
    }

    // 13. Incidencias y Copiloto IA
    if (url === '/api/incidencias' && method === 'GET') {
        const peso = { CRITICA: 1, MEDIA: 2, BAJA: 3 };
        return [...db.incidencias].sort((a, b) => {
            const estA = a.estado === 'ABIERTA' ? 0 : 1;
            const estB = b.estado === 'ABIERTA' ? 0 : 1;
            if (estA !== estB) return estA - estB;
            const pA = peso[a.prioridadIa] || 4;
            const pB = peso[b.prioridadIa] || 4;
            if (pA !== pB) return pA - pB;
            return b.id - a.id;
        });
    }

    if (url === '/api/incidencias' && method === 'POST') {
        const espacioNombre = body.espacioNombre || 'General Campus';
        const descripcion = (body.descripcion || '').trim();
        if (!descripcion) throw new Error('Debes describir el incidente para procesar el triaje con IA.');

        const triaje = clasificarIncidenciaIa(descripcion, espacioNombre, db.espacios);
        let seBloqueoSalon = false;
        if (triaje.prioridad === 'CRITICA' && triaje.bloquearSalon) {
            const salon = db.espacios.find(e => e.nombre.toLowerCase() === triaje.espacioDetectado.toLowerCase());
            if (salon) {
                salon.estado = 'BLOQUEADO';
                salon.origenBloqueo = 'IA';
                salon.motivoBloqueo = `Bloqueo automático por IA — Incidencia CRÍTICA: ${descripcion}`;
                seBloqueoSalon = true;
            }
        }

        const nuevaInc = {
            id: db.counters.incidencia++,
            reportadoPorNombre: session.nombre,
            rolReportante: session.rol,
            espacioNombre: triaje.espacioDetectado,
            descripcion,
            categoriaIa: triaje.categoria,
            prioridadIa: triaje.prioridad,
            recomendacionIa: triaje.recomendacion,
            bloqueoSalonAplicado: seBloqueoSalon,
            fechaHora: nowFormatted(),
            fuenteClasificacion: triaje.fuente,
            estado: 'ABIERTA'
        };
        db.incidencias.push(nuevaInc);
        saveDb(db);
        return nuevaInc;
    }

    const matchResolverInc = url.match(/^\/api\/incidencias\/(\d+)\/resolver$/);
    if (matchResolverInc && method === 'PATCH') {
        const incId = Number(matchResolverInc[1]);
        const inc = db.incidencias.find(i => Number(i.id) === incId);
        if (!inc) throw new Error('Incidencia no encontrada.');
        inc.estado = 'RESUELTA';

        let salonRehabilitado = false;
        const criticasRestantes = db.incidencias.filter(
            i => i.espacioNombre.toLowerCase() === inc.espacioNombre.toLowerCase() && i.estado === 'ABIERTA' && i.prioridadIa === 'CRITICA'
        );
        if (criticasRestantes.length === 0) {
            const salon = db.espacios.find(e => e.nombre.toLowerCase() === inc.espacioNombre.toLowerCase());
            if (salon && salon.estado === 'BLOQUEADO' && salon.origenBloqueo === 'IA') {
                salon.estado = 'DISPONIBLE';
                salon.motivoBloqueo = null;
                salon.origenBloqueo = null;
                salonRehabilitado = true;
            }
        }
        saveDb(db);
        return {
            incidencia: inc,
            salonRehabilitadoAutomaticamente: salonRehabilitado,
            mensaje: salonRehabilitado
                ? `Incidencia marcada como RESUELTA. El salón '${inc.espacioNombre}' ha sido rehabilitado automáticamente al estado DISPONIBLE.`
                : 'Incidencia marcada como RESUELTA correctamente.'
        };
    }

    if (url === '/api/ia/recomendar-salon' && method === 'POST') {
        const asistentes = Number(body.cantidadAsistentes || 1);
        const fecha = body.fecha || todayIso();
        const horaInicio = body.horaInicio || '08:00';
        const horaFin = body.horaFin || '10:00';
        const libres = obtenerEspaciosDisponiblesEnHorario(db, fecha, horaInicio, horaFin);
        return recomendarSalonOptimoIa(asistentes, fecha, horaInicio, horaFin, libres);
    }

    if (url === '/api/ia/consulta-general' && method === 'POST') {
        const pregunta = (body.pregunta || '').trim();
        const numMatch = pregunta.match(/(\d+)/);
        const bloqueados = db.espacios.filter(e => e.estado === 'BLOQUEADO').length;
        const reservasActivas = db.reservas.filter(r => r.estado !== 'RECHAZADA').length;
        const incAbiertas = db.incidencias.filter(i => i.estado === 'ABIERTA').length;

        let recomendacionDirecta = '';
        if (numMatch) {
            const cant = Number(numMatch[1]);
            const libres = db.espacios.filter(e => e.estado === 'DISPONIBLE');
            const rec = recomendarSalonOptimoIa(cant, todayIso(), '08:00', '10:00', libres);
            recomendacionDirecta = `Análisis para ${cant} personas:\n→ ${rec.mensaje}\n\n`;
        }

        const desglose = db.espacios
            .map(e => `  • ${e.nombre} | Capacidad: ${e.capacidad} personas | Estado: ${e.estado} | Implementos: ${e.resumenImplementos}`)
            .join('\n');

        return {
            respuesta:
                `[COPILOTO OPERATIVO IA — CAMPUSLAND OPS]\n` +
                `Consulta procesada para rol ${session.rol}: "${pregunta}"\n\n` +
                recomendacionDirecta +
                `Estado en Tiempo Real del Campus:\n` +
                `- Total Salones Oficiales: ${db.espacios.length} (Habilitados: ${db.espacios.length - bloqueados} | Bloqueados: ${bloqueados})\n` +
                `- Reservas y Solicitudes Activas: ${reservasActivas}\n` +
                `- Tickets Abiertos en Soporte TI: ${incAbiertas}\n\n` +
                `Catálogo e Inventario Instalado:\n${desglose}`
        };
    }

    throw new Error(`Ruta no soportada en demo: ${method} ${url}`);
}

export async function apiRequest(url, options = {}) {
    const loadingMsg = options.loadingMessage || 'Procesando operación...';
    setLoading(true, loadingMsg);

    try {
        // Ejecutamos directamente el motor operativo en navegador para garantizar respuesta inmediata y persistente
        return await handleMockApi(url, options);
    } finally {
        setLoading(false);
    }
}

export function showToast(message, isError = false) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    const iconSvg = isError
        ? `<svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
        : `<svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

    toast.className = `fixed top-5 right-5 z-50 max-w-md px-4 py-3.5 rounded-xl shadow-xl border text-xs font-medium flex items-start gap-3 transition-all duration-200 ${
        isError
            ? 'bg-white border-red-300 text-slate-800'
            : 'bg-white border-emerald-300 text-slate-800'
    }`;

    toast.innerHTML = `
        ${iconSvg}
        <div class="flex-1 leading-relaxed">
            <p class="font-bold ${isError ? 'text-red-700' : 'text-emerald-700'} mb-0.5">
                ${isError ? 'Restricción de Regla de Negocio' : 'Operación Confirmada'}
            </p>
            <p class="text-slate-600 whitespace-pre-line">${message}</p>
        </div>
    `;
    toast.classList.remove('hidden');

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
    }, 5200);
}
