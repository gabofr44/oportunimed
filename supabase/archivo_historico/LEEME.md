# Archivo histórico — NO ejecutar

Estos archivos son scripts de importación y corrección de datos que ya se
corrieron una vez contra la base de datos de producción, en distintos
momentos del desarrollo del proyecto. Se conservan aquí solo como registro
histórico de cómo se pobló el catálogo de oportunidades.

## ⚠️ Por qué NO debes volver a correr ninguno de estos

Desde que se generaron, el catálogo pasó por varias rondas de limpieza:
- Se corrigieron cientos de palabras con acentos mal generados (mojibake)
- Se eliminaron ~40 oportunidades duplicadas
- Se corrigieron decenas de links rotos o genéricos
- Se eliminaron oportunidades que no aplican a estudiantes fuera de EE.UU.

Si vuelves a correr cualquiera de estos scripts, **vas a reintroducir esos
mismos problemas** — los duplicados, el texto corrupto y los links rotos
volverían a aparecer.

## Qué hay aquí

- `import_*.sql` — Lotes de importación masiva de oportunidades y cursos
  (varias versiones sucesivas; las más viejas están marcadas como obsoletas
  desde el propio proyecto)
- `full_setup.sql` — Seed inicial de categorías y secciones de página
- `006_new_classification.sql`, `007_postimport_corrections.sql`,
  `010_set_call_frequency.sql` — Correcciones de datos puntuales aplicadas
  una sola vez (no son cambios de esquema, por eso no están en
  `supabase/migrations/`)

## Dónde está el historial real del esquema

El historial de cambios a la estructura de la base de datos (tablas,
columnas, políticas RLS) vive en `supabase/migrations/`, numerado y
completo del 001 al 015. Esa carpeta sí refleja el estado actual real.

Si algún día necesitas importar oportunidades nuevas, escribe un script
nuevo que use `INSERT ... ON CONFLICT (title) DO NOTHING` (la tabla tiene
una restricción única en el título desde julio 2026) para que no se puedan
crear duplicados por accidente.
