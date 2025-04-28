# Implementación de Algoritmos Básicos de Dibujo de Figuras

Este proyecto presenta la implementación manual de algunos algoritmos fundamentales para el dibujo de líneas, círculos y triángulos sobre un lienzo de píxeles en Python, utilizando las bibliotecas `PIL` y `matplotlib`.

---

## Descripción breve de cada algoritmo implementado

- **Bresenham (Líneas):** Algoritmo que dibuja líneas entre dos puntos utilizando únicamente operaciones enteras, optimizando el rendimiento sin utilizar cálculos de punto flotante. Se basa en el cálculo incremental de un error para decidir qué píxeles activar a cada paso.

- **Midpoint Circle (Círculos):** Algoritmo que dibuja un círculo alrededor de un centro especificado, usando una técnica de punto medio que evita cálculos pesados. Aprovecha la simetría del círculo para dibujar ocho puntos reflejados en cada iteración.

- **Rasterización de Triángulo (Scanline):** Método que rellena el área de un triángulo simple mediante líneas horizontales (scanlines). Primero se ordenan los vértices por su coordenada vertical y luego se interpolan los bordes para determinar qué píxeles rellenar en cada fila.

---

## Capturas o imágenes generadas

A lo largo del proyecto se generaron las siguientes figuras:

- Una línea roja utilizando el algoritmo de Bresenham entre los puntos (20, 20) y (180, 120).
- Un círculo azul centrado en (100, 100) con un radio de 40 píxeles utilizando el algoritmo de punto medio.
- Un triángulo verde relleno definido por los vértices (30, 50), (100, 150) y (160, 60) usando rasterización por scanline.

Cada figura fue graficada usando `matplotlib` para visualizar los resultados finales.

---

## Código relevante

- **Inicialización del lienzo:**  
  Se creó una imagen de 200x200 píxeles de fondo blanco usando `PIL`.

- **Implementación de algoritmos:**  
  Se definieron las funciones `bresenham`, `midpoint_circle` y `fill_triangle`, cada una encargada de modificar los píxeles correspondientes de la imagen.

- **Visualización:**  
  Se utilizó `plt.imshow(image)` y `plt.show()` de `matplotlib` para mostrar gráficamente los resultados en el notebook.

---

## Reflexión

Cada algoritmo tiene diferencias importantes en su propósito, eficiencia y precisión:

- **Bresenham** es extremadamente rápido para dibujar líneas porque utiliza solamente sumas, restas y comparaciones. Además, proporciona una representación visual muy precisa de una línea recta en una cuadrícula de píxeles.
  
- **Midpoint Circle** también es eficiente, aprovechando la simetría para reducir el número de cálculos necesarios. Su precisión es alta considerando que se trabaja sobre una malla discreta de píxeles.

- **Rellenado de Triángulo** mediante scanline es un método simple pero efectivo para rellenar figuras. Aunque no es tan optimizado como otros métodos modernos de rasterización, es lo suficientemente rápido para triángulos simples y permite comprender bien los conceptos básicos de interpolación y dibujo de áreas.

En general, el algoritmo de Bresenham es el más rápido de todos los implementados debido a su simplicidad y uso exclusivo de operaciones enteras. El algoritmo de punto medio también es muy eficiente gracias al aprovechamiento de la simetría. El rellenado de triángulo puede ser más costoso en tiempo para figuras grandes debido a la cantidad de píxeles que debe procesar, pero sigue siendo razonablemente eficiente.

---
