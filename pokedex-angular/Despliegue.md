#  Bitácora de Despliegue Técnico y Seguridad
Este documento detalla el procedimiento profesional seguido para la puesta en producción de la PokeDex, asegurando un entorno de alta disponibilidad, automatización mediante CI/CD y un robusto endurecimiento (hardening) de seguridad.
## 1. Infraestructura y Automatización (CI/CD)
Para cumplir con los estándares de **PumasLab**, se seleccionó **Azure Static Web Apps** por su integración nativa con GitHub.

* **Origen:** Repositorio GitHub `pokedex`.
* **Framework:** Angular.
* **Flujo de Trabajo:** Se configuró un GitHub Action que automatiza el ciclo de vida del despliegue:
  * **Build Presets:** Angular.
  * **App location:** `/pokedex-angular` (Carpeta raíz del código fuente).
  * **Output location:** `dist/pokedex-angular` (Carpeta de distribución generada tras el build).

## 2. Configuración de Seguridad y Cabeceras HTTP
Para obtener la calificación **A+** en *securityheaders.com*, se implementó una política de seguridad personalizada. Un desafío crítico fue el bloqueo inicial de la **PokeAPI** debido a políticas de origen estrictas; esto se resolvió mediante el ajuste fino de la `Content-Security-Policy`.

Se creó el archivo `staticwebapp.config.json` con la siguiente estructura:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "globalHeaders": {
    "Content-Security-Policy": "default-src 'self'; connect-src 'self' https:; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  }
}
```

## 3. Desafío Maestro: Dominio Personalizado y Networking
Como parte de la excelencia técnica, se migró la aplicación de la URL genérica de Azure a un dominio personalizado profesional.

Paso A: Gestión del DNS (DuckDNS)
Se registró el dominio pokedexronaldo.duckdns.org. Debido a que DuckDNS es un proveedor simplificado que no permite registros CNAME tradicionales de forma gratuita, se aplicaron técnicas avanzadas de validación.

Paso B: Validación de Propiedad mediante TXT
Para que Azure aceptara el dominio, se inyectó un registro de validación TXT directamente en los servidores de DuckDNS utilizando su API de actualización:

Comando API: https://www.duckdns.org/update?domains=pokedexronaldo&token=[TOKEN]&txt=[VALOR_DE_AZURE]

Resultado: Validación exitosa de la propiedad del dominio.

Paso C: Apuntamiento y Certificación SSL
Se identificó la IP pública del balanceador de carga de Azure (20.75.109.112) mediante herramientas de red (ping).

Se actualizó el Registro A en el panel de DuckDNS para apuntar al servidor de la aplicación.

Se aprovisionó un certificado SSL/TLS administrado por Azure, garantizando una conexión cifrada de extremo a extremo.##
