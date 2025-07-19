# Proyecto de Calibración de Cámara con OpenCV

Este proyecto muestra paso a paso cómo simular distorsión óptica en imágenes, detectar patrones de ajedrez, calibrar una cámara y corregir la distorsión usando OpenCV en Python.

---

## 1. Flujo General

1. **Simulación de distorsión óptica**  
   - Se parte de imágenes originales (`imagenes_originales/`).
   - Se duplican y distorsionan usando una matriz intrínseca ficticia y coeficientes radiales (`k1`, `k2`) con `cv2.initUndistortRectifyMap` y `cv2.remap`, generando un efecto de "barril".
   - Las imágenes distorsionadas se guardan en `imagenes_distorsionadas/`.

2. **Detección de esquinas en el patrón de ajedrez**  
   - Se buscan las esquinas internas del tablero en cada imagen distorsionada con `cv2.findChessboardCorners`.
   - Se refinan las coordenadas con `cv2.cornerSubPix` para mayor precisión.
   - Las imágenes con esquinas detectadas se guardan en `esquinas_detectadas/`.
   - Se descartan automáticamente las imágenes donde no se detecta el patrón completo.

3. **Calibración de la cámara**  
   - Se definen los puntos 3D (mundo real) y 2D (imagen) de las esquinas detectadas.
   - Se ejecuta `cv2.calibrateCamera` para obtener:
     - Matriz intrínseca de la cámara (`camera_matrix`)
     - Coeficientes de distorsión (`dist_coeffs`)
     - Vectores de rotación y traslación
   - Se calcula el error medio de reproyección para evaluar la precisión.

4. **Corrección de distorsión**  
   - Se usa `cv2.undistort` para corregir cada imagen distorsionada.
   - Las imágenes corregidas se guardan en `imagenes_corregidas/`.
   - Se comparan visualmente las imágenes distorsionadas y corregidas.

---

## 2. Ejemplo Visual

Las siguientes imágenes ilustran el proceso y los resultados:

![image](https://github.com/user-attachments/assets/93d5a093-5679-449b-a199-add0ac695f20)

![image](https://github.com/user-attachments/assets/075226b9-cedf-4f8f-a31f-76a935022c8d)

![image](https://github.com/user-attachments/assets/59464225-58ec-47db-80d6-72d498066dc5)

![image](https://github.com/user-attachments/assets/d509baa8-4f83-42ff-9737-8fe55f244f3f)

---

## 3. Preguntas y Respuestas

**i. ¿Cuáles fueron los coeficientes de distorsión obtenidos?**  
![image](https://github.com/user-attachments/assets/4a3e3e7f-463e-48b8-aad5-6daad5e3e94b)

**ii. ¿Cuántas imágenes fueron necesarias para lograr una calibración aceptable?**  
Se usaron 11 imágenes, suficientes para una calibración precisa.

**iii. Diferencias entre imágenes distorsionadas y corregidas:**
- Las líneas rectas vuelven a serlo tras la corrección (el "barril" desaparece).
- Los cuadrados del tablero recuperan su forma y proporciones.
- El fondo deja de verse curvado en los bordes.
- El centro de proyección se alinea correctamente.

**iv. Aprendizajes sobre el uso del patrón de ajedrez y la calibración:**
- El patrón de ajedrez es robusto y fácil de detectar automáticamente.
- Usar muchas imágenes desde diferentes ángulos mejora la calibración.
- El refinamiento subpíxel (`cornerSubPix`) reduce el error de reproyección.
- El pipeline típico es: detección de esquinas → filtrado → refinamiento → calibración → evaluación → corrección.
- La calidad de las fotos (enfoque, iluminación, cobertura del patrón) es clave para buenos resultados.

---

## 4. Estructura de Carpetas

- `imagenes_originales/`: Imágenes sin distorsión.
- `imagenes_distorsionadas/`: Imágenes con distorsión simulada.
- `esquinas_detectadas/`: Imágenes con esquinas del patrón detectadas.
- `imagenes_corregidas/`: Imágenes corregidas tras calibración.

---

Con estos pasos se completa un flujo práctico de calibración de cámara y corrección de distorsión usando OpenCV en Python, partiendo de una simulación inicial hasta la validación y aplicación final de los parámetros de calibración.





