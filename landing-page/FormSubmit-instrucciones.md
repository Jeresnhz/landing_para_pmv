# Instrucciones para el formulario de ContactForm con FormSubmit

## Cómo funciona el formulario

El formulario de suscripción de CitasPro utiliza el servicio gratuito FormSubmit para procesar los envíos de correo sin necesidad de un backend. La implementación actual hace lo siguiente:

1. **Email dinámico:** El formulario envía una copia del formulario al propio correo del usuario que se suscribe, y otra copia al correo del administrador de CitasPro.

2. **Inclusión del tipo de usuario:** El mensaje incluye automáticamente el tipo de perfil seleccionado (profesional o cliente).

## Primer uso y activación

### Para cada nueva dirección de correo

La primera vez que un usuario envía un formulario con su correo electrónico a través de FormSubmit, ocurre lo siguiente:

1. FormSubmit envía un correo de confirmación a la dirección de email utilizada.
2. El usuario debe hacer clic en el enlace de confirmación en ese correo.
3. Una vez confirmado, FormSubmit procesará todos los formularios futuros enviados a esa dirección sin necesidad de confirmación adicional.

### Para el administrador de CitasPro

La dirección de correo del administrador (diegomarcelo.bv@gmail.com) ya debe estar activada para recibir los correos automáticamente.

## Solución de problemas

Si los usuarios informan que no reciben los correos:

1. **Verificar carpeta de spam:** Los correos de FormSubmit pueden llegar a la carpeta de spam.

2. **Activación del correo:** Asegúrese de que cada usuario confirme su correo la primera vez haciendo clic en el enlace de confirmación que recibe.

3. **Límites de FormSubmit:** FormSubmit tiene límites en su plan gratuito. Si se alcanzan estos límites, considere actualizar a un plan de pago o cambiar a una alternativa.

## Alternativas a FormSubmit

Si FormSubmit presenta problemas persistentes, estas son algunas alternativas:

1. **Netlify Forms:** Si el sitio está alojado en Netlify.
2. **Formspree:** Similar a FormSubmit con un plan gratuito.
3. **EmailJS:** Permite enviar correos directamente desde JavaScript.

## Personalización adicional

Para modificar el comportamiento del formulario:

- Editar el archivo `index.html` y buscar la sección del script que comienza con `// Script para implementar el formulario con el email dinámico`.
- Allí encontrará variables como `_subject`, `_template`, etc., que puede personalizar según sus necesidades.

---

Para más información sobre las opciones de FormSubmit, visite [formsubmit.co](https://formsubmit.co/)
