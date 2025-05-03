# 🧪 Algoritmos rasterizacion basica

## 📅 Fecha
`2025-04-30`

---

## 🎯 Objetivo del Taller

Implementar desde cero algoritmos fundamentales para el dibujo de líneas, círculos y triángulos sobre un lienzo de píxeles en Python, entendiendo los principios geométricos y computacionales detrás del renderizado en gráficos rasterizados.

---

## 🧠 Conceptos Aprendidos

- [x] Transformaciones geométricas (coordenadas, interpolación)
- [x] Rasterización de primitivas gráficas
- [ ] Shaders y efectos visuales
- [ ] Entrenamiento de modelos IA
- [ ] Comunicación por gestos o voz
- [ ] Otro: Visualización en lienzos de píxeles

---

## 🔧 Herramientas y Entornos

- Python (`PIL`, `matplotlib`)
- Google Colab / Jupyter Notebook

---

## 📁 Estructura del Proyecto

```
2025-05-02_algoritmos_dibujo/
├── python/
├── resultados/
│   ├── linea_bresenham.png
│   ├── circulo_midpoint.png
│   ├── triangulo_scanline.png
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Preparación del lienzo y librerías (`PIL`, `matplotlib`).
2. Implementación de los algoritmos:
   - Bresenham para líneas.
   - Midpoint para círculos.
   - Scanline para rellenado de triángulos.
3. Visualización de cada figura sobre el lienzo.
4. Exportación de imágenes con resultados.

### 🔹 Código relevante

```python
# Ejemplo: Línea con Bresenham
def bresenham(x0, y0, x1, y1, draw_pixel):
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy
    while True:
        draw_pixel(x0, y0)
        if x0 == x1 and y0 == y1:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x0 += sx
        if e2 < dx:
            err += dx
            y0 += sy
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ❌ No se incluye un GIF en esta implementación (solo imágenes estáticas).

![line](https://github.com/user-attachments/assets/74fa2bf9-efbc-462c-9aef-b61f34d2b800)
![circle](https://github.com/user-attachments/assets/e7d34d8b-9777-4ba2-8de4-5ebc1386148f)
![triangle](https://github.com/user-attachments/assets/ee1fac15-36af-4594-a265-2f50c0eb92a9)
![resultados_finales](https://github.com/user-attachments/assets/295de252-dfb6-4cbf-82a8-f57a30ec7052)


---

## 🧩 Prompts Usados

```text
"You are an expert in Visual Computing. Research the Bresenham algorithm and explain how this code works. Help me create a README file following the provided template."
```

---

## 💬 Reflexión Final

Este taller permitió reforzar la comprensión de cómo funcionan los algoritmos clásicos de dibujo en una cuadrícula de píxeles, especialmente en ambientes de bajo nivel donde no se dispone de funciones gráficas avanzadas.

El algoritmo de Bresenham demostró gran eficiencia al trabajar únicamente con enteros, mientras que el algoritmo de punto medio para círculos fue un excelente ejemplo de aprovechamiento de simetría. El rellenado de triángulos por scanlines, aunque más complejo, resultó ser una estrategia poderosa para construir primitivas sólidas.

---

## 👥 Contribuciones Grupales (No aplica)


---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-04-30_taller_algoritmos_rasterizacion_basica`
- [x] Código limpio y funcional
- [ ] GIF incluido con nombre descriptivo (no requerido en esta versión)
- [x] Visualizaciones exportadas en PNG
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
