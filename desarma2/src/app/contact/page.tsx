'use client';

import { useState } from 'react';
import HeaderGuest from '@/components/HeaderGuest';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [formEnviado, setFormEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simular "envío" eliminando los datos y mostrando el mensaje
    setFormData({
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: '',
    });
    setFormEnviado(true);

    // Ocultar el mensaje después de unos segundos (opcional)
    setTimeout(() => setFormEnviado(false), 4000);
  };

  return (
    <div>
      <HeaderGuest />

      <div className="contact-page">
        <section className="contact-info">
          <div className="info-box">
            <i className="bi bi-geo-alt"></i>
            <h3>Dirección</h3>
            <p>A108 Adam Street, New York, NY 535022</p>
          </div>
          <div className="info-box">
            <i className="bi bi-telephone"></i>
            <h3>Llámamos</h3>
            <p>+1 5589 55488 55</p>
          </div>
          <div className="info-box">
            <i className="bi bi-envelope"></i>
            <h3>Envíanos un correo</h3>
            <p>info@example.com</p>
          </div>
        </section>

        <section className="contact-body">
          <div className="map">
            <iframe
              src="https://www.google.com/maps?q=Downtown%20Conference%20Center%2C%20122%20William%20St%2C%20New%20York%2C%20NY%2010038&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                type="email"
                name="correo"
                placeholder="Tu Correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={formData.asunto}
              onChange={handleChange}
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Enviar Mensaje</button>

            {formEnviado && (
              <p className="form-success" style={{ marginTop: '16px', color: '#4CAF50' }}>
                ✅ ¡Mensaje enviado exitosamente!
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
