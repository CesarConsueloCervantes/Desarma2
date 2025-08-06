'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CSSProperties, useState } from 'react';
import jsPDF from 'jspdf';
import { useCart, useAuth } from '@/store/provider';
import { createVenta } from '@/services/ventaService';

export default function GenerarPagoPage() {
  const { cartItems } = useCart();
  const { usuario } = useAuth();
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [formData, setFormData] = useState({
    formaPago: 'Tarjeta',
    envioId: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleGenerateTicket = () => {
    if (cartItems.length === 0) return alert('El carrito está vacío');
    setTicketGenerated(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.addImage('/pdf.png', 'PNG', 140, 10, 50, 20);
    doc.text('RepairShop - Ticket de Compra', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${today}`, 20, 28);

    let y = 40;
    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} x${item.quantity} = $${item.price * item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total pagado: $${totalPrice}`, 20, y + 10);

    doc.save('ticket_coolpanda.pdf');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimulatedPayment = async () => {
    const { name, cardNumber, expiry, cvv, formaPago, envioId } = formData;

    if (!name || !cardNumber || !expiry || !cvv) {
      alert('Por favor completa todos los campos de tarjeta');
      return;
    }

    if (!usuario?._id) {
      alert('No se encontró el ID del usuario logueado');
      return;
    }

    try {
      alert('Pago simulado exitoso ✅');

      const ventaPayload = {
        T_Venta_Usuario_id: usuario._id,
        T_Venta_Envio_id: '64d4fa12e1a3b7f8a9c67890',
        T_Venta_FormaPago: formaPago,
        T_Venta_Subtotal: totalPrice,
        T_Venta_Estatus: true,
      };

      await createVenta(ventaPayload);
      handleGenerateTicket();
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Hubo un problema al registrar la venta');
    }
  };

  if (!usuario) {
    return (
      <>
        <Header />
        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.title}>⚠️ Sesión no iniciada</h1>
            <p style={styles.text}>
              No se encontró el usuario logueado. Por favor inicia sesión antes de realizar el pago.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>💳 Finalizar compra</h1>

          <div style={styles.box}>
            <p style={styles.text}>
              Completa los datos de tu compra y tarjeta para simular el pago y generar tu ticket PDF.
            </p>

            {/* Formulario previo */}
            <div style={styles.form}>
              <select
                name="formaPago"
                value={formData.formaPago}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
              </select>

            </div>

            {/* Formulario de tarjeta */}
            <div style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Nombre en la tarjeta"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Número de tarjeta"
                value={formData.cardNumber}
                onChange={handleInputChange}
                style={styles.input}
              />
              <div style={styles.row}>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/AA"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  style={{ ...styles.input, marginRight: '1rem' }}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <button onClick={handleSimulatedPayment} style={styles.pay}>
                Pagar ${totalPrice}
              </button>
            </div>

            {ticketGenerated && (
              <div style={styles.ticketBox}>
                <h2 style={styles.ticketTitle}>🎟️ Ticket generado</h2>
                <ul style={styles.ticketList}>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} x{item.quantity} = ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <p style={styles.ticketTotal}>Total pagado: ${totalPrice}</p>
                <button onClick={handleDownloadPDF} style={styles.download}>
                  Descargar Ticket PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
    color: 'white',
    padding: '2rem',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  box: {
    backgroundColor: '#1E293B',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: '1rem',
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #94A3B8',
    backgroundColor: '#0F172A',
    color: 'white',
    fontSize: '1rem',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  pay: {
    backgroundColor: '#38BDF8',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
     },
  ticketBox: {
    backgroundColor: '#065F46',
    padding: '1.5rem',
    borderRadius: '1rem',
    color: '#D1FAE5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  ticketTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ticketList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  ticketTotal: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  download: {
    backgroundColor: '#059669',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};