#  Proyecto PokeDex - Despliegue en la Nube By Ronaldo Noriega

**Desarrollado para:** Pueblo Paleta Inc.
**Ejecutado por:** PumasLab 
**Autor:** Ronaldo Noriega

## Descripción del Proyecto
Este repositorio contiene el código y la configuración de despliegue en la nube de la aplicación web estática **PokeDex**, construida en Angular. El objetivo principal ha sido realizar un paso a producción automatizado, seguro y documentado aplicando buenas prácticas de DevOps.

## Configuración de la Cuenta en la Nube
Para alojar la aplicación, se utilizó **Azure for Students**. (la cual en mi caso no se uso se uso una cuengta personal)El proceso de creación consistió en:
1. Acceder al portal de Azure for Students.
2. Validar la identidad y los beneficios utilizando el correo institucional.
3. Crear un grupo de recursos específico para el proyecto (`Pokedex_group`).
4. Desplegar el servicio **Azure Static Web Apps** en el plan gratuito (Free SKU), vinculándolo directamente con este repositorio de GitHub para habilitar la Integración y Despliegue Continuos (CI/CD).

## Reflexión Técnica

**1. ¿Qué vulnerabilidades previenen los encabezados implementados?**
* **Content-Security-Policy (CSP):** Previene ataques de Cross-Site Scripting (XSS) y la inyección de datos restringiendo desde dónde se pueden cargar recursos.
* **Strict-Transport-Security (HSTS):** Mitiga ataques de intermediario (Man-in-the-Middle) forzando a los navegadores a comunicarse exclusivamente mediante HTTPS.
* **X-Content-Type-Options:** Evita ataques de confusión de tipos MIME (`nosniff`).
* **X-Frame-Options:** Previene ataques de Clickjacking bloqueando el uso de la app dentro de iframes (`DENY`).
* **Permissions-Policy:** Restringe el acceso de la web a funciones sensibles del hardware del usuario (cámara, micrófono, geolocalización).

**2. ¿Qué aprendiste sobre la relación entre despliegue y seguridad web?**
Aprendí que el ciclo de vida del software no termina cuando la aplicación funciona y está pública. Un ingeniero que despliega sin considerar la seguridad entrega riesgos. Las plataformas en la nube como Azure facilitan el alojamiento, pero es nuestra responsabilidad configurar las barreras (cabeceras HTTP) que protegen a los usuarios finales y a los servidores que consumimos.

**3. ¿Qué desafíos encontraste en el proceso?**
* **El bloqueo de la PokeAPI:** Al implementar un CSP estricto inicial (`default-src 'self'`), la aplicación generó un Error 500 porque el navegador bloqueó las peticiones legítimas a la API externa (`https://pokeapi.co`) y las imágenes de los Pokémon. El desafío se resolvió ajustando la política para permitir conexiones e imágenes externas (`connect-src` e `img-src`) sin comprometer el resto del escudo.
* **Validación del Dominio Personalizado:** El panel gratuito de DuckDNS no soporta la creación nativa de registros CNAME, lo cual dificultaba la validación en Azure. Esto se resolvió cambiando el método a validación por registro TXT e inyectando el código de Azure directamente mediante la API de actualización de DuckDNS.
* 
