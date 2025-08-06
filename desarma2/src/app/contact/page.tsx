'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });
    setFormEnviado(true);
    setTimeout(() => setFormEnviado(false), 4000);
  };

  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.contactPage}>
        <section style={styles.contactInfo}>
          <div style={styles.infoBox}>
            <span style={styles.icon}>📍</span>
            <h3 style={styles.infoTitle}>Dirección</h3>
            <p style={styles.infoText}>A108 Adam Street, New York, NY 535022</p>
          </div>
          <div style={styles.infoBox}>
            <span style={styles.icon}>📞</span>
            <h3 style={styles.infoTitle}>Llámamos</h3>
            <p style={styles.infoText}>+1 5589 55488 55</p>
          </div>
          <div style={styles.infoBox}>
            <span style={styles.icon}>✉️</span>
            <h3 style={styles.infoTitle}>Envíanos un correo</h3>
            <p style={styles.infoText}>info@example.com</p>
          </div>
        </section>

        <section style={styles.contactBody}>
          <div style={styles.map}>
            <iframe
              src="https://www.google.com/maps?q=Downtown%20Conference%20Center%2C%20122%20William%20St%2C%20New%20York%2C%20NY%2010038&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
            ></iframe>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formRow}>
              <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="correo"
                placeholder="Tu Correo"
                value={formData.correo}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={formData.asunto}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              style={styles.textarea}
              required
            ></textarea>
            <button type="submit" style={styles.button}>Enviar Mensaje</button>

            {formEnviado && (
              <p style={styles.successMessage}>✅ ¡Mensaje enviado exitosamente!</p>
            )}
          </form>
        </section>
      </div>

      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    padding: '0 16px',
    fontFamily: 'sans-serif',
    color: '#F8FAFC',
  },
  contactPage: {
    maxWidth: '900px',
    margin: '60px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  infoBox: {
    flex: '1',
    minWidth: '250px',
    backgroundColor: '#1E293B',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  icon: {
    fontSize: '24px',
    marginBottom: '8px',
    display: 'block',
  },
  infoTitle: {
    fontSize: '18px',
    marginBottom: '6px',
    color: '#38BDF8',
  },
  infoText: {
    fontSize: '14px',
    color: '#CBD5E1',
  },
  contactBody: {
    backgroundColor: '#1E293B',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  },
  map: {
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #475569',
    borderRadius: '8px',
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    outline: 'none',
    minWidth: '200px',
  },
  textarea: {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #475569',
    borderRadius: '8px',
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: '#0F172A',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: '16px',
    backgroundColor: '#16A34A',
    padding: '12px',
    borderRadius: '8px',
    color: '#F0FDF4',
    textAlign: 'center',
    fontWeight: '500',
  },
};