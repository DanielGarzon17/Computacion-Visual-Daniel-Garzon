# Proyecto de Calibración de Cámara con OpenCV

Este proyecto demuestra un flujo completo para simular distorsión óptica en imágenes, detectar patrones de ajedrez, calibrar la cámara y corregir la distorsión. A continuación se describen brevemente los pasos realizados:

## 1. Preparación de las imágenes

* **Carga de imágenes originales** desde Google Drive en variables `image1` a `image11`.
* **Duplicación** de estas imágenes en la carpeta `imagenes_distorsionadas/`.
* **Aplicación de distorsión óptica simulada** usando una matriz intrínseca ficticia y coeficientes radiales (`k1`, `k2`) con `cv2.initUndistortRectifyMap` y `cv2.remap`, generando un efecto de "barril" visible.



## 2. Detección de esquinas de patrón de ajedrez

* Búsqueda inicial de esquinas internas del tablero con `cv2.findChessboardCorners` en cada imagen distorsionada.
* **Refinamiento subpíxel** de las coordenadas obtenidas con `cv2.cornerSubPix` para mejorar la precisión de la detección.
* **Visualización** y guardado de las imágenes con las esquinas detectadas en `esquinas_detectadas/`.
* **Descartar** automáticamente las imágenes donde no se encontró el patrón completo.

## Imagenes

![image](https://github.com/user-attachments/assets/93d5a093-5679-449b-a199-add0ac695f20)

![image](https://github.com/user-attachments/assets/075226b9-cedf-4f8f-a31f-76a935022c8d)

## 3. Calibración de la cámara

* Definición de los **puntos de objeto 3D** (coordenadas reales de las esquinas internas) y **puntos de imagen 2D** (esquinas refinadas) para cada imagen válida.
* Ejecución de `cv2.calibrateCamera` para obtener:

  * **Matriz intrínseca de la cámara** (`camera_matrix`).
  * **Coeficientes de distorsión** (`dist_coeffs`):

    * k1, k2 (radiales), p1, p2 (tangenciales), k3.
  * Vectores de rotación y traslación para cada vista.
* **Cálculo del error medio de reproyección** como la media de las distancias entre los puntos originales y sus proyecciones, indicando la precisión de la calibración.

![image](https://github.com/user-attachments/assets/59464225-58ec-47db-80d6-72d498066dc5)



## 4. Corrección de distorsión en las imágenes

* Uso de `cv2.undistort` con los parámetros obtenidos para **corregir** cada imagen distorsionada.
* Guardado de las **imágenes corregidas** en la carpeta `imagenes_corregidas/`.
* **Comparación visual** lado a lado de la versión distorsionada y la corregida en al menos tres ejemplos representativos.

![image](https://github.com/user-attachments/assets/d509baa8-4f83-42ff-9737-8fe55f244f3f)

Con estos pasos se completa un flujo práctico de calibración de cámara y corrección de distorsión usando OpenCV en Python, partiendo de una simulación inicial hasta la validación y aplicación final de los parámetros de calibración.

---

## Preguntas

**i. ¿Cuáles fueron los coeficientes de distorsión obtenidos?**

![image](https://github.com/user-attachments/assets/4a3e3e7f-463e-48b8-aad5-6daad5e3e94b)

**ii. ¿Cuántas imágenes fueron necesarias para lograr una calibración aceptable?**

Se usaron 11 imágenes las cuales fueron suficientes para calibrar la cámara.

**iii. Diferencias entre imágenes distorsionadas y corregidas**

* **Linealidad de las rectas y aristas**: en las imágenes distorsionadas los bordes del tablero y del marco aparecen curvados (“efecto barril”), mientras que en las corregidas vuelven a ser líneas rectas.
* **Proporción del patrón**: los cuadrados del ajedrez recuperan su forma cuadrada y sus proporciones uniformes. En las distorsionadas se veían trapezoides u óvalos en los extremos, que desaparecen tras la corrección.
* **Uniformidad del fondo**: el fondo que antes parecía curvo en los bordes pasa a mostrarse “plano”, sin énfasis radial.
* **Centro de proyección**: el patrón se “reencuadra” correctamente: el punto principal de la cámara (principal point) se ha alineado con el centro real de la imagen, reduciendo asimetrías.

**iv. Aprendizajes sobre usar el patrón de ajedrez y calibración**

1. **Patrón robusto y repetible**
   El tablero de ajedrez con esquinas internas regulares ofrece un sistema de referencia muy fiable para detectar puntos 2D–3D: sus esquinas son fáciles de ubicar con algoritmos automáticos y se refinan bien a nivel subpíxel.
2. **Importancia de múltiples vistas**
   Cuantas más imágenes con distintas orientaciones y posiciones del patrón, más preciso resulta el cálculo de los parámetros intrínsecos y de distorsión.
3. **Refinamiento subpíxel**
   El uso de `cornerSubPix` mejora drásticamente la exactitud de cada esquina, reduciendo el error de reproyección y, por ende, los artefactos tras la corrección.
4. **Pipeline de calibración**

   * Detección inicial de esquinas (`findChessboardCorners`).
   * Filtrado de imágenes inválidas (sin patrón completo).
   * Refinamiento de esquinas.
   * Cálculo de `camera_matrix` y `dist_coeffs` con `calibrateCamera`.
   * Evaluación del reprojection error como métrica de calidad.
   * Aplicación de `undistort` para corregir nuevas imágenes.
5. **Precisión y límites**
   Aunque la corrección corrige muy bien las deformaciones radiales, quedan pequeñas imprecisiones que dependen de la calidad de las fotos (iluminación, cobertura del patrón, ángulos extremos). Por ello es clave:

   * Mantener el tablero completamente dentro del encuadre.
   * Evitar imágenes movidas o con desenfoque.
   * Cubrir distintas profundidades y orientaciones para modelar la distorsión de manera global.





