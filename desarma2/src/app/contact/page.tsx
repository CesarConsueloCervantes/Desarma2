'use client';

import HeaderGuest from '@/components/HeaderGuest';

export default function ContactPage() {
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

          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Tu Nombre" />
              <input type="email" placeholder="Tu Correo" />
            </div>
            <input type="text" placeholder="Asunto" />
            <textarea placeholder="Mensaje"></textarea>
            <button type="submit">Enviar Mensaje</button>
          </form>
        </section>
      </div>
    </div>
  );
}
