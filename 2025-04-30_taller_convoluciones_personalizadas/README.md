# 🧪 Workshop - Visual Filtering with Custom Convolution Kernels

## 📅 Date
`2025-04-30`

---

## 🎯 Objective

Design and implement custom image filters using manual 2D convolution to explore edge enhancement, smoothing, and feature detection. The goal is to better understand how convolution kernels alter visual features and how they compare to OpenCV's built-in functions.

---

## 🧠 Concepts Covered

- [x] Manual implementation of 2D convolution using NumPy
- [x] Designing custom kernels: sharpening, blurring, and edge detection
- [x] Visual comparison between custom and OpenCV filters
- [x] Kernel behavior analysis through side-by-side image comparisons

---

## 🔧 Tools and Environment

- Python (Jupyter or Google Colab)
- Libraries: NumPy, OpenCV, Matplotlib

---

## 📁 Project Structure

```
2025-05-03_custom_convolution_workshop/
├── python/
│   └── Workshop_Custom_Convolution_EN.ipynb
├── README.md
```

---

## 🧪 Implementation Summary

The notebook implements a function for 2D convolution from scratch and applies it to a grayscale image using three types of filters:

- **Sharpening filter**: enhances edges and fine details
- **Blurring filter**: softens the image
- **Edge detection**: highlights vertical edges using a Sobel-like kernel

The same filters are then applied using OpenCV’s `cv2.filter2D` to compare outputs.

Each result is plotted side-by-side for intuitive visual comparison.

---

## 📊 Visual Results

The output includes side-by-side panels for:

- Original image

![alt text](../Computacion-Visual-Daniel-Garzon/2025-04-30_taller_convoluciones_personalizadas/python/carro.jpg)

- Custom filter outputs
- OpenCV filter outputs

![Gif comparision](../Computacion-Visual-Daniel-Garzon/2025-04-30_taller_convoluciones_personalizadas/python/filters_comparison.gif)

---

## 🧩 Prompts Used

```text
"How to implement 2D convolution from scratch in NumPy"
"How to compare OpenCV filter2D results with custom kernels"
"Designing effective convolution kernels for sharpening and edge detection"
```

---

## 💬 Final Reflection

This workshop emphasizes the importance of convolution in image processing. Implementing filters manually helps reinforce matrix operations and pixel-wise logic behind popular OpenCV tools. Visual side-by-side comparisons highlight performance differences and accuracy of results when designing your own kernels.

---

## ✅ Submission Checklist

- [x] Manual convolution function working
- [x] At least three custom filters implemented
- [x] Visual comparison with OpenCV results
- [x] Notebook or script documented and functional
- [x] README file with explanation and image evidence
- [x] Commits in English with descriptive messages
