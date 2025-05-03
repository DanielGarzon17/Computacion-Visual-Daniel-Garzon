# 🧪 Taller 0 - Transformaciones Básicas en Computación Visual

## 🔍 Objetivo del taller

Explorar los conceptos fundamentales de **transformaciones geométricas** (traslación, rotación y escala) en distintos entornos de programación visual. Cada estudiante debe crear un "Hola Mundo Visual" donde se muestre un objeto o escena básica y se le apliquen transformaciones estáticas y animadas en función del tiempo.

---

## 🔹 Actividades por entorno

Cada estudiante debe desarrollar el ejercicio en los siguientes entornos y documentar los resultados en este archivo README.

### 1. 💻 **Python (Colab o Jupyter Notebook)**
En este ejercicio, se creó una figura 2D con puntos o formas, y se aplicaron transformaciones básicas como **traslación**, **rotación** y **escala** utilizando matrices de transformación. Además, se generó una animación con la transformación en función del tiempo y se exportó como un GIF animado.

**Imagen del resultado:**

![animacion_transformacion](https://github.com/user-attachments/assets/4357d199-de3a-46bf-a994-cd0995ae60d1)


---

### 2. 🎮 **Unity (versión LTS) (Opcional)**
Para este entorno, se desarrolló un proyecto 3D donde se creó una **esfera** y se aplicaron transformaciones animadas: traslación aleatoria, rotación constante sobre el eje Y y escalado oscilante en función de la función matemática `Mathf.Sin(Time.time)`. Se utilizó Unity y C# para implementar estas animaciones.

**Imagen del resultado:**
![image](https://github.com/user-attachments/assets/1c178fe3-274c-4dd7-b398-0685c2bc19b2)


---

### 3. 🌐 **Three.js con React Three Fiber**
En este entorno, se creó un proyecto con **Vite** y **React Three Fiber**, agregando una **esfera 3D** a la escena. Se aplicaron animaciones usando `useFrame` para trasladar el objeto por una trayectoria senoidal, rotarlo sobre su propio eje y escalado oscilante basado en `Math.sin(clock.elapsedTime)`. Además, se incluyó **OrbitControls** para navegar por la escena.

**Imagen del resultado:**

![image](https://github.com/user-attachments/assets/41f81a84-a48f-477a-b3bf-f656a34f777a)


---

### 4. 🎨 **Processing (2D o 3D)**
Se desarrolló un sketch en **Processing**, dibujando una figura geométrica (en este caso un cubo) y aplicando las transformaciones de **traslación**, **rotación** y **escalado** en función del tiempo transcurrido. Además, se utilizaron funciones como `pushMatrix()` y `popMatrix()` para aislar las transformaciones y conseguir un comportamiento dinámico.

**Imagen del resultado:**
![image](https://github.com/user-attachments/assets/44a755f5-55f6-4ad9-a9d2-66f3f0d2df73)


---
