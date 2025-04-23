using UnityEngine;

public class MovimientoTransformado : MonoBehaviour
{
    public float velocidadRotacion = 45f; // grados por segundo
    public float intervaloMovimiento = 2f; // cada cuántos segundos se mueve
    public float distanciaMovimiento = 1f; // cuánto se mueve en X o Y
    public float amplitudEscalado = 0.5f; // variación de escala
    public float frecuenciaEscalado = 1f;  // velocidad de oscilación

    private float tiempoSiguienteMovimiento;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        tiempoSiguienteMovimiento = Time.time + intervaloMovimiento;
    }

    // Update is called once per frame
    void Update()
    {
        // Rotación constante
        transform.Rotate(Vector3.up, velocidadRotacion * Time.deltaTime);

        // Traslación aleatoria por X o Y cada cierto intervalo
        if (Time.time >= tiempoSiguienteMovimiento)
        {
            Vector3 direccion = Random.value > 0.5f ? Vector3.right : Vector3.up;
            float signo = Random.value > 0.5f ? 1f : -1f;
            transform.Translate(direccion * distanciaMovimiento * signo, Space.World);
            tiempoSiguienteMovimiento = Time.time + intervaloMovimiento;
        }

        // Escalado oscilante en función de Mathf.Sin(Time.time)
        float escala = 1 + Mathf.Sin(Time.time * frecuenciaEscalado) * amplitudEscalado;
        transform.localScale = new Vector3(escala, escala, escala);
    }
}
